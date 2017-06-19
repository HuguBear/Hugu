import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    // marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.cloud,
    paddingTop: 25,
    paddingBottom: 65
  },
  helperText: {
    textAlign: 'center'
  },
  listContent: {
    marginVertical: Metrics.baseMargin
  },
  modalParent: {
    backgroundColor: Colors.ricePaper,
    height: Metrics.screenHeight
  },
  modalView: {
    marginTop: 10,
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
  },
  sectionHeader: {
    textAlign: 'center',
    fontSize: 28,
    padding: 15,
    fontWeight: 'bold'
  },
  bearRow: {
    height: 70
  },
  bearName: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    height: 40
  },
  bearNameButton: {
    width: Metrics.screenWidth / 1.70,
    paddingTop: 2,
    borderBottomLeftRadius: 9,
    borderTopLeftRadius: 9
  },
  connected: {backgroundColor: Colors.seaweed},
  notConnected: {backgroundColor: Colors.ember},
  bearNameText: {
    textAlign: 'center',
    fontSize: 20
  },
  bearKey: {
    position: 'absolute',
    top: 38,
    left: 83,
    borderColor: 'black',
    borderWidth: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 0,
    width: Metrics.screenWidth / 2.3,
    backgroundColor: Colors.windowTint
  },
  bearKeyText: {
    fontSize: 10,
    textAlign: 'center'
  },
  bearDetails: {
    width: Metrics.screenWidth / 1.55
  },
  trashButton: {
    padding: 7,
    alignSelf: 'flex-end',
    borderLeftWidth: 2
  }
})
