/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to Sagas/index.js
*  - This template uses the api declared in Sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'

function promisifiedFn (settings) {
  try {
    return AsyncStorage.setItem(settings.key, JSON.stringify({
      name: settings.name,
      sent: false,
      listened: false
    }))
  } catch (e) {
    return 'Error while creating an instance'
  }
}

export function * createRecordingInstance (action) {
  let parts = action.filePath.split('/')
  let name = parts.pop()
  let key = name.split('.')[0]
  const settings = {
    name: name,
    key: key
  }
  yield call(promisifiedFn, settings)
}
