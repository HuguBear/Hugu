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
    Alert,
    TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import BearActions from '../Redux/BearRedux'
import styles from './Styles/BearListStyle'
import AlertMessage from '../Components/AlertMessage'
import RoundedButton from '../Components/RoundedButton'
import IonIcon from 'react-native-vector-icons/Ionicons'
import I18n from 'react-native-i18n'
var WifiManager = require('react-native-wifi-manager');

class BearListScreen extends React.Component {
  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1 !== r2
    const sectionHeaderHasChanged = (s1, s2) => s1 !== s2
    // DataSource configured
    const ds = new ListView.DataSource({ rowHasChanged, sectionHeaderHasChanged })
    const wifids = new ListView.DataSource({rowHasChanged})
    const huguds = new ListView.DataSource({rowHasChanged})

    this.unconnectedRowID = null;

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(props.results),
      wifiDataSource: wifids.cloneWithRows({}),
      huguDataSource: huguds.cloneWithRows({}),
      modalVisible: false,
      modalBearName: '',
      modalBearKey: '',
      wifiModalVisible: false,
      ssid: '',
      password: '',
      wifiData: [],
      bearData: [],
      wifids: wifids,
      huguds: huguds,
      huguSelected: '',
      //----------------------------------------------------------------------------------!!!!
      isWifiScreen: false, // !!!!!!!!!!!!! NOMAINĪT UZ TRUE, LAI NEIZLAISTU WIFI IZVĒLI  !!!!
      //----------------------------------------------------------------------------------!!!!
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.results) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(newProps.results)
      })
    }
  }

  componentDidMount() {
    this.loadWifiListData();
    this.loadBearListData();
  }

  loadWifiListData() {
    WifiManager.list(
        (wifiArray) => {
          let newArray = [];

          for (var i = 0; i < wifiArray.length; i++) {
            let ssid = wifiArray[i];
            if (ssid == this.state.ssid) {
              newArray.push({
                ssid: ssid,
                isSelected: true,
              });
              }
              else {
                newArray.push({
                  ssid: ssid,
                  isSelected: false
                });
              }
            }
            this.setState({
                // wifiArray is an array of strings, each string being the SSID
                wifiDataSource: this.state.wifiDataSource.cloneWithRows(newArray),
                wifiData: newArray,
            });
        },
        (msg) => {
          return [];
        },
    );
  }

  loadBearListData() {
    WifiManager.list(
        (wifiArray) => {
          let newArray = [];

          for (var i = 0; i < wifiArray.length; i++) {
            let ssid = wifiArray[i];
            // console.log(ssid.substring(0,5) + "  :  " + "Dzidz");
            if (ssid.substring(0,5) === "Dzidz") {
              // console.log(this.state.huguSelected);
              if (ssid == this.state.huguSelected) {
                newArray.push({
                  ssid: ssid,
                  isSelected: true,
                });
                }
                else {
                  newArray.push({
                    ssid: ssid,
                    isSelected: false
                  });
                }
              }
              // console.log(newArray);
            }
            this.setState({
                // wifiArray is an array of strings, each string being the SSID
                huguDataSource: this.state.wifiDataSource.cloneWithRows(newArray),
                bearData: newArray,
            });
        },
        (msg) => {
          return [];
        },
    );
  }

  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  refreshWifiList(container) {
    // console.log("REFRESHING");
    if (container.state.isWifiScreen) {
      container.loadWifiListData();
    }
    else {
      container.loadBearListData();
    }
    container.wifiTimeout = setTimeout(container.refreshWifiList, 3000, container);
  }

  setWifiModalVisible(isVisible) {  //isVisible - how it should be now
    if (isVisible) {
      // this.refreshWifiList(this);
      setTimeout(this.refreshWifiList, 1000, this);
    }
    else { //refresho kamēr modals ir atvērts
      clearTimeout(this.wifiTimeout)
    }

    this.setState({
      wifiModalVisible: isVisible
    });

  }

  renderWifiRow(wifiRow, connectBearRequest) {
    let rowExtension = ( wifiRow.isSelected ) ?
      (<View style={styles.wifiRowExtension}>
        <TextInput autofocus
          style={styles.wifiPasswordInputField}
          underlineColorAndroid="#fff"
          placeholder="Password"
          onChangeText={(input) => {this.setState({
            password: input
          })} }
          />
      </View>)
      :
      null

    return (
      <TouchableOpacity onPress={() => {
        let wifiDataArray = this.state.wifiData;
        for (var i = 0; i < wifiDataArray.length; i++) {
          if (wifiDataArray[i].isSelected && wifiDataArray[i].ssid !== wifiRow.ssid) {
            wifiDataArray[i].isSelected = false;
          }
          if (wifiDataArray[i].ssid === wifiRow.ssid) {
            wifiDataArray[i].isSelected = !wifiDataArray[i].isSelected;
            if (!wifiDataArray[i].isSelected) { //Nav neviens wifi izvēlēts
              this.setState({
                ssid: '',
                wifiData: wifiDataArray,
                wifiDataSource: this.state.wifids.cloneWithRows(wifiDataArray)
              });
            }
            else {  //Ir izvēlēts
              this.setState({
                ssid: wifiRow.ssid,
                wifiData: wifiDataArray,
                wifiDataSource: this.state.wifids.cloneWithRows(wifiDataArray)
              });
            }
          }
        }
      }}>
        <View style={styles.wifiRow}>
          <Text>
            {wifiRow.ssid}
          </Text>
        </View>
        {rowExtension}
      </TouchableOpacity>
    )
  }

  renderHuguRow(wifiRow, rowID, connectBearRequest) {
    let styleprops = this.huguRowStyle(wifiRow.isSelected);
    return (
      <TouchableOpacity onPress={() => {
        let newArray = this.state.bearData;
        let huguSel = "";
        for (var i = 0; i < newArray.length; i++) {
          if (newArray[i].ssid === wifiRow.ssid) {
            newArray[i].isSelected = !newArray[i].isSelected;
            if (newArray[i].isSelected) {
              huguSel = wifiRow.ssid;
            }
          }
        }
        this.setState({
          huguSelected: huguSel,
          huguDataSource: this.state.wifiDataSource.cloneWithRows(newArray),
        })
      }}>
        <View style={styleprops.view}>
          <Text style={styleprops.text}>
            {wifiRow.ssid}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  huguRowStyle(isSelected) {
    if (isSelected) {
      return {
        view: [styles.wifiRow, styles.rowSelected],
        text: styles.rowSelectedText
      }
    }
    else {
      return {
        view: styles.wifiRow,
        text: {}
      }
    }
  }


  renderRow (rowData, sectionID, rowID, deleteBearRequest, connectBearRequest) {
    // You can condition on sectionID (key as string), for different cells
    // in different sections
    // <TouchableOpacity
      // style={[styles.bearNameButton, (sectionID === 'connected' ? styles.connected : styles.notConnected)]}
      // onLongPress={() => { (sectionID === 'connected' ? null : connectBearRequest(rowID)) }}
      // >
    return (
      <View style={styles.bearRow}>
        <View style={styles.bearName}>
          <TouchableOpacity
            style={[styles.bearNameButton, (sectionID === 'connected' ? styles.connected : styles.notConnected)]}
            onPress={() => {
              if (sectionID !== 'connected') {
                this.setWifiModalVisible(!this.state.wifiModalVisible);
                this.unconnectedRowID = rowID;
               }
             }}>
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
    let wifiModalContent = (this.state.isWifiScreen) ?
    (
      <TouchableWithoutFeedback>
      <View>
        <View style={styles.wifiModalHeader}>
          <Text style={styles.wifiModalHeaderText}>
            {"WIFI"}
          </Text>
        </View>
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.wifiDataSource}
          renderRow={(rowData) => this.renderWifiRow(rowData, this.props.connectBearRequest)}
          enableEmptySections={true}
          pageSize={15}/>
        <View style={styles.wifiModalFooter}>
          <Text style={styles.wifiModalFooterText}>
            {"Lācim ir nepieciešama piekļuva Jūsu wifi savienojumam, lai tas varētu saņemt ziņojumus."}
          </Text>
        </View>
        <RoundedButton disabled={(this.state.ssid === '') ? true : false} onPress={() => {  }}>
          {I18n.t('continue')}
        </RoundedButton>
        <RoundedButton onPress={() => { this.setWifiModalVisible(!this.state.wifiModalVisible) }}>
          {I18n.t('cancel')}
        </RoundedButton>
      </View>
      </TouchableWithoutFeedback>

    )
    :
    (
      <TouchableWithoutFeedback>
      <View>
        <View style={styles.wifiModalHeader}>
          <Text style={styles.wifiModalHeaderText}>
            {"LĀČI TUVUMĀ"}
          </Text>
        </View>
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.huguDataSource}
          renderRow={(rowData, rowID) => this.renderHuguRow(rowData, rowID, this.props.connectBearRequest)}
          enableEmptySections={true}
          pageSize={15}/>
        <View style={styles.wifiModalFooter}>
          <Text style={styles.wifiModalFooterText}>
            {"Izvēlaties Jūsu lāci"}
          </Text>
        </View>
        <RoundedButton disabled={(this.state.huguSelected === '') ? true : false} onPress={() => { this.props.connectBearRequest(this.state.huguSelected, this.unconnectedRowID);}}>
          {I18n.t('choose')}
        </RoundedButton>
        <RoundedButton onPress={() => { this.setWifiModalVisible(!this.state.wifiModalVisible) }}>
          {I18n.t('cancel')}
        </RoundedButton>
        </View>
      </TouchableWithoutFeedback>
    );

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
          enableEmptySections={true}
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
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.wifiModalVisible}
          onRequestClose={() => {  }}>
          <TouchableWithoutFeedback onPress={() => {this.setWifiModalVisible(!this.state.wifiModalVisible);}}>
            <View style={styles.wifiModalBackground}>
              <View style={styles.wifiModalContainer}>
                {wifiModalContent}
              </View>
            </View>
          </TouchableWithoutFeedback>
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
    connectBearRequest: (hugussid, rowIndex) => dispatch(BearActions.connectBearRequest(hugussid, "hugubear", rowIndex)),
    deleteBearRequest: (indexes) => dispatch(BearActions.deleteBearRequest(indexes)),
    makeSagaRequest: (testSagaInput) => dispatch(BearActions.testSagaRequest(testSagaInput))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BearListScreen)
