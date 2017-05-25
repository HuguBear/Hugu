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
  addBear: {
    'height': Metrics.screenHeight * 0.07,
    flex: 1,
    'width': Metrics.screenHeight * 0.07,
    'alignItems': 'center',
    'justifyContent': 'center'
  },
  navigationsLine: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: Metrics.screenHeight * 0.07,
    paddingHorizontal: 10,
    backgroundColor: 'black'
  },

  addText: {
    'color': 'black',
    'fontWeight': 'bold',
    'fontSize': 20
  },

  listItem: {
    'alignItems': 'center',
    'justifyContent': 'center',
    'padding': 20,
    'backgroundColor': Colors.THREEHUNDRED,
    flexDirection: 'row',
    marginBottom: 2
    // borderBottomWidth: 1,
  },

  addBearButton: {
    height: Metrics.screenHeight * 0.1,
    width: Metrics.screenWidth - Metrics.screenHeight * 0.2 - 20,
    backgroundColor: '#81C784',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },

  nameBox: {
    flex: 1,
    alignSelf: 'center',
    paddingLeft: 20
  },

  name: {
    alignSelf: 'flex-start',
    fontSize: 20
  },

  bearLogo: {
    borderRadius: 40
  },

  formContainer: {
    flex: 1,
    paddingLeft: Metrics.screenHeight * 0.1,
    paddingRight: Metrics.screenHeight * 0.1,
    paddingTop: Metrics.screenHeight * 0.15,
    paddingBottom: Metrics.screenHeight * 0.15,
    backgroundColor: 'rgba(238,238,238, 0.7)'
  },

  formContent: {
    height: Metrics.screenHeight * 0.5,
    width: Metrics.screenWidth - Metrics.screenHeight * 0.2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 10,
    padding: 10
  },

  exitModal: {
    height: 30,
    width: 30,
    alignItems: 'center',
    right: Metrics.screenHeight * 0.075 + 6,
    top: Metrics.screenHeight * 0.15 - 15,
    position: 'absolute',
    backgroundColor: 'rgb(243, 243, 243)',
    borderRadius: 50
  },

  formHeader: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  },

  formHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  modalHeader: {
    height: Metrics.screenHeight * 0.07,
    width: Metrics.screenWidth - Metrics.screenHeight * 0.2 - 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10
  },

  wifiRow: {
    height: Metrics.screenHeight * 0.07,
    width: Metrics.screenWidth - Metrics.screenHeight * 0.2 - 20,
    backgroundColor: Colors.TWOHUNDRED,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 1
  },

  formFooter: {
    height: Metrics.screenHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    padding: 10
  },

  YELLOW: {
    backgroundColor: 'teal',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 300
  },

  nameInput: {
    width: 200
  }
})
