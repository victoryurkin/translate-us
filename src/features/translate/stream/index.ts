import { useRef, useState, useCallback, useEffect } from 'react';
import { AppState } from 'react-native';
import MicrophoneStream from 'react-native-live-audio-stream';
import { useAuth } from '@translate-us/context';
import { io, Socket } from 'socket.io-client';
import { Buffer } from 'buffer';
import { produce } from 'immer';
import { writeFile, DocumentDirectoryPath } from 'react-native-fs';
import Sound from 'react-native-sound';

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
  const { accessToken } = useAuth();
  const [job, setJob] = useState<Job>();
  const jobRef = useRef<Job>();
  const socketRef = useRef<Socket>();
  const isRecording = useRef(false);

  useEffect(() => {
    AppState.addEventListener('change', async newAppState => {
      if (newAppState === 'active') {
        if (!socketRef.current?.connected) {
          disconnect();
          await waitServerResponse();
          connect();
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connect = useCallback(async () => {
    // try {
    //   await fetch(apiUrl);
    // } catch (error) {
    //   console.log('Error connecting to the server: ', error);
    // }

    socketRef.current = io(apiUrl, {
      reconnectionDelayMax: 500,
      auth: {
        token: accessToken,
      },
    });

    // socketRef.current.on('disconnect', reason => {
    //   console.log('!!!', reason);
    // });
    // socketRef.current.on('disconnect', () => {
    //   // if (socketRef.current) {
    //   //   socketRef.current.connect();
    //   // } else {
    //   //   socketRef.current = io('http://localhost:8000', {
    //   //     reconnectionDelayMax: 500,
    //   //     auth: {
    //   //       token: accessToken,
    //   //     },
    //   //   });
    //   // }
    // });

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
        console.log('Error on transcriptionData incoming event: ', err);
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
        console.log('Error on translationData incoming event: ', err);
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
            console.log('Error loading sound: ', error);
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
        console.log('Transcription data is invalid: ', err);
      }
    });
  }, [accessToken]);

  const waitServerResponse = useCallback(async () => {
    try {
      await fetch(`${apiUrl}/healthcheck`);
    } catch (error) {
      console.error('Error checking server status: ', error);
    }
  }, []);

  const disconnect = useCallback(() => {
    socketRef.current?.disconnect();
    socketRef.current?.removeAllListeners();
    socketRef.current = undefined;
  }, []);

  /***
   * OUTGOING EVENTS
   ***/

  // const reconnect = (): Promise<void> =>
  //   new Promise(resolve => {
  //     try {
  //       disconnect();
  //       connect();
  //       setTimeout(() => {
  //         resolve();
  //       }, 300);
  //     } catch (error) {
  //       console.log('Error reconnecting');
  //     }
  //   });

  const startRecording = useCallback(
    async (sourceLanguage: string, targetLanguage: string) => {
      if (!socketRef.current) {
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [connect],
  );

  MicrophoneStream.on('data', data => {
    if (isRecording.current === true) {
      try {
        const chunk = Buffer.from(data, 'base64');
        socketRef.current?.emit(OutgoingEvents.AUDIO_DATA, chunk);
      } catch (err) {
        console.log('Error converting microphone stream: ', err);
      }
    }
  });

  const stopRecording = useCallback(async () => {
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
