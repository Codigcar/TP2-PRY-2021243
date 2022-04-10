import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Platform, Button } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { io } from "socket.io-client";
import Toast from 'react-native-toast-message';
import {APP_API_SOCKET} from "@env";
import { Styles } from '../../assets/css/Styles';
import fetchWithToken from '../../utils/fetchCustom';

interface Props extends StackScreenProps<any, any> { }

export const AccidentsNewsUserScreen = ({ navigation }: Props) => {

  const socketRef = useRef<any>();
  const [accidents, setListAccidents] = useState<any>([]);
  const isActive = useRef<any>(false);


  const fetchListAccidents = async () => {
    try {
      const resp = await fetchWithToken('api/accidents');
      const data = await resp.json();
      console.log({data});
      return data;
    } catch (error) {
      console.error({ error });
    }
  }

  useEffect(() => {
    fetchListAccidents().then((resp: any) => setListAccidents(resp));
    socketRef.current = io(`${APP_API_SOCKET}`);
    socketRef.current.on('accidents', (data: any) => {
      console.log({ data });
      showToast();
      setListAccidents((oldArray: any) => [...oldArray, data]);
    })

    socketRef.current.on('accidents-taken', (data: any) => {
      setListAccidents((array: any) => array.filter((item: any) => item.id !== data.id));
    })
    isActive.current = true;

  }, [])


  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: '¡Nuevo Accidente!',
      text2: 'En Av. Las Palmeras 321 👋'
    });
  }

  const rendeItem = ({item}:any) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AccidentDetail')} >
        <View style={styles.flexRow}>
          <View style={styles.avatar}>
            <Avatar
              rounded
              size={55}
              source={{
                uri:
                  'https://cdn2.salud180.com/sites/default/files/styles/medium/public/field/image/2020/11/mujer-22-anos-se-opera-para-no-tener-hijos.jpg',
              }}
            />
          </View>
          <View>
            <Text>R: {item.owner}</Text>
            <Text>Ubicación: Callao 1453 Calle 2</Text>
            <Text>Placa: {item.plate}</Text>
            <Text>Fase: {item.status ? 'Sin atender':'Atentido|En Proceso' }</Text>
          </View>
          <View style={styles.arrow} >
            <Icon name='chevron-forward-outline' size={30} color={Styles.colors.primary} />
          </View>
        </View>
      </TouchableOpacity>

    )
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Recientes</Text>
      </View>
      <Divider style={styles.dividerTitleLineRed} />
      <FlatList
        data={accidents}
        renderItem={rendeItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    paddingVertical: 20,
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  arrow: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  headerContainer: {
    backgroundColor: '#FFF',
    borderTopColor: 'transparent',
    borderTopWidth: 2,
    height: 70,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 0,
    borderColor: Styles.colors.primary,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  headerTitle: {
    fontSize: 26,
  },
  dividerTitleLineRed: {
    borderColor: Styles.colors.primary,
    backgroundColor: '#d41c1c',
    borderWidth: 2,
    marginLeft: 20,
    width: 50,
  },
})
