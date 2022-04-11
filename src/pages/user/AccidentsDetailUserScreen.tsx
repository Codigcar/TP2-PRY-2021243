import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Button} from 'react-native-elements';
import {io} from 'socket.io-client';
import {APP_API, APP_API_SOCKET} from '@env';
import {Styles} from '../../assets/css/Styles';
import fetchWithToken from '../../utils/fetchCustom';
import CModal from '../../components/CModal';
import { IAccident } from '../../components/ModalConnectNFC';

const AccidentsDetailUserScreen = ({route:{params}}:any) => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [accidentDetail, setAccidentDetail] = useState<any>({});

  useEffect(() => {
    // setAccidentDetail({
    //   id: '11530061-d0e0-4c5c-9e63-220248eace33',
    //   latitude: '-12.18995545',
    //   longitude: '-76.99422841',
    //   status: true,
    //   dateCreated: '2022-04-10T22:46:38.617Z',
    //   plate: 'APU-812',
    //   owner: 'Carlos Castilla',
    //   phone: '946100691',
    //   description: null,
    //   conclusion: null,
    //   address: 'Chorrillos, Vista Alegre De Villa, Cercado de Lima 15057, Perú',
    // });
    setAccidentDetail(params.user)
  }, []);

  return (
    <ScrollView>
      <View style={[styles.card, modalVisible && styles.opacity]}>
        <View style={styles.flexRow}>
          <View style={styles.avatar}>
            <Avatar
              rounded
              size={55}
              source={{
                uri: 'https://cdn2.salud180.com/sites/default/files/styles/medium/public/field/image/2020/11/mujer-22-anos-se-opera-para-no-tener-hijos.jpg',
              }}
            />
          </View>
          <View style={styles.info}>
            <Text>R: {accidentDetail.owner} </Text>
            <Text>Ubicación: {accidentDetail.address}</Text>
            <Text>Placa: {accidentDetail.plate}</Text>
            {accidentDetail.status == 0 && <Text>Fase: No atendido</Text>}
            {accidentDetail.status == 1 && <Text>Fase: En proceso</Text>}
            {accidentDetail.status == 2 && <Text>Fase: Finzaldo</Text>}
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.titleInput}>Descripción</Text>
          <TextInput
            multiline={true}
            numberOfLines={7}
            style={{
              borderWidth: 1,
              borderColor: Styles.colors.primary,
              borderRadius: 20,
            }}
            editable={false}
            value={ accidentDetail.description !== null ? accidentDetail.description : 'Descripción aún no registrado...'}
          />
          <Text style={styles.titleInput}>Conclusión</Text>
          <TextInput
            multiline={true}
            numberOfLines={7}
            style={{
              borderWidth: 1,
              borderColor: Styles.colors.primary,
              borderRadius: 20,
            }}
            editable={false}
            value={ accidentDetail.conclusion !== null ? accidentDetail.conclusion : 'Conclusión aún no registrado...'}
          />
        </View>
      </View>
      <CModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '25%',
  },
  info: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  body: {
    marginHorizontal: 20,
  },
  titleInput: {
    marginVertical: 15,
    fontWeight: 'bold',
    fontSize: 15,
  },
  opacity: {
    opacity: 0.4,
  },
});

export default AccidentsDetailUserScreen;
