import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    height: 45,
    width: Metrics.screenWidth * 0.5,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.snow,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  disabledButton: {
    height: 45,
    width: Metrics.screenWidth * 0.5,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    justifyContent: 'center',
    backgroundColor: Colors.ember,
    alignSelf: 'center'
  },
  buttonText: {
    color: Colors.coal,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  },
  disabledButtonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  }
})
