import React, {useEffect, useState} from 'react';
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
import {Styles} from '../assets/css/Styles';
import NfcManager, {
  Ndef,
  NfcError,
  NfcEvents,
  NfcTech,
} from 'react-native-nfc-manager';
import Toast from 'react-native-toast-message';
import fetchWithToken from '../utils/fetchCustom';

const ModalConnectNFC = ({modalVisible, setModalVisible, latitude, longitude}: any) => {
  useEffect(() => {
    if (modalVisible) {
      console.log('useEffect');
      readNdef();
    }
    return () => {
      NfcManager.cancelTechnologyRequest();
    };
  }, [modalVisible]);

  async function readNdef() {
    try {
      await NfcManager.requestTechnology([NfcTech.Ndef]);
      const tag = await NfcManager.getTag();

      const tagNombre: any = tag?.ndefMessage[0]?.payload;
      const tagPlaca: any = tag?.ndefMessage[1]?.payload;
      const tagCelular: any = tag?.ndefMessage[2]?.payload;

      let Nombre = Ndef.text.decodePayload(tagNombre);
      let Placa = Ndef.text.decodePayload(tagPlaca);
      let Celular = Ndef.text.decodePayload(tagCelular);

      console.log({Nombre});
      console.log({Placa});
      console.log({Celular});

      if (tag) {
        cancelNfcScan();
        showToast();
        fetchWithToken(
          'api/accidents',
          {
            latitude: latitude,
            altitude: longitude,
            dateCreated: Date.now(),
            plate: Placa,
            owner: Nombre,
            phone: Celular,
            user: '39633582-1660-4ac2-addf-598d7f9784b8',
          },
          'POST',
        );
      }
    } catch (ex) {
      console.warn('Oops!', JSON.stringify(ex));
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  function cancelNfcScan() {
    NfcManager.cancelTechnologyRequest();
    setModalVisible(false);
  }

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: '¡Alerta enviada!',
      text2: 'Un policia acudirá a ayudarte en unos minutos 👋',
    });
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
          <Image
            source={require('../assets/images/nfc-512.png')}
            style={{width: 120, height: 120, padding: 20}}
            resizeMode="contain"
          />
          <Text style={styles.modalText}>Acerca tu dispositivo al NFC</Text>
          <Button
            title="Cancelar"
            onPress={() => cancelNfcScan()}
            containerStyle={{
              borderRadius: 10,
              width: '100%',
            }}
            buttonStyle={{backgroundColor: Styles.colors.primary}}
            titleStyle={{paddingVertical: 5}}
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
    // alignItems: "center",
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
export default ModalConnectNFC;
