import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const LIST_DATA = {
  registered: [
    // {bearName: 'First Title', bearKey: 'First Description'},
  ],
  unregistered: [
    {bearName: 'Check BearRedux', bearKey: 'Saga ready two with example'}
  ]
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  testSagaRequest: ['testSagaInput'],
  testSagaFailure: ['testSagaFailureInput'],
  testSagaSuccess: ['testSagaSuccessInput'],
  addBearRequest: ['bear'],
  deleteBearRequest: ['indexToDelete']
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
    registered: [ ...state.results.registered, bear ],
    unregistered: [ ...state.results.unregistered ]
  }
  // results.registered.push({bearName: bear.bearName, bearKey: bear.bearKey});
  return state.merge({ results })
}

export const deleteBearRequest = (state: Object, { indexToDelete }: Object) => {
  // some very weird interaction with indexToDelete. its typeof string so
  // when slicing and using +1 it actually first writes it as string for example
  // indexToDelete 5(+1) -> 51 and then tries to slice with that 51. Therefore
  // Numbeer(indexToDelete). Spent some time here. lul :D
  const results = {
    registered: [
      ...state.results.registered.slice(0, Number(indexToDelete)),
      ...state.results.registered.slice(Number(indexToDelete) + 1, state.results.registered.length)
    ],
    unregistered: [ ...state.results.unregistered ]
  }
  return state.merge({ results })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TEST_SAGA_REQUEST]: testSagaRequest,
  [Types.TEST_SAGA_FAILURE]: testSagaFailure,
  [Types.TEST_SAGA_SUCCESS]: testSagaSuccess,
  [Types.ADD_BEAR_REQUEST]: addBearRequest,
  [Types.DELETE_BEAR_REQUEST]: deleteBearRequest
})
