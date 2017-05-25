import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from '../../Themes/'

export default StyleSheet.create({
  applicationView: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 13,
    height: 13,
    borderRadius: 7,
    margin: 7,
    marginBottom: 14
  },
  inactiveDot: {
    backgroundColor: 'rgba(255,255,255,.8)',
    width: 13,
    height: 13,
    borderRadius: 7,
    margin: 7,
    marginBottom: 14
  },
  buttonWrapper: {
    // with this can change wrapper, wrapper is transparent component
    // where buttons are attached on
  },
  buttonLeft: {

  },
  buttonRight: {

  }
})
