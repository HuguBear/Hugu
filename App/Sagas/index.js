import { takeLatest, takeEvery } from 'redux-saga/effects'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { OpenScreenTypes } from '../Redux/OpenScreenRedux'
import { RecordTypes } from '../Redux/RecordRedux'
import { BearTypes } from '../Redux/BearRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { openScreen } from './OpenScreenSagas'
import { getUploadRecording } from './UploadRecordingSagas'
import { getConnectBear } from './ConnectBearSagas'

/* ------------- Connect Types To Sagas ------------- */
  console.log(BearTypes);
  console.log(RecordTypes);
export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(OpenScreenTypes.OPEN_SCREEN, openScreen),
    takeLatest(BearTypes.CONNECT_BEAR_REQUEST, getConnectBear),

    // some sagas receive extra parameters in addition to an action
    takeEvery(RecordTypes.UPLOAD_REQUEST, getUploadRecording)
  ]
}
