import { call, put } from 'redux-saga/effects'
import RecordingActions from '../Redux/RecordRedux'
import { AsyncStorage } from 'react-native'

function promisifiedFnGet (settings) {
  return AsyncStorage.getItem(settings.key, (err, result) => {
    if (err) {
      console.log(err.stack)
    }
  })
}

function promisifiedFnSet (settings) {
  return AsyncStorage.setItem(settings.key, settings.data)
}

export function * setListened (action) {
  const { fileName } = action
  const settings = {
    name: fileName,
    key: fileName.split('.')[0]
  }
  const data = yield call(promisifiedFnGet, settings)
  if (data != null) {
    settings.data = JSON.parse(data)
    settings.data.sent = true
    settings.data = JSON.stringify(settings.data)
    yield call(promisifiedFnSet, settings)
    yield put(RecordingActions.instanceUpdated(settings.name))
  }
}
