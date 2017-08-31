/* eslint-disable no-undef */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable eqeqeq */
import React from 'react'
import { View, ListView, ToastAndroid, Text, Modal, TextInput, AppState } from 'react-native'
import { connect } from 'react-redux'

import AlertMessage from '../Components/AlertMessage'
import AudioListItem from '../Components/AudioListItem.js'
import ChooseBearModal from '../Components/ChooseBearModal'
import RecordActions from '../Redux/RecordRedux'
import Sound from 'react-native-sound'
import RoundedButton from '../Components/RoundedButton'
import I18n from 'react-native-i18n'
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
      startup: true,
      playing: false,
      scrollBack: null,
      appState: AppState.currentState
    }
    this.setBearModalVisible = this.setBearModalVisible.bind(this)
    this.setAudioModalVisible = this.setAudioModalVisible.bind(this)
    this.audioStatusTimeout
    this.audioStatusRefreshInterval = 30 * 1000
    // Refreshes audiolist items status, each n seconds
  }

  renderRow (rowData, sectionID, rowID) {
    // console.log(rowData);
    return (
      <AudioListItem
        audio={rowData}
        onItemClick={audiolist._onItemClick}
        setAudioModalVisible={audiolist.setAudioModalVisible}
        setBearModalVisible={audiolist.setBearModalVisible}
        deleteAudio={audiolist.props.deleteAudio}
        playAudio={audiolist.playAudio}
        rowKey={rowID}

      />
    )
  }
  componentWillMount () {
    audiolist._getAudioFromLocal(this.props.audioFiles)
  }

  componentDidMount () {
    AppState.addEventListener('change', this._handleAppStateChange)
    this.audioStatusTimeout = setTimeout(this.refreshAudioItemsStatus, this.audioStatusRefreshInterval, this)
  }

  refreshAudioItemsStatus (container) {
    // console.log("--------------------------------!!!!!!!!!!!!!!!!!!-------------------------");
    // console.log("refreshAudioItemsStatus()");
    // console.log(container.props.audioFiles);
    container.props.audioStatusRefreshRequest(container.props.audioFiles)
    container.audioStatusTimeout = setTimeout(container.refreshAudioItemsStatus, container.audioStatusRefreshInterval, container)
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    //  console.log(this.props.audioFiles);
    //  this.props.audioStatusRefreshRequest(this.props.audioFiles);
    //  this.audioStatusTimeout = setTimeout(this.props.audioStatusRefreshRequest, this.audioStatusRefreshInterval, this.props.audioFiles)
      return
    }

   // FN that refreshes status
    this.setState({appState: nextAppState})
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
      return <Text style={styles.title}>{I18n.t('audioRecordings')}</Text>
    } else {
      return <AlertMessage title={I18n.t('noRecordings')} />
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

  async playAudio (audioPath, audioItem) {
    if (audiolist.state.playing) {
      return
    }

    const sound = new Sound(audioPath, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error)
        return
      }
      // loaded successfully
      console.log('duration in seconds: ' + sound.getDuration() + ' number of channels: ' + sound.getNumberOfChannels())
      let duration = sound.getDuration()
      console.log(duration)
      audiolist.setState({
        duration: duration,
        playing: true
      })
      console.log(audiolist.state.duration)
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing')
          audiolist.setState({
            playing: false,
            duration: -1
          })
        } else {
          console.log('playback failed due to audio decoding errorssss')
          audiolist.setState({
            playing: false,
            duration: -1
          })
        }
      })
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ListView
          ref='scrollView'
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
    // console.warn(audiolist.refs.scrollView.scrollProperties.offset);
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
      if (audiolist.state.scrollBack) {
        audiolist.refs.scrollView.scrollTo({x: 0, y: audiolist.state.scrollBack, animated: true})
        audiolist.setState({scrollBack: null})
      }
    } else {
      focusedItem = item
      focusedItem.setState({
        openStyle: {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }
      })
      /* Scrolling littlebit down if it is last item and extraButtons are hidden
       from screen.
       1. IF    the listItem clicked is the last one in visible screen.
       2. THEN  scroll 55 more pixels so that extraButtons are shown.
       audiolist.refs.scrollView.scrollProperties.visibleLength + audiolist.refs.scrollView.scrollProperties.offset < focusedItem.props.rowKey * 55 + 52
       if (focusedItem.props.rowKey == Math.round((audiolist.refs.scrollView.scrollProperties.visibleLength - 70 + audiolist.refs.scrollView.scrollProperties.offset) / 55)) {
         audiolist.refs.scrollView.scrollTo({x: 0, y: (focusedItem.props.rowKey - Math.round(audiolist.refs.scrollView.scrollProperties.visibleLength / 55 - 2)) * 55, animated: true})
       }
      */
      if (audiolist.refs.scrollView.scrollProperties.visibleLength + audiolist.refs.scrollView.scrollProperties.offset < focusedItem.props.rowKey * 55 + 115) {
        audiolist.setState({scrollBack: audiolist.refs.scrollView.scrollProperties.offset})
        audiolist.refs.scrollView.scrollTo({x: 0, y: audiolist.refs.scrollView.scrollProperties.offset + Math.abs((audiolist.refs.scrollView.scrollProperties.visibleLength + audiolist.refs.scrollView.scrollProperties.offset) - (focusedItem.props.rowKey * 55 + 115)), animated: true})
      }
    }
  }

  _getAudioFromLocal (data) {
    if (data) {
      this.setState({ audioDataSource: this.state.audioDataSource.cloneWithRows(data) })
    }
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
    renameAudio: (bundle) => dispatch(RecordActions.renameAudio(bundle)),
    audioStatusRefreshRequest: (audiolistItems) => dispatch(RecordActions.refreshAudioRequest(audiolistItems))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioListScreen)
