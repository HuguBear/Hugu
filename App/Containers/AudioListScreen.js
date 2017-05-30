/* eslint-disable no-undef */
import React from 'react'
import { View, ListView, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'

import AlertMessage from '../Components/AlertMessage'
import AudioListItem from '../Components/AudioListItem.js'
import ChooseBearModal from '../Components/ChooseBearModal'
import RecordActions from '../Redux/RecordRedux'
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
      sent: 0,
      audioDataSource: ds.cloneWithRows(audioData),
      chosenAudioPath: ''
    }

    this.setModalVisible = this.setModalVisible.bind(this)
  }

  renderRow (rowData) {
    return (
      <AudioListItem
        audio={rowData}
        onClick={audiolist._onItemClick}
        renameAudio={audiolist.props.renameAudio}
        setModalVisible={audiolist.setModalVisible}
        isUploading={audiolist.props.isUploading}
        deleteAudio={audiolist.props.deleteAudio}
      />
    )
  }
  componentWillMount () {
    audiolist._getAudioFromLocal(this.props.audioFiles)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.currentState === 'finishedUploading') {
      ToastAndroid.show('Upload SUCCESSFUL', ToastAndroid.LONG)
    }
    if (newProps.currentState === 'finishedUploadingWithError') {
      ToastAndroid.show('Upload FAILED', ToastAndroid.LONG)
    }
    if (newProps.audioFiles !== this.props.audioFiles) {
      audiolist._getAudioFromLocal(newProps.audioFiles)
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
          setModalVisible={this.setModalVisible} />
      </View>
    )
  }

  _onItemClick (item) {
    if (focusedItem != null) {
      focusedItem.setState({myFlexDirection: 'row'})
    }
    focusedItem = item // HERE NOOP WARNIGN FOR SET STATE WHEN YOU DELETED LAST ELEMENT AND IT RECYCLES SO IT IS NULL
    if (item.state.myFlexDirection === 'row') {
      item.setState({myFlexDirection: 'column'})
    } else {
      item.setState({myFlexDirection: 'row'})
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
    isUploading: state.recording.isUploading,
    finishedRecording: state.recording.finishedRecording,
    bearList: state.bear.results,
    audioFiles: state.recording.audioFiles
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
