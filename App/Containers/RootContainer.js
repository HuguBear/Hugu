import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import Swiper from 'react-native-swiper'
import IonIcon from 'react-native-vector-icons/Ionicons'

import AudioListScreen from './AudioListScreen'
import BearListScreen from './BearListScreen'
import RecordScreen from './RecordScreen'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <Swiper style={styles.wrapper}
          index={1}
          loop={false}
          dot={<View style={styles.inactiveDot} />}
          activeDot={<View style={styles.activeDot} />}
          buttonWrapperStyle={styles.buttonWrapper}
          nextButton={<Text style={styles.nextButton}><IonIcon name='ios-arrow-forward' color='white' size={45} /></Text>}
          prevButton={<Text style={styles.prevButton}><IonIcon name='ios-arrow-back' color='white' size={45} /></Text>}
          showsButtons>
          <BearListScreen />
          <RecordScreen />
          <AudioListScreen />
        </Swiper>
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
