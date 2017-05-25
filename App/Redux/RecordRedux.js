import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startRecording: null,
  endRecording: null,
  recordSuccess: ['filePath'],
  recordFailure: ['error'],
  changeState: ['stateName'],
  startRenaming: ['name'],
  renameSuccess: ['msg'],
  renameFailure: ['error'],
  uploadRequest: ['filepath', 'bearKey'],
  uploadSuccess: ['hashedName', 'fileName'],
  uploadFailure: ['error'],
  instanceUpdated: ['recordingName'],
  resetState: null
})

export const RecordTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isRecording: false,
  isUploading: false,
  finishedRecording: false,
  currentState: 'start',
  isRenamed: false,
  sent: false,
  filePath: null,
  error: null,
  instanceUpdated: false

})

/* ------------- Reducers ------------- */

const start = (state, action) => {
  return state.merge({isRecording: true, currentState: 'recording'})
}

const end = (state, action) => {
  return state.merge({isRecording: false})
}

const success = (state, action) => {
  console.log(action)
  return state.merge({
    isRecording: false,
    finishedRecording: true,
    filePath: action.filePath,
    currentState: 'finished'
  })
}

const failure = (state, action) => {
  return state.merge({isRecording: false, finishedRecording: false, error: action.error})
}

export const stateChange = (state, action) => {
  switch (action.stateName) {
    case 'start':
    case 'recording':
    case 'finished': // right after recording has been finished
    case 'finishedUploading':
    case 'sending':
    case 'renaming':
    case 'uploading':
      return state.merge({ currentState: action.stateName })
  }
}

const startRenaming = (state, action) => {
  return state.merge({currentState: 'renaming'})
}

const renameSuccess = (state, action) => {
  return state.merge({})
}

const renameFailure = (state, action) => {
  return state.merge({})
}

const uploadRequest = (state, action) => {
  return state.merge({isUploading: true, instanceUpdated: null})
}

const uploadSuccess = (state, action) => {
  return state.merge({currentState: 'finishedUploading', isUploading: false})
}

const uploadFailure = (state, action) => {
  return state.merge({currentState: 'finishedUploadingWithError', isUploading: false, error: action.error})
}

const updateInstance = (state, action) => {
  return state.merge({instanceUpdated: action.recordingName}) // AsyncStorage updated
}

const resetState = (state, action) => {
  return state.merge({
    isRecording: false,
    isUploading: false,
    finishedRecording: false,
    currentState: 'start',
    isRenamed: false,
    sent: false,
    filePath: null,
    error: null,
    instanceUpdated: false
  })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.START_RECORDING]: start,
  [Types.END_RECORDING]: end,
  [Types.RECORD_SUCCESS]: success,
  [Types.RECORD_FAILURE]: failure,
  [Types.CHANGE_STATE]: stateChange,
  [Types.START_RENAMING]: startRenaming,
  [Types.RENAME_SUCCESS]: renameSuccess,
  [Types.RENAME_FAILURE]: renameFailure,
  [Types.UPLOAD_REQUEST]: uploadRequest,
  [Types.UPLOAD_SUCCESS]: uploadSuccess,
  [Types.UPLOAD_FAILURE]: uploadFailure,
  [Types.INSTANCE_UPDATED]: updateInstance,
  [Types.RESET_STATE]: resetState
})
