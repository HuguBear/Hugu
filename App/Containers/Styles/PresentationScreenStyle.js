// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  centered: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  mainText: {
    height: Metrics.screenHeight / 2.7,
    width: Metrics.screenWidth
  },

  Heading1: {
    fontSize: 72,
    color: Colors.snow
  }
})
