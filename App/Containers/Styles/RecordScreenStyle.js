// @flow

import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  progressText: {
    paddingTop: 50,
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
  recordContainer: {
    alignSelf: 'stretch',
    height: Metrics.screenHeight / 2,
    alignItems: 'center'
  },
  outterRecordCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
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
  },
  button: {
    alignSelf: 'center',
    margin: 5,
    height: 45,
    width: Metrics.screenWidth / 2,
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
    width: Metrics.screenWidth / 2,
    backgroundColor: Colors.seaweed,
    borderRadius: 23
  }
})
