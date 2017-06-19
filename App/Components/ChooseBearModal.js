import React, { Component } from 'react'
import { Modal, Text, TouchableOpacity, View, ListView } from 'react-native'
import I18n from 'react-native-i18n'

import styles from './Styles/ChooseBearModalStyle'
import RoundedButton from './RoundedButton'

export default class ChooseBearModal extends Component {
  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      dataSource: ds.cloneWithRows(props.bearList.connected)
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.bearList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.bearList.connected)
      })
    }
  }

  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  renderRow (rowData, uploadRequest, setBearModalVisible, chosenAudioPath) {
    return (
      <View style={styles.bearRow}>
        <TouchableOpacity
          style={styles.bearNameButton}
          onPress={() => {
            uploadRequest(chosenAudioPath, rowData.bearKey)
            setBearModalVisible(false)
          }}>
          <View style={styles.bearName}>
            <Text style={styles.bearNameText}>{rowData.bearName}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.bearKey}>
          <Text style={styles.bearKeyText}>{rowData.bearKey}</Text>
        </View>
      </View>
      // <View>
      //   <TouchableOpacity
      //     style={styles.bearRow}
      //     onPress={() => {
      //       uploadRequest(chosenAudioPath, rowData.bearKey)
      //       setBearModalVisible(false)
      //     }}>
      //     <Text style={styles.bearText}>{rowData.bearName} @@@{rowData.bearKey}@@@</Text>
      //   </TouchableOpacity>
      // </View>
    )
  }

  render () {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => { this.props.setBearModalVisible(false) }} >
          <View style={{marginTop: 22}}>
            <Text style={styles.modalTitle}>{I18n.t('chooseBear')}</Text>
            <ListView
              contentContainerStyle={styles.listContent}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => this.renderRow(rowData, this.props.uploadRequest, this.props.setBearModalVisible, this.props.chosenAudioPath)}
            />
            <RoundedButton
              onPress={() => this.props.setBearModalVisible(false)}>
              {I18n.t('cancel')}
            </RoundedButton>
          </View>
        </Modal>
      </View>
    )
  }
}
