// @flow

import React from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import RecordActions from '../Redux/RecordRedux'
// Styles
import styles from './Styles/PresentationScreenStyle'

class PresentationScreen extends React.Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.huguBackground} style={styles.backgroundImage} resizeMode='contain' />
        <ScrollView style={styles.container}>
          <View style={[styles.centered, styles.mainText]}>
            <Text style={styles.Heading1}>
              HUGU
            </Text>
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText} >
              HUGU app
            </Text>
          </View>

          <RoundedButton onPress={() => {
            this.props.resetState()
            return NavigationActions.recordScreen()
          }}>
            Audio Recording
          </RoundedButton>

          <RoundedButton onPress={NavigationActions.audioListScreen}>
            Recordings
          </RoundedButton>

          <RoundedButton onPress={NavigationActions.bearListScreen}>
            Bears
          </RoundedButton>

        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetState: () => dispatch(RecordActions.resetState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
