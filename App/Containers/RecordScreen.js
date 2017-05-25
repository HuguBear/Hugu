/* eslint-disable no-undef */
import React from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'
import RecordActions from '../Redux/RecordRedux'
import RecordButton from '../Components/RecordScreenComponents/RecordButton'
import BottomContent from '../Components/RecordScreenComponents/BottomContent'
import Images from '../Themes/Images'
import styles from './Styles/RecordScreenStyle'
import VoiceRecorder from '../../android/app/src/main/java/com/huguapp/voicerecorder/voicerecorder.js'

let voicerecorder
let recordscreen

class RecordScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      timer: '00:00'
    }
    timerSeconds = 0
    recordscreen = this
    voicerecorder = new VoiceRecorder()
  }

  updateTimer () {
    timerSeconds++
    let seconds = timerSeconds % 60
    if (seconds < 10) { seconds = '0' + seconds }
    let minutes = Math.floor(timerSeconds / 60) % 60
    if (minutes < 10) { minutes = '0' + minutes }
    if (minutes < 0) {
      minutes = '00'
    }
    recordscreen.setState({
      timer: minutes + ':' + seconds
    })
    console.log(recordscreen.state.timer)
  }

  resetTimer () {
    recordscreen.setState({
      timer: '00:00'
    })
    timerSeconds = 0
    console.log(recordscreen.state.timer)
  }

  record () {
    if (this.isRecording) {
      voicerecorder.stopAudioRecording((result) => {
      })
    } else {
      voicerecorder.startAudioRecording((success) => {
        // success = path to recorded file
        recordscreen.props.recordSuccess(success) // dispatches
      }, (error) => {
        recordscreen.props.recordFailure(error)
      })
    }
  }

  render () {
    return (
      <View>
        <Image source={Images.huguWriter} style={styles.container} resizeMode='stretch'>
          <BottomContent
            timer={this.state.timer}
            recordState={this.props.recordState} />
          <RecordButton
            updateTimer={this.updateTimer}
            resetTimer={this.resetTimer}
            record={this.record} />
        </Image>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    recordState: state.recording.currentState,
    isRecording: state.recording.isRecording
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    recordSuccess: (filepath) => dispatch(RecordActions.recordSuccess(filepath)),
    recordFailure: (error) => dispatch(RecordActions.recordFailure(error))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordScreen)
