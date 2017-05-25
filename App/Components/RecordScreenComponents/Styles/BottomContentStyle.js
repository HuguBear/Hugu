// @flow

import { StyleSheet } from 'react-native'
import { Metrics } from '../../../Themes/'

export default StyleSheet.create({
  container: {
    // flex: 1,
    height: Metrics.screenHeight / 5 * 3 - Metrics.navBarHeight,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Metrics.screenHeight / 10 - Metrics.navBarHeight
    // backgroundColor: 'yellow'
  },
  timer: {
    fontSize: 50,
    color: 'white',
    alignSelf: 'center'
  },
  sendButton: {
    height: 50,
    width: Metrics.screenWidth / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 10,
    flexWrap: 'nowrap',
    marginHorizontal: 10,
    borderRadius: 2
  },
  renameButton: {
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    flexWrap: 'nowrap',
    borderBottomWidth: 1
  }
})
