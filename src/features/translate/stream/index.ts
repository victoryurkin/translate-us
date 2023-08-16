import { useRef, useState, useCallback } from 'react';
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

const floatTo16BitPCM = (input: Float32Array, output: Int16Array) => {
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
};

MicrophoneStream.init({
  sampleRate: 44100,
  channels: 1,
  bitsPerSample: 32,
  bufferSize: 4096,
  wavFile: `${DocumentDirectoryPath}/audio.wav`,
});

export const useStream = () => {
  const { accessToken } = useAuth();
  const [job, setJob] = useState<Job>();
  const jobRef = useRef<Job>();
  const socketRef = useRef<Socket>();
  const isRecording = useRef(false);

  // https://translate-stream-service-ocrtlpqp4q-uk.a.run.app
  const connect = useCallback(() => {
    socketRef.current = io(
      'https://translate-stream-service-ocrtlpqp4q-uk.a.run.app',
      {
        reconnectionDelayMax: 500,
        auth: {
          token: accessToken,
        },
      },
    );

    socketRef.current.on('disconnect', () => {
      // socketRef.current?.removeAllListeners();
      socketRef.current?.connect();
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

  const disconnect = useCallback(() => {
    socketRef.current?.disconnect();
  }, []);

  /***
   * OUTGOING EVENTS
   ***/

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
    [connect],
  );

  MicrophoneStream.on('data', data => {
    if (isRecording.current === true) {
      try {
        const chunk = Buffer.from(data, 'base64');
        const raw = new Float32Array(chunk.buffer);
        if (raw == null) {
          return;
        }
        const int16Array = new Int16Array(raw.length);
        floatTo16BitPCM(raw, int16Array);
        socketRef.current?.emit(OutgoingEvents.AUDIO_DATA, int16Array);
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
    job,
  };
};
