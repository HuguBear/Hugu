// @flow

import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
  row: {
    marginVertical: Metrics.smallMargin,
    marginHorizontal: 40,
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 3
  },
  audioRow: {
    position: 'absolute',
    width: Metrics.screenWidth / 1.285,
    height: 45,
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white'
  },
  audioExtra: {
    position: 'absolute',
    top: 45,
    width: Metrics.screenWidth / 1.285,
    paddingVertical: 4,
    backgroundColor: 'grey',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    alignSelf: 'center'
  },
  additionalButtons: {
    // maxHeight: 50,
  },
  audioExtraTopContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    marginBottom: 5
  },
  uploadStatusText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '500'
  },
  audioName: {
    fontSize: 18,
    flexDirection: 'row',
    flex: 1
  },
  audioStatus: {
    flexDirection: 'row',
    width: 82
  },
  audioStatusText: {
    position: 'absolute',
    top: 5,
    left: 25,
    fontSize: 12,
    fontWeight: 'bold',
    flexWrap: 'wrap'
  },
  audioHeading: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  },
  playButton: {
    fontSize: 15
  },
  renameButton: {
    fontSize: 15,
    marginLeft: 10
  },
  deleteButton: {
    fontSize: 15,
    marginLeft: 10
  }
})
