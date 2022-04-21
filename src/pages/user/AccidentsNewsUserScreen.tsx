import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {io} from 'socket.io-client';
import {APP_API_SOCKET} from '@env';
import {Styles} from '../../assets/css/Styles';
import fetchWithToken from '../../utils/fetchCustom';
import {LoadingScreen} from '../LoadingScreen';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from '../../context/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props extends StackScreenProps<any, any> {}

export const AccidentsNewsUserScreen = ({navigation}: Props) => {
  const socketRef = useRef<any>();
  const [accidents, setListAccidents] = useState<any>([]);
  const isActive = useRef<any>(false);
  const [loading, setloading] = useState<boolean>(false);
  const {authState} = useContext(AuthContext);

  const fetchListAccidents = async () => {
    setloading(true);
    try {
      const resp = await fetchWithToken(
        `api/accidents/user/${authState.userId}`,
      );
      const data = await resp.json();
      setloading(false);
      return data;
    } catch (error) {
      console.error({error});
      setloading(false);
    }
  };

  useEffect(() => {
    fetchListAccidents().then((resp: any) => setListAccidents(resp));
    socketRef.current = io(`${APP_API_SOCKET}`);
    socketRef.current.on('accidents', (data: any) => {
      setListAccidents((oldArray: any) => [data, ...oldArray]);
    });

    socketRef.current.on('accidents-taken', (data: any) => {
      setListAccidents((array: any) =>
        array.filter((item: any) => item.id !== data.id),
      );
    });
    isActive.current = true;
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const rendeItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('AccidentDetailUserScreen', {
            accidentId: item.id,
          })
        }>
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
            <Text>R: {item.owner}</Text>
            <Text>Ubicación: {item.address}</Text>
            <Text>Placa: {item.plate}</Text>
            <Text>DNI: {item.user.dni}</Text>
            {item.status == 0 && <Text>Fase: No atendido</Text>}
            {item.status == 1 && <Text>Fase: En proceso</Text>}
            {item.status == 2 && <Text>Fase: Finalizado</Text>}
          </View>
          <View style={styles.arrow}>
            <Icon
              name="chevron-forward-outline"
              size={30}
              color={Styles.colors.primary}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Historial</Text>
          </View>
          <Divider style={styles.dividerTitleLineRed} />
          {accidents.length > 0 ? (
            <FlatList
              data={accidents}
              keyExtractor={(item, index) => index.toString()}
              renderItem={rendeItem}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Alertas no encontradas</Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    paddingVertical: 20,
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
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
  arrow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
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
        shadowOffset: {height: 0, width: 0},
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
});
