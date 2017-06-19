/* eslint-disable no-undef */
/* eslint-disable react/jsx-boolean-value */
import React from 'react'
import { View, ListView, ToastAndroid, Text, Modal, TextInput } from 'react-native'
import { connect } from 'react-redux'

import AlertMessage from '../Components/AlertMessage'
import AudioListItem from '../Components/AudioListItem.js'
import ChooseBearModal from '../Components/ChooseBearModal'
import RecordActions from '../Redux/RecordRedux'
import Sound from 'react-native-sound'
import RoundedButton from '../Components/RoundedButton'

// import RNFS from 'react-native-fs'

import styles from './Styles/AudioListStyle'

let audiolist
focusedItem = null
class AudioListScreen extends React.Component {

  state: {
    dataSource: Object
  }

  constructor (props) {
    super(props)
    // Path to recordings folder
    // this.audioFilesPath = RNFS.DocumentDirectoryPath + '/audio'
    audioData = []
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({ rowHasChanged })
    audiolist = this
    this.state = {
      bearModalVisible: false,
      audioModalVisible: false,
      audioDataSource: ds.cloneWithRows(audioData),
      chosenAudioPath: '',
      modalAudioName: '',
      audio: null,
      startup: true
    }

    this.setBearModalVisible = this.setBearModalVisible.bind(this)
    this.setAudioModalVisible = this.setAudioModalVisible.bind(this)
  }

  renderRow (rowData) {
    return (
      <AudioListItem
        audio={rowData}
        onClick={audiolist._onItemClick}
        setAudioModalVisible={audiolist.setAudioModalVisible}
        setBearModalVisible={audiolist.setBearModalVisible}
        deleteAudio={audiolist.props.deleteAudio}
        playAudio={audiolist.playAudio}
      />
    )
  }
  componentWillMount () {
    audiolist._getAudioFromLocal(this.props.audioFiles)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.error === 'SUCCESSFUL' && !this.state.startup && newProps.error !== this.props.error) {
      ToastAndroid.show('Upload SUCCESSFUL', ToastAndroid.LONG)
    }
    if (newProps.error === 'UNSUCCESSFUL' && !this.state.startup && newProps.error !== this.props.error) {
      ToastAndroid.show('Upload FAILED', ToastAndroid.LONG)
    }
    if (newProps.audioFiles !== this.props.audioFiles) {
      audiolist._getAudioFromLocal(newProps.audioFiles)
    }
    if (this.state.startup) {
      this.setState({startup: false})
    }
  }

  noRowData () {
    return this.state.audioDataSource.getRowCount() === 0
  }

  renderHeader () {
    if (!this.noRowData()) {
      return <Text style={styles.title}>Audio Recordings</Text>
    } else {
      return <AlertMessage title='Nothing to See Here, Try recording and come back!' />
    }
  }

  setBearModalVisible (visible, path) {
    this.setState({bearModalVisible: visible})
    if (path) {
      this.setState({chosenAudioPath: path})
    }
  }

  setAudioModalVisible (visible, action, audio) {
    if (action === 'renaming') {
      this.props.renameAudio({filePath: audio.audioPath, newName: audio.audioName})
    } else if (action === 'setting up') {
      this.setState({
        audio: audio,
        modalAudioName: audio.fileName
      })
    } else {
      this.setState({modalAudioName: ''})
    }
    this.setState({audioModalVisible: visible})
  }

  async playAudio (audioPath) {
    const sound = new Sound(audioPath, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error)
        return
      }
      // loaded successfully
      console.log('duration in seconds: ' + sound.getDuration() + ' number of channels: ' + sound.getNumberOfChannels())
      // this.setState({
      //   playing: true,
      //   duration: sound.getDuration() * 1000 + 150
      // })
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing')
          // this.setState({
          //   playing: false,
          //   duration: -1
          // })
        } else {
          console.log('playback failed due to audio decoding errorssss')
          // this.setState({
          //   playing: false,
          //   duration: -1
          // })
        }
      })
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ListView
          style={{marginBottom: 40, paddingBottom: 20}}
          keyboardShouldPersistTaps='always'
          contentContainerStyle={styles.listContent}
          dataSource={this.state.audioDataSource}
          renderRow={this.renderRow}
          enableEmptySections
          pageSize={15} />
        <ChooseBearModal
          modalVisible={this.state.bearModalVisible}
          bearList={this.props.bearList}
          uploadRequest={this.props.uploadRequest}
          chosenAudioPath={this.state.chosenAudioPath}
          setBearModalVisible={this.setBearModalVisible} />
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.audioModalVisible}
          onRequestClose={() => { this.setAudioModalVisible(!this.state.audioModalVisible) }} >
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
                disabled={this.state.modalAudioName.length === 0 || this.state.modalAudioName === this.state.audio.fileName}
                onPress={() => { this.setAudioModalVisible(!this.state.audioModalVisible, 'renaming', {audioName: this.state.modalAudioName, audioPath: this.state.audio.filePath}) }}>
                Rename recording
              </RoundedButton>
              <RoundedButton onPress={() => { this.setAudioModalVisible(!this.state.audioModalVisible) }}>
                Cancel
              </RoundedButton>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  _onItemClick (item) {
    if (focusedItem != null) {
      focusedItem.onAnotherItemPress()
      focusedItem.setState({
        openStyle: {
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30
        }
      })
    }
    if (focusedItem === item) {
      focusedItem = null
    } else {
      focusedItem = item
      focusedItem.setState({
        openStyle: {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }
      })
    }
  }

  _getAudioFromLocal (data) {
    this.setState({
      audioDataSource: this.state.audioDataSource.cloneWithRows(data)
    })
    // DO NOT DELETE THIS
    // DO NOT DELETE THIS
    // DO NOT DELETE THIS
    // DO NOT DELETE THIS
    //   RNFS.exists(RNFS.DocumentDirectoryPath + '/audio')
    //     .then(exists => {
    //       if (exists) {
    //         RNFS.readDir(RNFS.DocumentDirectoryPath + '/audio').then(files => {
    //           let data = files.slice()
    //           // AS NOW MOST OF FUNCTIONALITY GOES THRU THE REDUX, BUT WE STILL
    //           // NEED TO CHECK IF FILES FROM RNFS ARE THE SAME AS IN REDUX
    //           // // for (i = 0; i < data.length; i++) {
    //           // //     if (data[i].path !== this.props.audioFiles[i].audio.filePath) {
    //           // //       console.log('omg');
    //           // //     }
    //           // // }
    //           // console.log(data[0].path);
    //           // console.log(this.props.audioFiles[0].audio.filePath);
    //           this.setState({
    //             audioDataSource: this.state.audioDataSource.cloneWithRows(data)
    //           })
    //         }).catch(err => console.log(err))
    //       } else { // If directory doesn't exist yet
    //         RNFS.mkdir(RNFS.DocumentDirectoryPath + '/audio')
    //       }
    //     }
    //   ).catch(err => console.log(err))
  }
}

const mapStateToProps = (state) => {
  return {
    bearList: state.bear.results,
    audioFiles: state.recording.audioFiles,
    finishedRecording: state.recording.finishedRecording,
    error: state.recording.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadRequest: (filePath, bearKey) => dispatch(RecordActions.uploadRequest(filePath, bearKey)),
    deleteAudio: (filePath) => dispatch(RecordActions.deleteAudio(filePath)),
    renameAudio: (bundle) => dispatch(RecordActions.renameAudio(bundle))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioListScreen)
