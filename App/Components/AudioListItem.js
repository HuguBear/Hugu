/* eslint-disable no-undef */
/* eslint-disable react/jsx-boolean-value */
import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, Animated } from 'react-native'
import I18n from 'react-native-i18n'

import styles from './Styles/AudioListItemStyle'
import IonIcon from 'react-native-vector-icons/Ionicons'
import ConvertDate from '../Transforms/ConvertDate'
import * as Progress from '../Progress'
import Sound from 'react-native-sound'

export default class AudioListItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      playing: false,
      duration: -1
    }
  }

  componentWillMount () {
    this.animatedHeightValue = new Animated.Value(45)
  }

  onAnotherItemPress () {
    Animated.timing(this.animatedHeightValue, {
      toValue: 45,
      duration: 300
    }).start()
  }

  onItemPress () {
    Animated.timing(this.animatedHeightValue, {
      toValue: 100,
      duration: 300
    }).start()
    this.props.onItemClick(this)
  }

  async playAudio (audioPath, audioItem) {
    if (this.state.playing) {
      return
    }

    const sound = new Sound(audioPath, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error)
        return
      }
      // loaded successfully
      console.log('duration in seconds: ' + sound.getDuration() + ' number of channels: ' + sound.getNumberOfChannels())
      let duration = sound.getDuration() * 1000
      this.setState({
        duration: duration,
        playing: true
      })
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing')
          this.setState({
            playing: false,
            duration: -1
          })
        } else {
          console.warn('playback failed due to audio decoding errorssss')
          this.setState({
            playing: false,
            duration: -1
          })
        }
      })
    })
  }

  getStatusIcon(audio) {
    // console.log("GET STATUS ICON");
    // console.log(audio);
    if (!audio.sent) {
      return (<View style={styles.audioStatus}>
        <IonIcon name='md-alert' color='#d35400' size={25} />
        <Text style={[styles.audioStatusText, {color: '#d35400'}]}>
          {I18n.t('notSent')}
        </Text>
      </View>);
    }
    else if (audio.listened) {
      // console.log("LISTENED");
      return (<View style={styles.audioStatus}>
        <IonIcon name='md-headset' color='green' size={25} />
        <Text style={[styles.audioStatusText, {color: 'green'}]}>
          {I18n.t('listened')}
        </Text>
      </View>);
    }
    else if (audio.received) {
      // console.log("RECEIVED");
      return (<View style={styles.audioStatus}>
        <IonIcon name='md-paw' color='green' size={25} />
        <Text style={[styles.audioStatusText, {color: 'green'}]}>
          {I18n.t('received')}
        </Text>
      </View>);
    }
    else if (audio.sent) {
      // console.log("SENT");
      return (<View style={styles.audioStatus}>
        <IonIcon name='md-return-right' color='green' size={25} />
        <Text style={[styles.audioStatusText, {color: 'green'}]}>
          {I18n.t('sent')}
        </Text>
      </View>);
    }
  }

  render () {
    const animatedHeightStyle = { height: this.animatedHeightValue }

    let statusIcon = this.getStatusIcon(this.props.audio);
    // console.log(statusIcon);
    // let statusIcon = (this.props.audio.sent)
    // ? (<View style={styles.audioStatus}>
    //   <IonIcon name='md-paw' color='green' size={25} />
    //   <Text style={[styles.audioStatusText, {color: 'green'}]}>
    //     {I18n.t('sent')}
    //   </Text>
    // </View>)
    // : (<View style={styles.audioStatus}>
    //   <IonIcon name='md-alert' color='#d35400' size={25} />
    //   <Text style={[styles.audioStatusText, {color: '#d35400'}]}>
    //     {I18n.t('notSent')}
    //   </Text>
    // </View>)

    let sendContent = (this.props.audio.isUploading)
    ? <ActivityIndicator animating={true} style={styles.additionalButtons} color={'rgba(255,255,255, 0.75)'} size='large' />
    : (<TouchableOpacity
      disabled={this.props.audio.sent}
      style={styles.additionalButtons}
      onPress={() => {
        this.props.setBearModalVisible(true, this.props.audio.filePath)
      }}>
      <IonIcon name='md-send' style={{marginLeft: 3}} color={'white'} size={35} />
    </TouchableOpacity>)

    return (
      <Animated.View style={[styles.row, animatedHeightStyle]}>
        <TouchableOpacity
          onPress={(event) => this.onItemPress()}
          onLongPress={(event) => this.props.setAudioModalVisible(true, 'setting up', this.props.audio)}
          style={styles.audioRow}>
          <View style={styles.audioHeading}>
            {statusIcon}
            <Text style={styles.audioName}>
              {ConvertDate(this.props.audio.fileName)}
            </Text>
          </View>
          <Progress.Bar
            duration={this.state.duration}
          />
        </TouchableOpacity>
        <View style={styles.audioExtra}>
          <View style={styles.audioExtraTopContent}>
            <TouchableOpacity
              disabled={this.state.playing}
              style={styles.additionalButtons}
              onPress={(event) => this.playAudio(this.props.audio.filePath, this)}>
              <IonIcon name='md-play' color={'white'} size={35} />
            </TouchableOpacity>
            {sendContent}
            <TouchableOpacity
              style={styles.additionalButtons}
              onPressIn={(event) => this.props.deleteAudio(this.props.audio.filePath)}>
              <IonIcon name='md-trash' color={'white'} size={35} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    )
  }
}
