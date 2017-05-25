import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/BottomContentStyle'

import { connect } from 'react-redux'
import RecordingActions from '../../Redux/RecordRedux'
import Utility from '../../../android/app/src/main/java/com/huguapp/utility/utility.js'
import IonIcon from 'react-native-vector-icons/Ionicons'
import AlertMessage from '../../Components/AlertMessage'

let utility = new Utility()
class BottomContent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      renameTo: '' // text value (string)
    }
  }

  onSendClick () {
    console.log(this.props)
    this.props.uploadRequest(this.props.filePath, this.props.uploadUrl)
  }

  onRenameClick () {
    this.props.startRenaming(this.state.renameTo)
  }

  renameRecording () {
    let lastslashindex = this.props.filePath.lastIndexOf('/')
    let filename = this.props.filePath.substring(lastslashindex + 1)
    utility.renameRecording(filename, this.state.renameTo, (success) => {
      console.log(this)
    },
    (error) => {
      console.log(error)
    })
  }

  render () {
    // Just timer
    let initialContent = (<View>
      <Text style={styles.timer}>
        {this.props.timer}
      </Text>
    </View>)

      // <TouchableOpacity style={styles.renameButton} onPressIn={ () => {this.onRenameClick();}}>
      // <Icon name='pencil' size={20} color='grey'> Name it! </Icon>
      // </TouchableOpacity>
    // Menu consisting of Send and Rename buttons
    let menuContent = (
      <View>
        <TouchableOpacity onPressIn={() => { this.onSendClick() }}>
          <View style={[styles.sendButton, {opacity: 0.9}]}>
            <IonIcon name='md-send' size={20} color='grey'> Send </IonIcon>
          </View>
        </TouchableOpacity>
      </View>
    )

    // let renameContent = (
    //   <View>
    //     <View style={{flexDirection: 'row'}}>
    //       <TextInput
    //         style={{flex: 1, height: 50, alignSelf: 'stretch', paddingLeft: 10, color: 'white', alignItems: 'center', justifyContent: 'center'}}
    //         underlineColorAndroid='#fff'
    //         placeholder='Enter the name'
    //         maxLength={40}
    //         onChangeText={(text) => { this.setState({renameTo: text}) }}
    //         value={this.state.text}
    //       />
    //       <TouchableOpacity onPressIn={() => { this.renameRecording() }} style={{alignItems: 'center', alignSelf: 'flex-end', marginLeft: 5}}>
    //         <IonIcon name='md-checkmark-circle' size={40} backgroundColor='green' color='green' />
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // )

    let menuAfterSuccessfulUpload = (
      <View>
        <AlertMessage
          title='Recording has been sent'
          icon='md-checkmark-circle-outline'
        />
      </View>
    )

    let bottomContent = initialContent

    switch (this.props.currentState) {
      case 'start':
      case 'recording':
        bottomContent = initialContent
        break
      case 'finished': // right after recording has been finished
        bottomContent = menuContent
        break
      case 'finishedUploading':
        bottomContent = menuAfterSuccessfulUpload
        break
      case 'sending':
      case 'renaming':
      case 'uploading':
        break
    }

    // {
    //   (this.props.recordState == 'start' || this.props.recordState == 'recording') ? (initialContent) : null
    // }
    // {
    //   (this.props.recordState == 'finished') ? (menuContent) : null
    // }
    // {
    //   (this.props.recordState == 'renaming') ? (renameContent) : null
    // }
    //
    // {
    //   (this.props.recordState == 'finishedUploading') ? (menuAfterSuccessfulUpload) : null
    // }

    return (
      <View style={styles.container}>
        {bottomContent}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentState: state.recording.currentState,
    filePath: state.recording.filePath,
    uploadUrl: state.recording.url
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    startRenaming: (name) => dispatch(RecordingActions.startRenaming(name)),
    successRename: (msg) => dispatch(RecordingActions.successRename(msg)),
    failureRename: (error) => dispatch(RecordingActions.failureRename(error)),
    uploadRequest: (filePath, uploadUrl) => dispatch(RecordingActions.uploadRequest(filePath, uploadUrl))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent)
