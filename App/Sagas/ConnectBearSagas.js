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

import { call, put } from 'redux-saga/effects'
// import ConnectBearActions from '../Redux/ConnectBearRedux'
import axios from 'axios'

function promisifiedFn (settings) {
  var body = new FormData() // Empty body, jo no header lācim vieglāk atgūt info.
  body.append('bdy', 'not-an-empty-body')

  return axios.post(settings.uploadUrl, body,
    {
      headers: {
        // 'Content-Type': settings.contentType,
        'Ss-Id': settings.ssid,
        'Password': settings.password
      }
    })
}

export function * getConnectBear (action) {
  const { ssid, password, index } = action
  // make the call to the api
  let settings = {
    ssid: ssid,
    password: password,
    // contentType: 'application/octet-stream',
    uploadUrl: 'http://104.129.5.43/registerBear' // LOCAL ADRESS
  }

  try {
    const response = yield call(promisifiedFn, settings)
    // jānoskaidro kur tieši response būs bear_key
    yield put({ type: 'CONNECT_BEAR_SUCCESSFUL', bear_key: response.data, index: index })
  } catch (error) {
    yield put({ type: 'CONNECT_BEAR_UNSUCCESSFUL' })
  }

  return
}
