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
import RecordActions from '../Redux/RecordRedux'
import axios from 'axios'

function promisifiedFn (settings) {
  // console.log(settings);
  var body = new FormData()
  // console.log(JSON.stringify(settings.audioListItems));
  body.append('recordings_array', JSON.stringify(settings.audioListItems))
  // body.append('bear_key', settings.bear_key)
  return axios.post(settings.url, body,
    {
      headers: {
        // 'Content-Type': settings.contentType
      }
    })
}

export function * getAudioListStatus (action) {
  let audioListItems = action.audiolistItems
  // console.log("getAudioListStatus");
  // console.log(action);
  let audioArray = []
  for (var i = 0; i < audioListItems.length; i++) {
    // Ja ir nosūtīts UN nav vēl atzīmēts kā noklausīts
    if (audioListItems[i].sent && !audioListItems[i].listened) {
      audioArray.push(audioListItems[i].recordingName)
    }
  }
  let settings = {
    audioListItems: audioArray,
    url: 'http://104.129.5.43/recording-list-status'
    // bear_key:
  }

  try {
    const response = yield call(promisifiedFn, settings)
    // console.log(response.data);
    yield put(RecordActions.refreshAudioSuccess(response.data))
  } catch (error) {
      // console.log(error);
    yield put(RecordActions.refreshAudioFailure(error))
  }

  return
}
  // make the call to the api
  // const response = yield call(api.getAudioliststatus, data)

  // // success?
  // if (response.ok) {
  //   // You might need to change the response here - do this with a 'transform',
  //   // located in ../Transforms/. Otherwise, just pass the data back from the api.
  //   yield put(AudioListStatusActions.audioliststatusSuccess(response.data))
  // } else {
  //   yield put(AudioListStatusActions.audioliststatusFailure())
  // }
