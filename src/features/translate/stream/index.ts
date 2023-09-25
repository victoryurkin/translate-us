/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from 'react';
import { AppState } from 'react-native';
import MicrophoneStream from 'react-native-live-audio-stream';
import { useAuth, useApp } from '@translate-us/context';
import { io, Socket } from 'socket.io-client';
import { Buffer } from 'buffer';
import { produce } from 'immer';
import { writeFile, DocumentDirectoryPath } from 'react-native-fs';
import Sound from 'react-native-sound';
import { log } from '@translate-us/clients';

enum OutgoingEvents {
  START_RECORDING = 'startRecording',
  AUDIO_DATA = 'audioData',
  STOP_RECORDING = 'stopRecording',
}

enum IncomingEvents {
  TRANSCRIPTION_DATA = 'transcriptionData',
  TRANSCRIPTION_END = 'transcriptionEnd',
  TRANSLATION_DATA = 'translationData',
  AUDIO_FILE = 'audioFile',
}

interface Job {
  isRunning: boolean;
  startTime: number;
  isTranscriptionRunning: boolean;
  isTranslationRunning: boolean;
  isWaitingTranscriptionEndSignal: boolean;
  sourceCode: string;
  targetCode: string;
  transcription: string;
  translation: string;
  audioOutput: string;
}

MicrophoneStream.init({
  sampleRate: 16000,
  channels: 1,
  bitsPerSample: 16,
  bufferSize: 4096,
  wavFile: `${DocumentDirectoryPath}/audio.wav`,
});

// https://translate-stream-service-ocrtlpqp4q-uk.a.run.app
const apiUrl = 'https://translate-stream-service-ocrtlpqp4q-uk.a.run.app';

