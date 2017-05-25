import React from 'react'
import { ScrollView, Image, View } from 'react-native'
import { Images } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends React.Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <RoundedButton onPress={NavigationActions.bearListScreen}>
              Bears
            </RoundedButton>
            <RoundedButton onPress={NavigationActions.recordScreen}>
              Record
            </RoundedButton>
            <RoundedButton onPress={NavigationActions.audioListScreen}>
              Recordings
            </RoundedButton>
          </View>

        </ScrollView>
      </View>
    )
  }
}
