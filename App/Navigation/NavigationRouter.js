import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import AudioListScreen from '../Containers/AudioListScreen'
import BearListScreen from '../Containers/BearListScreen'
import RecordScreen from '../Containers/RecordScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene initial key='presentationScreen' component={PresentationScreen} title='PresentationScreen' hideNavBar />
        <Scene key='recordScreen' component={RecordScreen} title='Audio recording' hideNavBar />
        <Scene key='audioListScreen' component={AudioListScreen} title='Recordings' hideNavBar />
        <Scene key='bearListScreen' direction={'vertical'} component={BearListScreen} title='Bears' hideNavBar />
      </Router>
    )
  }
}

export default NavigationRouter
