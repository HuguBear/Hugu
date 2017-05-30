// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
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

  audioRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.screenWidth,
    marginVertical: 2,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white'
  },
  audioExtra: {
    marginTop: 10,
    width: Metrics.screenWidth,
    paddingVertical: 15,
    backgroundColor: 'grey',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  additionalButtons: {
    flex: 1,
    justifyContent: 'flex-start'
    // maxHeight: 50,
  },
  audioExtraTopContent: {
    width: Metrics.screenWidth,
    flexDirection: 'row',
    paddingHorizontal: 30,
    // backgroundColor: 'green',
    marginLeft: 30,
    marginBottom: 10
  },
  audioExtraBottomContent: {
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderTopWidth: 2,
    borderTopColor: '#757575'
  },
  progressBar: {
    width: Metrics.screenWidth - 60,
    height: 30,
    marginRight: 30,
    backgroundColor: 'grey'
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
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left'
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
