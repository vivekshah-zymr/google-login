import React, { useState } from 'react';
import RecordRTC from 'recordrtc';

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [recorder, setRecorder] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = RecordRTC(stream, { type: 'audio' });
      newRecorder.startRecording();
      setIsRecording(true);
      setRecorder(newRecorder);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    console.log("recorder=====",recorder);
    if (recorder) {
      recorder.stopRecording(() => {
        setAudioUrl(recorder.toURL());
        setIsRecording(false);
      });
    }
  };

  return (
    <div>
      <h2>Audio Recorder</h2>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>

      {audioUrl && (
        <audio controls src={audioUrl} />
      )}
    </div>
  );
}

export default AudioRecorder;
