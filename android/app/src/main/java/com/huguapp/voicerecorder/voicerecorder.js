'use strict'
/**
 * This exposes the native AudioRecorder module as a JS module.
 */

import { NativeModules } from 'react-native'
let AudioRecorderManager = NativeModules.VoiceRecorder

function AudioRecorder () {
  this.isAudioRecording = false
};

AudioRecorder.prototype.startAudioRecording = function (successCallback, errorCallback) {
  console.log(AudioRecorderManager)
  if (!this.isAudioRecording) {
    this.isAudioRecording = true // Audio is now recording
    AudioRecorderManager.startAudioRecording((data) => successCallback(data), (error) => errorCallback(error))
  } else {
    errorCallback('recording in progress')
  }
}
AudioRecorder.prototype.stopAudioRecording = function (callback) {
  if (this.isAudioRecording) {
    this.isAudioRecording = false // Recording stopped
    AudioRecorderManager.stopAudioRecording((result) => {
      callback(result)
    })
  }
}

export default AudioRecorder
