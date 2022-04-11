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

  //   async function readNdef() {
  //     try {
  //       await NfcManager.requestTechnology([NfcTech.Ndef]);
  //       const tag = await NfcManager.getTag();

  //       const tagNombre: any = tag?.ndefMessage[0]?.payload;
  //       const tagPlaca: any = tag?.ndefMessage[1]?.payload;
  //       const tagCelular: any = tag?.ndefMessage[2]?.payload;

  //       let Nombre = Ndef.text.decodePayload(tagNombre);
  //       let Placa = Ndef.text.decodePayload(tagPlaca);
  //       let Celular = Ndef.text.decodePayload(tagCelular);

  //       let distric = '';
  //       let address = '';

  //       console.log({Nombre});
  //       console.log({Placa});
  //       console.log({Celular});

  //       if (tag) {
  //         cancelNfcScan();
  //         showToast();

  //         var currentLocation = {
  //           lat: latitude,
  //           lng: longitude,
  //         };

  //         const respGeo = await Geocoder.geocodePosition(currentLocation);
  //         try {
  //           distric = await respGeo[1].locality;
  //           address = await respGeo[2].formattedAddress;
  //         } catch (error) {
  //           console.error(error);
  //         }

  //         const body: IAccident = {
  //           latitude: latitude.toString(),
  //           longitude: longitude.toString(),
  //           dateCreated: new Date().toISOString(),
  //           plate: Placa,
  //           owner: Nombre,
  //           phone: Celular,
  //           user: `${USER_ID}`,
  //           address: distric + ', ' + address,
  //         };

  //         socketRef.current = io(`${APP_API_SOCKET}`);
  //         socketRef.current.emit('accidents', body);

  //       }
  //     } catch (ex) {
  //       console.warn('Oops!', JSON.stringify(ex));
  //     } finally {
  //       NfcManager.cancelTechnologyRequest();
  //     }
  //   }

  const acceptedAccident = (id: string) => {
    socketRef.current.emit('accidents-taken', {id: id, userPolice: POLICE_ID});
    navigation.navigate('AccidentDetailScreen');
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