export const useStream = () => {
  const { getAccessToken } = useAuth();
  const { setLoading } = useApp();
  const [job, setJob] = useState<Job>();
  const jobRef = useRef<Job>();
  const socketRef = useRef<Socket>();
  const isRecording = useRef(false);

  const connect = async () => {
    log.debug('Connecting to socket.io server');
    const accessToken = await getAccessToken();
    socketRef.current = io(apiUrl, {
      auth: {
        token: accessToken,
      },
    });

    socketRef.current.on('connect_error', error => {
      log.error('Socket.io connect error: ', error);
      // console.log('Socket.io connect error: ', error);
    });

    socketRef.current.on('connect', () => {
      log.debug('Socket.io connected: ', socketRef.current?.id);
      // console.log('Socket.io connected', socketRef.current?.id);
    });

    socketRef.current.on('disconnect', reason => {
      log.debug('Socket.io disconnected: ', reason);
      // console.log('Socket.io disconnected: ', reason);
    });

    socketRef.current.on(IncomingEvents.TRANSCRIPTION_DATA, (data: string) => {
      try {
        if (jobRef.current) {
          const updateJob = produce(jobRef.current, draft => {
            draft.transcription = data;
          });
          jobRef.current = updateJob;
          setJob(updateJob);
        }
      } catch (err) {
        log.error('Error on transcriptionData incoming event: ', err);
      }
    });

    socketRef.current.on(IncomingEvents.TRANSCRIPTION_END, (data: string) => {
      if (jobRef.current) {
        const updateJob = produce(jobRef.current, draft => {
          draft.transcription = data;
          draft.isTranscriptionRunning = false;
          draft.isTranslationRunning = true;
        });
        jobRef.current = updateJob;
        setJob(updateJob);
      }
    });

    socketRef.current.on(IncomingEvents.TRANSLATION_DATA, (data: string) => {
      try {
        if (jobRef.current) {
          const updateJob = produce(jobRef.current, draft => {
            draft.translation = data;
            draft.isTranslationRunning = false;
          });
          jobRef.current = updateJob;
          setJob(updateJob);
        }
      } catch (err) {
        log.error('Error on translationData incoming event: ', err);
      }
    });

    socketRef.current.on(IncomingEvents.AUDIO_FILE, async (data: Buffer) => {
      try {
        const buffer = Buffer.from(data);
        const base64 = buffer.toString('base64');
        const path = `${DocumentDirectoryPath}/output.mp3`;
        await writeFile(path, base64, 'base64');

        Sound.setCategory('Playback');
        const sound = new Sound(path, '', error => {
          if (error) {
            log.error('Error loading sound: ', error);
          } else {
            sound.play(async () => {
              sound.release();
            });
          }
        });

        if (jobRef.current) {
          const updateJob = produce(jobRef.current, draft => {
            draft.audioOutput = base64;
            // TODO: set after file was played
            draft.isRunning = false;
          });
          jobRef.current = updateJob;
          setJob(updateJob);
        }
      } catch (err) {
        log.error('Transcription data is invalid: ', err);
      }
    });
  };

  const waitServerResponse = async () => {
    try {
      log.debug('Checking server status');
      await fetch(`${apiUrl}/healthcheck`);
      log.debug('Connected to server');
    } catch (error) {
      log.error('Error checking server status: ', error);
    }
  };

  const disconnect = () => {
    log.debug('Disconnecting from socket.io server. Listeners: ', {
      listeners: socketRef.current?.listeners,
    });
    socketRef.current?.removeAllListeners();
    socketRef.current?.disconnect();
    log.debug('Disconnected from socket.io server. Listeners: ', {
      listeners: socketRef.current?.listeners,
    });
    socketRef.current = undefined;
  };

  /***
   * OUTGOING EVENTS
   ***/
  const startRecording = async (
    sourceLanguage: string,
    targetLanguage: string,
  ) => {
    if (!socketRef.current || !socketRef.current.connected) {
      log.event('start_recording_when_empty_socket');
      return;
    }

    isRecording.current = true;
    socketRef.current.emit(OutgoingEvents.START_RECORDING, {
      sourceLanguage,
      targetLanguage,
    });
    const updatedJob = {
      isRunning: true,
      startTime: Date.now(),
      isTranscriptionRunning: true,
      isTranslationRunning: false,
      isWaitingTranscriptionEndSignal: false,
      sourceCode: sourceLanguage,
      targetCode: targetLanguage,
      transcription: '',
      translation: '',
      audioOutput: '',
    };
    jobRef.current = updatedJob;
    setJob(updatedJob);

    // Start microphone stream
    MicrophoneStream.start();
  };

  MicrophoneStream.on('data', data => {
    if (isRecording.current === true) {
      try {
        const chunk = Buffer.from(data, 'base64');
        socketRef.current?.emit(OutgoingEvents.AUDIO_DATA, chunk);
      } catch (err) {
        log.error('Error converting microphone stream: ', err);
      }
    }
  });

  const stopRecording = async () => {
    isRecording.current = false;
    MicrophoneStream.stop();
    socketRef.current?.emit(OutgoingEvents.STOP_RECORDING);
    if (jobRef.current) {
      const updateJob = produce(jobRef.current, draft => {
        draft.isWaitingTranscriptionEndSignal = true;
      });
      jobRef.current = updateJob;
      setJob(updateJob);
      setTimeout(() => {
        if (jobRef.current) {
          const updatedJob = produce(jobRef.current, draft => {
            draft.isWaitingTranscriptionEndSignal = false;
          });
          jobRef.current = updatedJob;
          setJob(updatedJob);
        }
      }, 1000);
    }
  };

  useEffect(() => {
    const stateChangeHandler = async (newAppState: string) => {
      if (newAppState === 'background') {
        disconnect();
      }
      if (newAppState === 'active') {
        setLoading(true);
        await waitServerResponse();
        setLoading(false);
        if (socketRef.current && !socketRef.current.connected) {
          socketRef.current.connect();
        }
        if (!socketRef.current) {
          connect();
        }
      }
    };
    const appStateSubscription = AppState.addEventListener(
      'change',
      stateChangeHandler,
    );
    return () => {
      appStateSubscription.remove();
    };
  }, []);

  return {
    connect,
    disconnect,
    startRecording,
    stopRecording,
    waitServerResponse,
    job,
  };
};
