import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from 'react-native';
import {Button} from 'react-native-elements';
import NfcManager, {
  Ndef,
  NfcError,
  NfcEvents,
  NfcTech,
} from 'react-native-nfc-manager';
import Toast from 'react-native-toast-message';
import Geocoder from 'react-native-geocoder';
import {io} from 'socket.io-client';
import {USER_ID} from '@env';
import {Styles} from '../../assets/css/Styles';
import {SvgUri} from 'react-native-svg';
import {APP_API_SOCKET, POLICE_ID} from '@env';
import { StackScreenProps } from '@react-navigation/stack';

export interface IAccident {
  longitude: string;
  dateCreated: string;
  latitude: string;
  owner: string;
  phone: string;
  plate: string;
  user: string;
  address: string;
}
interface Props extends StackScreenProps<any, any> {}

const ModalTakeAccident = ({modalVisible, setModalVisible, user, navigation}: any) => {
  const socketRef = useRef<any>();
  socketRef.current = io(`${APP_API_SOCKET}`);

  useEffect(() => {
    // if (modalVisible) {
    //   readNdef();
    // }
    // return () => {
    //   NfcManager.cancelTechnologyRequest();
    // };
  }, [modalVisible]);

  const acceptedAccident = (id: string) => {
    socketRef.current.emit('accidents-taken', {id: id, userPolice: POLICE_ID});

    // navigation.navigate('AccidentDetailScreen');
    navigation.navigate('AccidentDetailScreen', {accidentId: id});
    setModalVisible(false);
  };

  const closeModel = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{fontWeight: 'bold', marginBottom: 9, fontSize: 17}}>
            ¿Quieres atender este accidente?
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              backgroundColor: 'transparent',
              width: '100%',
              alignItems: 'center',
            }}>
            <View>
              <Image
                source={require('../../assets/images/icon.png')}
                style={{width: 120, height: 120, padding: 20}}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.modalText}>{user.owner}</Text>
              <Text style={styles.modalText}>{user.address}</Text>
              <Text style={styles.modalText}>{user.plate}</Text>
            </View>
          </View>
          <Button
            title="Aceptar"
            onPress={() => acceptedAccident(user.id)}
            containerStyle={{
              borderRadius: 10,
              width: '100%',
              marginBottom: 10,
            }}
            buttonStyle={{backgroundColor: Styles.colors.primary}}
            titleStyle={{paddingVertical: 5}}
          />
          <Button
            title="Cancelar"
            onPress={() => closeModel()}
            containerStyle={{
              borderRadius: 10,
              width: '100%',
            }}
            buttonStyle={{backgroundColor: 'white'}}
            titleStyle={{paddingVertical: 5, color: Styles.colors.primary}}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '100%',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: Styles.colors.primary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 3,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default ModalTakeAccident;
