// @flow

import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes/'

const RECORD_CONTROLS_HEIGHT = 440

export default StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  controls: {
    paddingTop: (Metrics.screenHeight - RECORD_CONTROLS_HEIGHT) / 2,
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    alignItems: 'center'
  },
  progressText: {
    fontSize: 50,
    color: '#fff'
  },
  disabledButtonText: {
    color: '#eee'
  },
  activeButtonText: {
    fontSize: 20,
    color: '#B81F00'
  },
  button: {
    alignSelf: 'center',
    margin: 5,
    height: 45,
    width: 200,
    backgroundColor: Colors.darkRicePaper,
    borderRadius: 23
  },
  buttonText: {
    paddingTop: 1,
    textAlign: 'center',
    color: Colors.ricePaper,
    fontSize: 30
  },
  sendingText: {
    position: 'absolute',
    left: 15,
    top: 1,
    color: Colors.ricePaper,
    fontSize: 30
  },
  sendingIndicator: {
    position: 'absolute',
    top: 4,
    right: 5
  },
  sentButton: {
    alignSelf: 'center',
    margin: 5,
    height: 45,
    width: 200,
    backgroundColor: Colors.seaweed,
    borderRadius: 23
  }
})
