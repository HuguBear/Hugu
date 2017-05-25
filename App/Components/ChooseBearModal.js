import React, { Component } from 'react'
import { Modal, Text, TouchableOpacity, View, ListView } from 'react-native'

import styles from './Styles/ChooseBearModalStyle'
import RoundedButton from './RoundedButton'

export default class ChooseBearModal extends Component {
  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      dataSource: ds.cloneWithRows(props.bearList)
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.bearList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(newProps.bearList)
      })
    }
  }

  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  renderRow (rowData, uploadRequest, setModalVisible, chosenAudioPath) {
    // You can condition on sectionID (key as string), for different cells
    // in different sections
    return (
      <View>
        <TouchableOpacity
          style={styles.bearRow}
          onPress={() => {
            uploadRequest(chosenAudioPath, rowData.bearKey)
            setModalVisible(false)
          }}>
          <Text style={styles.bearText}>{rowData.bearName} @@@{rowData.bearKey}@@@</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => { this.props.setModalVisible(false) }} >
          <View style={{marginTop: 22}}>
            <Text>Choose the bear!</Text>
            <ListView
              contentContainerStyle={styles.listContent}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => this.renderRow(rowData, this.props.uploadRequest, this.props.setModalVisible, this.props.chosenAudioPath)}
            />
            <RoundedButton
              onPress={() => this.props.setModalVisible(false)}>
              Cancel
            </RoundedButton>
          </View>
        </Modal>
      </View>
    )
  }
}
