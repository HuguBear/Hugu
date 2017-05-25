/* eslint-disable no-undef */
import React from 'react'
import { View, ListView, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'

import AlertMessage from '../Components/AlertMessage'
import AudioListItem from '../Components/AudioListItem.js'
import ChooseBearModal from '../Components/ChooseBearModal'
import RecordActions from '../Redux/RecordRedux'
import RNFS from 'react-native-fs'
import Utility from '../../android/app/src/main/java/com/huguapp/utility/utility.js'

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
    this.audioFilesPath = '/data/com.huguapp/files/data' // RNFS.DocumentDirectoryPath + '/audio';
    audioData = []
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({ rowHasChanged })
    utility = new Utility()
    audiolist = this
    this.state = {
      bearModalVisible: false,
      sent: 0,
      audioDataSource: ds.cloneWithRows(audioData),
      chosenAudioPath: ''
    }

    this._getAudioFromLocal()

    this.setModalVisible = this.setModalVisible.bind(this)
  }

  renderRow (rowData) {
    return (
      <AudioListItem
        audio={rowData}
        onChange={audiolist._getAudioFromLocal.bind(audiolist)}
        onClick={audiolist._onItemClick}
        onRenameClic={audiolist.onRenameClick}
        setModalVisible={audiolist.setModalVisible}
        isUploading={audiolist.props.isUploading}
        instanceUpdated={audiolist.props.instanceUpdated}
        setAudioPath={audiolist.setAudioPath}
      />
    )
  }

  componentWillReceiveProps (newProps) {
    if (newProps.currentState === 'finishedUploading') {
      ToastAndroid.show('Upload SUCCESSFUL', ToastAndroid.LONG)
    }
    if (newProps.currentState === 'finishedUploadingWithError') {
      ToastAndroid.show('Upload FAILED', ToastAndroid.LONG)
    }
    if (newProps.finishedRecording === true) {
      audiolist._getAudioFromLocal()
    }
  }

  noRowData () {
    return this.state.audioDataSource.getRowCount() === 0
  }

  setModalVisible (visible, path) {
    this.setState({bearModalVisible: visible})
    if (path) {
      this.setState({chosenAudioPath: path})
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <AlertMessage title='Nothing to See Here, Try recording and come back!' show={this.noRowData()} />
        <ListView
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
          setModalVisible={this.setModalVisible} />
      </View>
    )
  }

  _onItemClick (item) {
    if (focusedItem != null) {
      focusedItem.setState({myFlexDirection: 'row'})
    }
    focusedItem = item
    if (item.state.myFlexDirection === 'row') {
      item.setState({myFlexDirection: 'column'})
    } else {
      item.setState({myFlexDirection: 'row'})
    }
  }

  _getAudioFromLocal () {
    RNFS.exists(utility.RecordingsDirPath)
      .then(exists => {
        if (exists) { // Directory exists
          RNFS.readDir(utility.RecordingsDirPath).then(files => {
          // RNFS.readDir(this.audioFilesPath).then(files => {
            let data = files.slice()
            this.setState({
              audioDataSource: this.state.audioDataSource.cloneWithRows(data)
            })
          }).catch(err => console.log(err))
        } else { // If directory doesn't exist yet
        }
      }
    ).catch(err => console.log(err))
  }

}

const mapStateToProps = (state) => {
  return {
    isUploading: state.recording.isUploading,
    currentState: state.recording.currentState,
    instanceUpdated: state.recording.instanceUpdated,
    finishedRecording: state.recording.finishedRecording,
    bearList: state.bear.results
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadRequest: (filePath, bearKey) => dispatch(RecordActions.uploadRequest(filePath, bearKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioListScreen)
