/* eslint-disable react/jsx-boolean-value */
'use strict'
import React from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ListView,
    Modal,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import BearActions from '../Redux/BearRedux'
import styles from './Styles/BearListStyle'
import AlertMessage from '../Components/AlertMessage'
import RoundedButton from '../Components/RoundedButton'
import IonIcon from 'react-native-vector-icons/Ionicons'
import I18n from 'react-native-i18n'

class BearListScreen extends React.Component {
  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1 !== r2
    const sectionHeaderHasChanged = (s1, s2) => s1 !== s2
    // DataSource configured
    const ds = new ListView.DataSource({ rowHasChanged, sectionHeaderHasChanged })
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(props.results),
      modalVisible: false,
      modalBearName: '',
      modalBearKey: ''
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.results) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(newProps.results)
      })
    }
  }

  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  renderRow (rowData, sectionID, rowID, deleteBearRequest, connectBearRequest) {
    // You can condition on sectionID (key as string), for different cells
    // in different sections
    return (
      <View style={styles.bearRow}>
        <View style={styles.bearName}>
          <TouchableOpacity
            style={[styles.bearNameButton, (sectionID === 'connected' ? styles.connected : styles.notConnected)]}
            onLongPress={() => { (sectionID === 'connected' ? null : connectBearRequest(rowID)) }}
            >
            <Text style={styles.bearNameText}>{rowData.bearName}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.trashButton}
            onPress={() => Alert.alert(
              'Delete',
              'Do you really wish to delete the bear?',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                {text: 'OK', onPress: () => deleteBearRequest({rowID, sectionID})}
              ]
            )}>
            <IonIcon style={styles.trashIcon} name='md-trash' size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.bearKey}>
          <Text style={styles.bearKeyText}>{rowData.bearKey}</Text>
        </View>
      </View>
    )
  }

  renderHeader (data, sectionID) {
    switch (sectionID) {
      case 'connected':
        return <Text style={styles.sectionHeader}>{I18n.t('connected')}</Text>
      case 'unconnected':
        return <Text style={styles.sectionHeader}>{I18n.t('notConnected')}</Text>
      default:
    }
  }

  setModalVisible (visible, bear) {
    this.setState({modalVisible: visible})
    if (bear) {
      this.props.addBearRequest(bear)
    }
    this.setState({
      modalBearName: '',
      modalBearKey: ''
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <AlertMessage title='No bears added!' show={this.noRowData()} />
        <RoundedButton onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
          {I18n.t('addBear')}
        </RoundedButton>
        <ListView
          renderSectionHeader={this.renderHeader}
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={(data, sectionID, rowID) => this.renderRow(data, sectionID, rowID, this.props.deleteBearRequest, this.props.connectBearRequest)}
          enableEmptySections={false}
          pageSize={15} />
        <Text style={styles.helperText}>{I18n.t('longPress')}</Text>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }} >
          <View style={styles.modalParent}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle} >{I18n.t('addBear')}!</Text>
              <TextInput
                autoFocus
                style={styles.modalTextInput}
                value={this.state.modalBearName}
                onChangeText={(modalBearName) => this.setState({modalBearName})}
                placeholder={I18n.t('bearName')} />
              <TextInput
                style={styles.modalTextInput}
                value={this.state.modalBearKey}
                onChangeText={(modalBearKey) => this.setState({modalBearKey})}
                placeholder={I18n.t('bearKey')} />
              <RoundedButton
                disabled={(this.state.modalBearKey.length === 0 || this.state.modalBearName.length === 0)}
                onPress={() => { this.setModalVisible(!this.state.modalVisible, {bearName: this.state.modalBearName, bearKey: this.state.modalBearKey}) }}>
                {I18n.t('addBear')}
              </RoundedButton>
              <RoundedButton onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                {I18n.t('cancel')}
              </RoundedButton>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.bear.results
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBearRequest: (bear) => dispatch(BearActions.addBearRequest(bear)),
    connectBearRequest: (index) => dispatch(BearActions.connectBearRequest(index)),
    deleteBearRequest: (indexes) => dispatch(BearActions.deleteBearRequest(indexes)),
    makeSagaRequest: (testSagaInput) => dispatch(BearActions.testSagaRequest(testSagaInput))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BearListScreen)
