import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import RNFS from 'react-native-fs'

const LIST_DATA = [
   /* {
      filePath: 'filePath',
      fileName: filePath.split('.')[0],
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
  isUploading: false,
  finishedRecording: false,
  sent: false,
  error: null

})

/* ------------- Reducers ------------- */
export const recordStart = (state: Object) => {
  return state.merge({
    isRecording: true,
    finishedRecording: false

  })
}

export const recordSuccess = (state: Object, { filePath }: Object) => {
  const audioFiles = [ ...state.audioFiles, {filePath: filePath, fileName: filePath.split('audio/')[1].split('.')[0], sent: false, received: false, listened: false} ]
  return state.merge({
    audioFiles,
    isRecording: false,
    finishedRecording: true
  })
}

export const recordFailure = (state, action) => {
  return state.merge({isRecording: false, finishedRecording: false, error: action.error})
}

export const renameAudio = (state: Object, { bundle }: Object) => {
  const { filePath, newName } = bundle
  const audioFiles = state.audioFiles.map(audio => audio.filePath === filePath ? {filePath: audio.filePath, fileName: newName, sent: audio.sent, received: audio.received, listened: audio.listened} : audio)
  return state.merge({audioFiles})
}

export const deleteAudio = (state: Object, { filePath }: Object) => {
  const audioFiles = state.audioFiles.filter(audio =>
    audio.filePath !== filePath, // MAYBE DONT NEEX THAT FLAG
    RNFS.unlink(filePath)
  )
  return state.merge({
    audioFiles
  })
}

export const uploadRequest = (state, action) => {
  return state.merge({isUploading: true})
}

export const uploadSuccess = (state: Object, { filePath }: Object) => {
  const audioFiles = state.audioFiles.map(audio => audio.filePath === filePath ? {filePath: audio.filePath, fileName: audio.fileName, sent: true, received: audio.received, listened: audio.listened} : audio)
  return state.merge({
    audioFiles,
    currentState: 'finishedUploading',
    isUploading: false
  })
}

export const uploadFailure = (state, action) => {
  return state.merge({currentState: 'finishedUploadingWithError', isUploading: false, error: action.error})
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
