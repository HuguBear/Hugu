import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const LIST_DATA = {
  connected: [
    {bearName: 'Registered', bearKey: 'QWERTYUIOP1234567891'}
  ],
  unconnected: [
    {bearName: 'LongPress', bearKey: 'QWERTYUIOP1234567891'}
  ]
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  testSagaRequest: ['testSagaInput'],
  testSagaFailure: ['testSagaFailureInput'],
  testSagaSuccess: ['testSagaSuccessInput'],
  addBearRequest: ['bear'],
  connectBearRequest: ['index'],
  deleteBearRequest: ['indexes']
})

export const RecordTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  results: LIST_DATA,
  requesting: false
})

/* ------------- Reducers ------------- */

export const testSagaRequest = (state: Object) => state.merge({ requesting: true })

export const testSagaFailure = (state: Object, { testSagaFailureInput }: Object) => {
  const results = LIST_DATA
  results.first[0].title = testSagaFailureInput
  return state.merge({ requesting: false, results })
}

export const testSagaSuccess = (state: Object, { testSagaSuccessInput }: Object) => {
  const results = LIST_DATA
  results.first[0].title = testSagaSuccessInput
  return state.merge({ requesting: false, results })
}

export const addBearRequest = (state: Object, { bear }: Object) => {
  const results = {
    connected: [ ...state.results.connected ],
    unconnected: [ ...state.results.unconnected, bear ]
  }
  return state.merge({ results })
}

export const connectBearRequest = (state: Object, { index }: Object) => {
  const bear = state.results.unconnected[index]
  const results = {
    connected: [ ...state.results.connected, bear ],
    unconnected: [
      ...state.results.unconnected.slice(0, Number(index)),
      ...state.results.unconnected.slice(Number(index) + 1, state.results.unconnected.length)
    ]
  }
  return state.merge({ results })
}

export const deleteBearRequest = (state: Object, { indexes }: Object) => {
  const { rowID, sectionID } = indexes
  // some very weird interaction with rowID. its typeof string so
  // when slicing and using +1 it actually first writes it as string for example
  // rowID 5(+1) -> 51 and then tries to slice with that 51. Therefore
  // Numbeer(rowID). Spent some time here. lul JAVASCRIIIIPT :D
  let results
  if (sectionID === 'connected') {
    results = {
      connected: [
        ...state.results.connected.slice(0, Number(rowID)),
        ...state.results.connected.slice(Number(rowID) + 1, state.results.connected.length)
      ],
      unconnected: [ ...state.results.unconnected ]
    }
  } else if (sectionID === 'unconnected') {
    results = {
      connected: [
        ...state.results.connected
      ],
      unconnected: [
        ...state.results.unconnected.slice(0, Number(rowID)),
        ...state.results.unconnected.slice(Number(rowID) + 1, state.results.unconnected.length)
      ]
    }
  }

  return state.merge({ results })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TEST_SAGA_REQUEST]: testSagaRequest,
  [Types.TEST_SAGA_FAILURE]: testSagaFailure,
  [Types.TEST_SAGA_SUCCESS]: testSagaSuccess,
  [Types.ADD_BEAR_REQUEST]: addBearRequest,
  [Types.CONNECT_BEAR_REQUEST]: connectBearRequest,
  [Types.DELETE_BEAR_REQUEST]: deleteBearRequest
})
