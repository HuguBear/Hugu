/* eslint-disable no-undef */
/* eslint-disable react/jsx-boolean-value */
import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, Animated } from 'react-native'

import styles from './Styles/AudioListItemStyle'
import IonIcon from 'react-native-vector-icons/Ionicons'
import ConvertDate from '../Transforms/ConvertDate'

export default class AudioListItem extends React.Component {

  componentWillMount () {
    this.animatedHeightValue = new Animated.Value(45)
  }

  componentDidMount () {
    audioListItem = this
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
        </TouchableOpacity>
        <View style={styles.audioExtra}>
          <View style={styles.audioExtraTopContent}>
            <TouchableOpacity
              style={styles.additionalButtons}
              onPress={(event) => this.props.playAudio(this.props.audio.filePath)}>
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
