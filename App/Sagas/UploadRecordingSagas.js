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
import UploadRecordingActions from '../Redux/RecordRedux'
import axios from 'axios'

function promisifiedFn (settings) {
  var recording = {
    uri: settings.uri,
    type: 'audio/m4a',
    name: settings.fileName
  }

  var body = new FormData()
  body.append('voicerecording', recording)
  body.append('bear_key', settings.bear_key)
  return axios.post(settings.uploadUrl, body,
    {
      headers: {
        'Content-Type': settings.contentType
      }
    })
}

export function * getUploadRecording (action) {
  const { filepath, bearKey } = action

  const settings = {
    uri: 'file://' + filepath,
    uploadUrl: 'http://104.129.5.43/postaudio',
    fileName: filepath.split('/').pop(), // default to 'yyyyMMddhhmmss.xxx'
    contentType: 'application/octet-stream', // default to 'application/octet-stream'
    bear_key: bearKey
  }

  const response = yield call(promisifiedFn, settings)
  if (typeof (response) === 'undefined') {
    yield put(UploadRecordingActions.uploadFailure('No response'))
    return
  }

  if (response.headers.uploadstatus === 'OK') {
    yield put(UploadRecordingActions.uploadSuccess(response.data, settings.fileName))
  } else {
    if (response.data) {
      yield put(UploadRecordingActions.uploadFailure(response.data))
    } else {
      yield put(UploadRecordingActions.uploadFailure(response))
    }
  }
}
