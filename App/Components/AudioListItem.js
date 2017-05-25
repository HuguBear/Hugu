/* eslint-disable no-undef */
import React, { PropTypes } from 'react'
import { View, Text, TouchableOpacity, ProgressBarAndroid, ToastAndroid, AsyncStorage } from 'react-native'

import styles from './Styles/AudioListItemStyle'
import VoicePlayer from '../../android/app/src/main/java/com/huguapp/voiceplayer/voiceplayer.js'
import RNFS from 'react-native-fs'
import IonIcon from 'react-native-vector-icons/Ionicons'
let voicePlayer = new VoicePlayer()

export default class AudioListItem extends React.Component {
  static propTypes = {
    isUploading: PropTypes.bool,
    currentState: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.audioFilesPath = RNFS.DocumentDirectoryPath + '/audio'
    this.state = {
      myFlexDirection: 'row',
      showProgressBar: false,
      name: props.audio.name
    }
    AsyncStorage.getItem(props.audio.name.split('.')[0], (err, result) => {
      if (err) {
        console.log(err.stack)
      }
      let info = JSON.parse(result)
      if (result !== null) {
        this.setState({
          sent: info.sent,
          listened: info.listened
        })
      }
    })
  }

  componentDidMount () {
    audioListItem = this
  }

  componentWillReceiveProps (newProps) {
    if (newProps.instanceUpdated === this.state.name) {
      this.setState({
        sent: true
      })
    }
  }

  _nameToDate (name) {
    // MMddhhmm
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December']
    return months[(name[2] + name[3] - 1)] + ' ' + (name[4] + name[5]) + ', ' + (name[6] + name[7]) + ':' + (name[8] + name[9]) + ', ' + name.substring(0, 2)
  }

  _onListItemClick () {
    this.props.onClick(this)
  }

  _onPlayClick (audio) {
    voicePlayer.play(audio.path)
  }

  _onDeleteClick (audio) {
    return RNFS.unlink(audio.path)
      // spread is a method offered by bluebird to allow for more than a
      // single return value of a promise. If you use `then`, you will receive
      // the values inside of an array
      .then(() => {
        console.log('FILE DELETED')
        /* onChange method binded from AudioListContainer where I make
        * <AudioListItem> */
        ToastAndroid.show('Recording deleted', ToastAndroid.SHORT)
        this.props.onChange()
        /* Calling it here because react uses old components for new list */
        // this._onListItemClick()
        AsyncStorage.removeItem(audioListItem.state.name, (result) => {
        // console.log(result)
        })
        AsyncStorage.getAllKeys((result) => {
        // console.log(result)
        })
      })
          // `unlink` will throw an error, if the item to unlink does not exist
      .catch((err) => {
        console.log(err.message)
      })
  }

  _showProgressBar () {
    if (this.props.isUploading) {
      return (
        <View style={styles.audioExtraBottomContent}>
          <Text style={styles.uploadStatusText}> Sending... </Text>
          <ProgressBarAndroid styleAttr='Horizontal' color='white' style={styles.progressBar} />
        </View>
      )
    }
    return null
  }

  render () {
    let statusIcon = (this.state.sent)
    ? (<Text style={[styles.audioStatus, {color: 'green'}]}>
      <IonIcon name='md-paw' color='green' size={30} style={{marginRight: 10}} />
      Sent
    </Text>)
    : (<Text style={[styles.audioStatus, {color: '#d35400'}]}>
      <IonIcon name='md-alert' color='#d35400' size={30} style={{marginRight: 10}} />
      NotSent
    </Text>)

    let sendContent = (this.props.isUploading)
    ? null
    : (<TouchableOpacity
      style={styles.additionalButtons}
      onPress={() => {
        this.props.setModalVisible(true, this.props.audio.path)
      }}>
      <IonIcon name='md-send' style={{marginLeft: 3}} color={'white'} size={30} />
    </TouchableOpacity>)

    return (
      <View>
        <TouchableOpacity
          onPress={(event) => this._onListItemClick()}
          onLongPress={(event) => this.onRenameClick(this.props.audio)}
          style={[styles.audioRow, {flexDirection: this.state.myFlexDirection}]}>
          <View style={styles.audioHeading}>
            {statusIcon}
            <Text style={styles.audioName}>
              {this._nameToDate(this.props.audio.name)}
            </Text>
          </View>
        </TouchableOpacity>

        { this.state.myFlexDirection === 'column'
          ? <View animation='slideInDown' duration='900' style={[styles.audioExtra]}>
            <View style={styles.audioExtraTopContent}>
              <TouchableOpacity
                style={styles.additionalButtons}
                onPress={(event) => this._onPlayClick(this.props.audio)}>
                <IonIcon name='md-play' color={'white'} size={30} />
              </TouchableOpacity>
              {sendContent}
              <TouchableOpacity
                style={styles.additionalButtons}
                onPressIn={(event) => this._onDeleteClick(this.props.audio)}>
                <IonIcon name='md-trash' color={'white'} size={30} />
              </TouchableOpacity>
            </View>
            {this._showProgressBar()}
          </View>
          : null
        }
      </View>
    )
  }
}
