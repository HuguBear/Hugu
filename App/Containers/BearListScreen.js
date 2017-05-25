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
import Icon from 'react-native-vector-icons/FontAwesome'

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

  renderRow (rowData, sectionID, rowID, deleteBearRequest) {
    // You can condition on sectionID (key as string), for different cells
    // in different sections
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Text>
          Name: {rowData.bearName}
          @@@
          Key: {rowData.bearKey}
        </Text>
        <TouchableOpacity
          onPress={() => Alert.alert(
            'Alert Title',
            'alertMessage',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'OK', onPress: () => deleteBearRequest(rowID)}
            ]
          )}>
          <Icon name='trash' size={30} />
        </TouchableOpacity>
      </View>
    )
  }

  renderHeader (data, sectionID) {
    return <Text>...................................{sectionID}...................................></Text>
  }

  setModalVisible (visible, bear) {
    this.setState({modalVisible: visible})
    if (bear) {
      this.props.addBearRequest(bear)
      this.setState({
        modalBearName: '',
        modalBearKey: ''
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <AlertMessage title='Nothing to See Here, Move Along' show={this.noRowData()} />
        <RoundedButton onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
           Add Bears
        </RoundedButton>
        <ListView
          renderSectionHeader={this.renderHeader}
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={(data, sectionID, rowID) => this.renderRow(data, sectionID, rowID, this.props.deleteBearRequest)}
          enableEmptySections
          pageSize={15} />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }} >
          <View style={{marginTop: 22}}>
            <View>
              <Text>Add bear!</Text>
              <TextInput
                value={this.state.modalBearName}
                onChangeText={(modalBearName) => this.setState({modalBearName})}
                placeholder={'Bear Name'} />
              <TextInput
                value={this.state.modalBearKey}
                onChangeText={(modalBearKey) => this.setState({modalBearKey})}
                placeholder={'Bear Key'} />
              <RoundedButton
                disabled={(this.state.modalBearKey.length === 0 || this.state.modalBearName.length === 0)}
                onPress={() => { this.setModalVisible(!this.state.modalVisible, {bearName: this.state.modalBearName, bearKey: this.state.modalBearKey}) }}>
                Add Bear
              </RoundedButton>
              <RoundedButton onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                Cancel
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
    deleteBearRequest: (indexToDelete) => dispatch(BearActions.deleteBearRequest(indexToDelete)),
    makeSagaRequest: (testSagaInput) => dispatch(BearActions.testSagaRequest(testSagaInput))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BearListScreen)
