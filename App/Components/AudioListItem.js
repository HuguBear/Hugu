/* eslint-disable no-undef */
/* eslint-disable react/jsx-boolean-value */
import React from 'react'
import { View, Text, TouchableOpacity, Modal, TextInput, ActivityIndicator, Animated } from 'react-native'

import styles from './Styles/AudioListItemStyle'
import Sound from 'react-native-sound'
import IonIcon from 'react-native-vector-icons/Ionicons'
import ConvertDate from '../Transforms/ConvertDate'
import RoundedButton from '../Components/RoundedButton'

export default class AudioListItem extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      modalVisible: false,
      modalAudioName: this.props.audio.fileName
    }
  }

  componentWillMount () {
    this.animatedHeightValue = new Animated.Value(45)
  }

  componentDidMount () {
    audioListItem = this
  }

  async playAudio (audioPath) {
    setTimeout(() => {
      var sound = new Sound(audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error)
        }
      })

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing')
          } else {
            console.log('playback failed due to audio decoding errors')
          }
        })
      }, 100)
    }, 100)
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
    this.props.onClick(this)
  }

  setModalVisible (visible, audio) {
    this.setState({modalVisible: visible})
    if (audio) {
      this.props.renameAudio({filePath: this.props.audio.filePath, newName: this.state.modalAudioName})
    } else {
      this.setState({modalAudioName: this.props.audio.fileName})
    }
  }

  render () {
    const animatedHeightStyle = { height: this.animatedHeightValue }

    let statusIcon = (this.props.audio.sent)
    ? (<View style={styles.audioStatus}>
      <IonIcon name='md-paw' color='green' size={25} />
      <Text style={[styles.audioStatusText, {color: 'green'}]}>
        Sent
      </Text>
    </View>)
    : (<View style={styles.audioStatus}>
      <IonIcon name='md-alert' color='#d35400' size={25} />
      <Text style={[styles.audioStatusText, {color: '#d35400'}]}>
        Not Sent
      </Text>
    </View>)

    let sendContent = (this.props.audio.isUploading)
    ? <ActivityIndicator animating={true} style={styles.additionalButtons} color={'rgba(255,255,255, 0.75)'} size='large' />
    : (<TouchableOpacity
      disabled={this.props.audio.sent}
      style={styles.additionalButtons}
      onPress={() => {
        this.props.setModalVisible(true, this.props.audio.filePath)
      }}>
      <IonIcon name='md-send' style={{marginLeft: 3}} color={'white'} size={35} />
    </TouchableOpacity>)

    return (
      <Animated.View style={[styles.row, animatedHeightStyle]}>
        <TouchableOpacity
          onPress={(event) => this.onItemPress()}
          onLongPress={(event) => this.setModalVisible(!this.state.modalVisible)}
          style={styles.audioRow}>
          <View style={styles.audioHeading}>
            {statusIcon}
            <Text style={styles.audioName}>
              {ConvertDate(this.props.audio.fileName)}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.audioExtra}>
          <View style={styles.audioExtraTopContent}>
            <TouchableOpacity
              style={styles.additionalButtons}
              onPress={(event) => this.playAudio(this.props.audio.filePath)}>
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
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }} >
          <View style={styles.modalParent}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle} >Change the name of recording!</Text>
              <TextInput
                autoFocus
                style={styles.modalTextInput}
                value={this.state.modalAudioName}
                onChangeText={(modalAudioName) => this.setState({modalAudioName})}
                placeholder={'Recording name'}
              />
              <RoundedButton
                disabled={this.state.modalAudioName.length === 0 || this.state.modalAudioName === this.props.audio.fileName}
                onPress={() => { this.setModalVisible(!this.state.modalVisible, {audioName: this.state.modalAudioName, audioPath: this.props.audio.filePath}) }}>
                Rename recording
              </RoundedButton>
              <RoundedButton onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                Cancel
              </RoundedButton>
            </View>
          </View>
        </Modal>
      </Animated.View>
    )
  }
}
