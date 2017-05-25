'use strict'
/**
 * This exposes the native VoicePlayer module as a JS module.
 */
import { NativeModules } from 'react-native' // Catches Events
let UtilityManager = NativeModules.Utility

function Utility () {
  Utility.prototype.RecordingsDirPath = UtilityManager.RecordingsDirPath
  Utility.prototype.test = 'Hmmmmmmmmmmmmm'
}

Utility.prototype.renameRecording = function (currentFileName, renameTo, successCallback, errorCallback) {
  UtilityManager.rename(currentFileName, renameTo, (data) => successCallback(data), (msg) => errorCallback(msg))
}

export default Utility
