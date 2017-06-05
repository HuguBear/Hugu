import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import RNFS from 'react-native-fs'

const LIST_DATA = [
   /* {
      filePath: 'filePath',
      fileName: filePath.split('.')[0],
      isUploading: false,
      sent: false,
      received: false,
      listened: false
    }, */
]

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  recordStart: null,
  recordSuccess: ['filePath'],
  recordFailure: ['error'],
  renameAudio: ['bundle'],
  deleteAudio: ['filePath'],
  uploadRequest: ['filePath', 'bearKey'],
  uploadSuccess: ['filePath'],
  uploadFailure: ['error']
})

export const RecordTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  audioFiles: LIST_DATA,
  isRecording: false,
  finishedRecording: false,
  lastRecordedFilePath: null,
  sendingFromRecordScreen: 0,
  error: null

})

/* ------------- Reducers ------------- */
export const recordStart = (state: Object) => {
  return state.merge({
    isRecording: true,
    finishedRecording: false,
    sendingFromRecordScreen: 0,
    error: null
  })
}

export const recordSuccess = (state: Object, { filePath }: Object) => {
  const audioFiles = [ ...state.audioFiles, {
    filePath: filePath,
    fileName: filePath.split('audio/')[1].split('.')[0],
    isUploading: false,
    sent: false,
    received: false,
    listened: false
  }]
  return state.merge({
    audioFiles,
    isRecording: false,
    finishedRecording: true,
    lastRecordedFilePath: filePath
  })
}

export const recordFailure = (state, action) => {
  return state.merge({
    isRecording: false,
    finishedRecording: false,
    error: action.error
  })
}

export const renameAudio = (state: Object, { bundle }: Object) => {
  const { filePath, newName } = bundle
  const audioFiles = state.audioFiles.map(audio => audio.filePath === filePath ? {
    filePath: audio.filePath,
    fileName: newName,
    isUploading: audio.isUploading,
    sent: audio.sent,
    received: audio.received,
    listened: audio.listened
  } : audio)
  return state.merge({
    audioFiles,
    error: null
  })
}

export const deleteAudio = (state: Object, { filePath }: Object) => {
  const audioFiles = state.audioFiles.filter(audio =>
    audio.filePath !== filePath,
    RNFS.unlink(filePath)
  )
  var lastRecordedFilePath = (state.lastRecordedFilePath === filePath) ? null : state.lastRecordedFilePath
  var sendingFromRecordScreen = (state.lastRecordedFilePath === filePath) ? 0 : state.sendingFromRecordScreen
  return state.merge({
    audioFiles,
    lastRecordedFilePath,
    sendingFromRecordScreen,
    error: null
  })
}

export const uploadRequest = (state: Object, { filePath }: Object) => {
  const audioFiles = state.audioFiles.map(audio =>
    audio.filePath === filePath ? {
      filePath: audio.filePath,
      fileName: audio.fileName,
      isUploading: true,
      sent: audio.sent,
      received: audio.received,
      listened: audio.listened
    } : audio)
  var sendingFromRecordScreen = (state.lastRecordedFilePath === filePath) ? 1 : state.sendingFromRecordScreen
  return state.merge({
    audioFiles,
    sendingFromRecordScreen,
    error: null
  })
}

export const uploadSuccess = (state: Object, { filePath }: Object) => {
  const audioFiles = state.audioFiles.map(audio => audio.filePath === filePath ? {filePath: audio.filePath, fileName: audio.fileName, isUploading: false, sent: true, received: audio.received, listened: audio.listened} : audio)
  const sendingFromRecordScreen = (state.sendingFromRecordScreen === 1) ? 2 : 0
  return state.merge({
    audioFiles,
    sendingFromRecordScreen,
    error: 'SUCCESSFUL'
  })
}

export const uploadFailure = (state, action) => {
  const { error } = action
  const audioFiles = state.audioFiles.map(audio => audio.filePath === error.filePath ? {filePath: audio.filePath, fileName: audio.fileName, isUploading: false, sent: audio.sent, received: audio.received, listened: audio.listened} : audio)
  return state.merge({
    audioFiles,
    sendingFromRecordScreen: -1,
    error: 'UNSUCCESSFUL'
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RECORD_START]: recordStart,
  [Types.RECORD_SUCCESS]: recordSuccess,
  [Types.RECORD_FAILURE]: recordFailure,
  [Types.RENAME_AUDIO]: renameAudio,
  [Types.DELETE_AUDIO]: deleteAudio,
  [Types.UPLOAD_REQUEST]: uploadRequest,
  [Types.UPLOAD_SUCCESS]: uploadSuccess,
  [Types.UPLOAD_FAILURE]: uploadFailure
})
