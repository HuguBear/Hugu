/* eslint-disable no-undef */
import React from 'react'
import { View, TouchableOpacity, Animated } from 'react-native'
import styles from './Styles/RecordButtonStyle'
import * as Animatable from 'react-native-animatable'
import RecordingActions from '../../Redux/RecordRedux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

class RecordButton extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      outterRadius: new Animated.Value(170)
    }

    // Timer timeout
    timer = null
  }

  recordingStarted () {
    this.props.startRecording()
    this._startTimer()
    // this._startAnimation()
  }
  recordingStopped () {
    this.props.endRecording()
    this._stopTimer()
    // this._stopAnimation()
  }

  _record = () => {
    if (this.props.isRecording) {
      this.recordingStopped()
    } else {
      // this.props.startRecordings()
      this.recordingStarted()
    }
  }

  render () {
    return (
      <Animatable.View style={styles.recordContainer}>
        <View style={[styles.outterRecordCircle]}>
          <TouchableOpacity onPress={() => {
            this._record()
            this.props.record()
          }}>
            <View style={styles.innerRecordCircle}>
              <Icon name='microphone' size={50} color='#fff' />
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    )
  }

// Logic behind timer
  _startTimer () {
    timer = setTimeout(() => {
      this.props.updateTimer() // calls updateTimer on recordScreen.js (parent container)
      this._startTimer()
    }, 1000)
  }

  _stopTimer () {
    clearTimeout(timer)
    this.props.resetTimer() // resets parent container state 'timer'
  }

}

const mapStateToProps = (state) => {
  return {
    finishedRecording: state.recording.finishedRecording,
    isRecording: state.recording.isRecording
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    startRecording: () => {
      dispatch(RecordingActions.startRecording())
      // dispatch(RecordingActions.changeState('recording'))
    },
    endRecording: () => {
      dispatch(RecordingActions.endRecording())
      // dispatch(RecordingActions.changeState('finished'))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RecordButton)
