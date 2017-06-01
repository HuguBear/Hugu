// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  row: {
    height: 45,
    marginVertical: Metrics.smallMargin,
    marginHorizontal: 40,
    justifyContent: 'center',
    zIndex: 3
  },
  audioRow: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 30
  },
  audioExtra: {
    position: 'absolute',
    top: 45,
    width: Metrics.screenWidth / 1.285,
    paddingVertical: 4,
    backgroundColor: 'grey',
    borderRadius: 25,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    zIndex: 1
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
    fontSize: 19,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    textAlign: 'right',
    maxWidth: Metrics.screenWidth - 70
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
