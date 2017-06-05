// @flow

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  bearRow: {
    height: 70
  },
  bearNameButton: {
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    height: 40,
    width: Metrics.screenWidth / 1.70,
    paddingTop: 2,
    backgroundColor: Colors.seaweed
  },
  bearNameText: {
    textAlign: 'center',
    fontSize: 20
  },
  bearKey: {
    position: 'absolute',
    top: 38,
    left: Metrics.screenWidth / 2 - (Metrics.screenWidth / 2.3 / 2),
    width: Metrics.screenWidth / 2.3,
    borderColor: 'black',
    borderWidth: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 0,
    backgroundColor: Colors.windowTint
  },
  bearKeyText: {
    fontSize: 10,
    textAlign: 'center'
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 40,
    marginBottom: 20
  }
})
