import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    // marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.cloud
  },
  listContent: {
    marginTop: Metrics.baseMargin
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
  }
})
