// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    // marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.cloud
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    padding: 15,
    fontWeight: 'bold'
  },
  modalParent: {
    backgroundColor: Colors.ricePaper,
    height: Metrics.screenHeight
  },
  modalView: {
    marginTop: 50,
    width: Metrics.screenWidth - 80,
    alignSelf: 'center',
    backgroundColor: Colors.steel,
    borderRadius: 10
  },
  modalTitle: {
    height: 20,
    margin: 10,
    textAlign: 'center'
  },
  modalTextInput: {
    height: 40,
    width: 200,
    margin: 15,
    alignSelf: 'center',
    textAlign: 'center'
  }
})
