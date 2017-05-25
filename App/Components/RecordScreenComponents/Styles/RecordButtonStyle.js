// @flow

import { StyleSheet } from 'react-native'
import { Metrics } from '../../../Themes/'

export default StyleSheet.create({
  recordContainer: {
    alignSelf: 'stretch',
    height: Metrics.screenHeight - (Metrics.screenHeight / 5 * 3 - Metrics.navBarHeight),
    // justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Metrics.screenHeight / 2 / 2
    // backgroundColor: 'green',
  },
  outterRecordCircle: {
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.screenWidth / 5 * 2,
    width: Metrics.screenWidth / 5 * 2
    // borderRadius: 170, //Half of the animated final value
  },
  innerRecordCircle: {
    height: Metrics.screenWidth / 5 * 2,
    width: Metrics.screenWidth / 5 * 2,
    borderRadius: Metrics.screenWidth / 5 * 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bdc3c7',
    opacity: 0.9
  }
})
