'use strict'
/**
 * This exposes the native VoicePlayer module as a JS module.
 */
import { DeviceEventEmitter, NativeModules } from 'react-native' // Catches Events
let RecordingManager = NativeModules.VoicePlayer
var extStoragePath

function AudioPlayer () {
  this.isVoicePlaying = false
  this.finished = () => {
    this.isVoicePlaying = false
  }
  this.isNull = () => {
    console.log('MP IS NULL')
  }

  // When playback ends
  DeviceEventEmitter.addListener('playBackFinished', this.finished)
  DeviceEventEmitter.addListener('isNull', this.isNull)
};

AudioPlayer.prototype.play = function (destination) { // String filename
  if (this.isVoicePlaying) {
    RecordingManager.pause()
    this.isVoicePlaying = false
    return
  } else {
    console.log('Starting')
    console.log(destination)
    RecordingManager.play(destination)
    this.isVoicePlaying = true
  }
}

AudioPlayer.prototype.pause = function () {
  RecordingManager.pause()
  this.isVoicePlaying = false
}

AudioPlayer.prototype.getStoragePath = function (storagePath) {
  // console.log(storagePath);
  RecordingManager.getStoragePath((storagePath) => {
    return extStoragePath
  })
  // return storagePath;
}

export default AudioPlayer
