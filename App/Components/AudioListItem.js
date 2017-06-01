/* eslint-disable no-undef */
/* eslint-disable react/jsx-boolean-value */
import React from 'react'
import { View, Text, TouchableOpacity, ProgressBarAndroid, Modal, TextInput } from 'react-native'

import styles from './Styles/AudioListItemStyle'
import Sound from 'react-native-sound'
import IonIcon from 'react-native-vector-icons/Ionicons'
import ConvertDate from '../Transforms/ConvertDate'
import RoundedButton from '../Components/RoundedButton'

export default class AudioListItem extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      myFlexDirection: 'row',
      modalVisible: false,
      modalAudioName: this.props.audio.fileName
    }
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

  setModalVisible (visible, audio) {
    this.setState({modalVisible: visible})
    if (audio) {
      this.props.renameAudio({filePath: this.props.audio.filePath, newName: this.state.modalAudioName})
    } else {
      this.setState({modalAudioName: this.props.audio.fileName})
    }
  }

  _showProgressBar () {
    if (this.props.audio.isUploading) {
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
    let statusIcon = (this.props.audio.sent)
    ? (<Text style={[styles.audioStatus, {color: 'green'}]}>
      <IonIcon name='md-paw' color='green' size={30} style={{marginRight: 10}} />
      Sent
    </Text>)
    : (<Text style={[styles.audioStatus, {color: '#d35400'}]}>
      <IonIcon name='md-alert' color='#d35400' size={30} style={{marginRight: 10}} />
      NotSent
    </Text>)

    let sendContent = (this.props.audio.isUploading)
    ? null
    : (<TouchableOpacity
      style={styles.additionalButtons}
      onPress={() => {
        this.props.setModalVisible(true, this.props.audio.filePath)
      }}>
      <IonIcon name='md-send' style={{marginLeft: 3}} color={'white'} size={30} />
    </TouchableOpacity>)

    return (
      <View>
        <TouchableOpacity
          onPress={(event) => this.props.onClick(this)}
          onLongPress={(event) => this.setModalVisible(!this.state.modalVisible)}
          style={[styles.audioRow, {flexDirection: this.state.myFlexDirection}]}>
          <View style={styles.audioHeading}>
            {statusIcon}
            <Text style={styles.audioName}>
              {ConvertDate(this.props.audio.fileName)}
            </Text>
          </View>
        </TouchableOpacity>

        { this.state.myFlexDirection === 'column'
          ? <View animation='slideInDown' duration='900' style={[styles.audioExtra]}>
            <View style={styles.audioExtraTopContent}>
              <TouchableOpacity
                style={styles.additionalButtons}
                onPress={(event) => this.playAudio(this.props.audio.filePath)}>
                <IonIcon name='md-play' color={'white'} size={30} />
              </TouchableOpacity>
              {sendContent}
              <TouchableOpacity
                style={styles.additionalButtons}
                onPressIn={(event) => this.props.deleteAudio(this.props.audio.filePath)}>
                <IonIcon name='md-trash' color={'white'} size={30} />
              </TouchableOpacity>
            </View>
            {this._showProgressBar()}
          </View>
          : null
        }
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
      </View>
    )
  }
}
