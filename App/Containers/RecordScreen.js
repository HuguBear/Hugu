/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react'
import * as Progress from '../Progress'

import {
  Text,
  View,
  Platform,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import Sound from 'react-native-sound'
import {AudioRecorder, AudioUtils} from 'react-native-audio'
import Icon from 'react-native-vector-icons/FontAwesome'
import RNFS from 'react-native-fs'
import I18n from 'react-native-i18n'
import _ from 'lodash'

import { connect } from 'react-redux'
import RecordActions from '../Redux/RecordRedux'
import Images from '../Themes/Images'
import ChooseBearModal from '../Components/ChooseBearModal'
import styles from './Styles/RecordScreenStyle'

class RecordScreen extends Component {
  constructor (props) {
    super(props)
    let sound
    this.state = {
      currentTime: 0.0,
      recording: false,
      finished: false,
      playing: false,
      duration: -1,
      progress: 0,
      audioPath: AudioUtils.DocumentDirectoryPath + '/audio/' + new Date().toJSON().slice(2, 19).replace(/:/g, '').replace(/T/g, '').replace(/-/g, '') + '.aac',
      hasPermission: undefined,
      bearModalVisible: false
    }

    this.centerButton = _.throttle(this.centerButton.bind(this), 500, {leading: true, trailing: false})
  }

  prepareRecordingPath (audioPath) {
    this.setState({
      recording: true,
      audioPath: audioPath
    })
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000
    })
  }

  componentDidMount () {
    this._checkPermission().then((hasPermission) => {
      this.setState({ hasPermission })

      if (!hasPermission) return

      AudioRecorder.onProgress = (data) => {
        this.setState({currentTime: Math.floor(data.currentTime)})
      }

      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(data.status === 'OK', data.audioFileURL)
        }
      }
    })
  }

  componentWillReceiveProps (newProps) {
    if (newProps.lastRecordedFilePath === null) {
      this.setState({currentTime: 0})
    }
  }

  _checkPermission () {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true)
    }

    const rationale = {
      'title': 'Microphone Permission',
      'message': 'AudioExample needs access to your microphone so you can record audio.'
    }

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        console.log('Permission result:', result)
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED)
      })
  }

  renderSendingButton (sendingInfo) {
    const ALREADY_SENT = 2
    const SENDING = 1
    const IDLE = 0
    if (sendingInfo === ALREADY_SENT) {
      return (
        <TouchableOpacity style={styles.sentButton} onPress={() => { console.warn('Already sent') }}>
          <View>
            <Text style={styles.buttonText}>{I18n.t('sent')} <Icon name='paw' size={20} color='rgba(255,255,255, 0.75)' /></Text>
          </View>
        </TouchableOpacity>
      )
    } else if (sendingInfo === SENDING) {
      return (
        <TouchableOpacity style={styles.button}>
          <View>
            <Text style={styles.sendingText}>{I18n.t('sending')} </Text><ActivityIndicator animating={true} style={styles.sendingIndicator} color={'rgba(255,255,255, 0.75)'} size='large' />
          </View>
        </TouchableOpacity>
      )
    } else if (sendingInfo === IDLE) {
      return (
        <TouchableOpacity style={styles.button} onPress={() => { this.setBearModalVisible(!this.state.bearModalVisible) }}>
          <View>
            <Text style={styles.buttonText}>{I18n.t('send')} <Icon name='send' size={20} color='rgba(255,255,255, 0.75)' /></Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  async _stop () {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!')
      return
    }

    this.setState({recording: false, finished: true})

    try {
      const filePath = await AudioRecorder.stopRecording()
      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath)
      }
      return filePath
    } catch (error) {
      console.error(error)
      this.props.recordFailure(error)
    }
  }

  async _play () {
    if (this.state.recording) { await this._stop() }
    if (this.state.playing) {
      this.setState({ playing: false, duration: -1 })
      return sound.stop()
    }
    sound = new Sound(this.state.audioPath, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error)
        return
      }
      this.setState({ playing: true, duration: sound.getDuration() * 1000 })
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing')
          this.setState({
            playing: false,
            duration: -1
          })
        } else {
          console.log('playback failed due to audio decoding errors')
          sound.release()
          this.setState({
            playing: false,
            duration: -1
          })
          this._play()
        }
      })
    })
  }

  async _record () {
    if (this.state.recording) {
      await this._stop()
      return
    }

    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!')
      this._checkPermission()
      return
    }

    this.setState({
      recording: true
    })
    await RNFS.exists(RNFS.DocumentDirectoryPath + '/audio')
      .then(exists => {
        if (!exists) {
          RNFS.mkdir(RNFS.DocumentDirectoryPath + '/audio')
        }
      }
    ).catch(err => console.log(err))
    this.prepareRecordingPath(AudioUtils.DocumentDirectoryPath + '/audio/' + new Date().toJSON().slice(2, 19).replace(/:/g, '').replace(/T/g, '').replace(/-/g, '') + '.aac')

    try {
      this.props.recordStart()
      /* const filePath = */await AudioRecorder.startRecording()
    } catch (error) {
      console.error(error)
      this.props.recordFailure(error)
    }
  }

  delete () {
    this.props.deleteAudio(this.state.audioPath)
    this.refresh()
  }

  refresh () {
    if (this.state.playing) {
      this._play()
    }
    this.setState({
      recording: false,
      finished: false,
      playing: false,
      currentTime: 0
    })
  }

  _finishRecording (didSucceed, filePath) {
    this.setState({ finished: didSucceed })
    this.props.recordSuccess(this.state.audioPath)
    console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`)
  }

  setBearModalVisible (visible) {
    if (this.state.playing) {
      this._play()
    }
    this.setState({bearModalVisible: visible})
  }

  centerButton () {
    if (this.state.finished && this.props.lastRecordedFilePath !== null) {
      this._play()
    } else {
      this._record()
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.huguWriter} style={styles.container} resizeMode='stretch'>
          <View style={styles.controls}>
            <Text style={styles.progressText}>{this.state.currentTime}</Text>
            <Text style={styles.progressText}>CodePush</Text>
            <Progress.Circle
              progress={1}
              indeterminate={this.state.recording}
              duration={this.state.duration}
              recording={this.state.recording}
              recorded={this.state.finished && this.props.lastRecordedFilePath !== null}
              unfilledColor={'rgba(255, 255, 255, 0.60)'}
              onClick={this.centerButton}
              />
            {(this.state.finished && !this.state.recording && this.props.lastRecordedFilePath !== null) &&
              <View>
                <TouchableOpacity style={styles.button} onPress={() => { this.refresh() }}>
                  <View>
                    <Text style={styles.buttonText}>{I18n.t('new')} <Icon name='refresh' size={20} color='rgba(255,255,255, 0.75)' /></Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { this.delete() }}>
                  <View>
                    <Text style={styles.buttonText}>{I18n.t('delete')} <Icon name='trash' size={20} color='rgba(255,255,255, 0.75)' /></Text>
                  </View>
                </TouchableOpacity>
                {this.renderSendingButton(this.props.sendingFromRecordScreen)}
              </View>
            }
          </View>
        </Image>
        <ChooseBearModal
          modalVisible={this.state.bearModalVisible}
          bearList={this.props.bearList}
          uploadRequest={this.props.uploadRequest}
          chosenAudioPath={this.state.audioPath}
          setBearModalVisible={this.setBearModalVisible.bind(this)} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bearList: state.bear.results,
    lastRecordedFilePath: state.recording.lastRecordedFilePath,
    sendingFromRecordScreen: state.recording.sendingFromRecordScreen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    recordStart: () => dispatch(RecordActions.recordStart()),
    recordSuccess: (filePath) => dispatch(RecordActions.recordSuccess(filePath)),
    recordFailure: (error) => dispatch(RecordActions.recordFailure(error)),
    deleteAudio: (filePath) => dispatch(RecordActions.deleteAudio(filePath)),
    uploadRequest: (filePath, bearKey) => dispatch(RecordActions.uploadRequest(filePath, bearKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordScreen)
