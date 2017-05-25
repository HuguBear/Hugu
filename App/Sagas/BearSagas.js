import { put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import BearActions from '../Redux/BearRedux'

export function * testSagaBears ({ testSagaInput }) {
  if (testSagaInput === 'lul') {
    // dispatch failure
    yield delay(1000)
    yield put(BearActions.testSagaFailure('failure'))
  } else {
    yield delay(1000)
    // dispatch successful logins
    yield put(BearActions.testSagaSuccess('success'))
  }
}
