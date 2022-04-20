import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
  SafeAreaView,
} from 'react-native';
import {Avatar, Divider, SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import fetchWithToken from '../utils/fetchCustom';
import {io} from 'socket.io-client';
import {Styles} from '../assets/css/Styles';

import {APP_API_SOCKET} from '@env';
import {LoadingScreen} from './LoadingScreen';
import {SearchBarBaseProps} from 'react-native-elements/dist/searchbar/SearchBar';
import CSearchBar from '../components/CSearchBar';

interface Props extends StackScreenProps<any, any> {}

export const AccidentsFinishedScreen = ({navigation}: Props) => {
  const socketRef = useRef<any>();
  const [accidents, setListAccidents] = useState<any>([]);
  const isActive = useRef<any>(false);
  const [loading, setLoading] = useState(false);
  const SafeSearchBar = SearchBar as unknown as React.FC<SearchBarBaseProps>;

  const [search, setSearch] = useState<any>('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>('');

  useEffect(() => {
    fetchListAccidents()
      .then((resp: any) => setListAccidents(resp))
      .catch(err => {
        console.error({err});
        Alert.alert('Error', 'Intentelo en unos minutos por favor');
      });
    socketRef.current = io(`${APP_API_SOCKET}`);
    socketRef.current.on('accidents', (data: any) => {
      console.log({data});
      setListAccidents((oldArray: any) => [...oldArray, data]);
    });

    socketRef.current.on('accidents-taken', (data: any) => {
      setListAccidents((array: any) => [...array, data]);
    });
    isActive.current = true;
  }, []);

  const fetchListAccidents = async () => {
    setLoading(true);
    try {
      const resp = await fetchWithToken(`api/accidents`);
      const data = await resp.json();
      setLoading(false);
      return data;
    } catch (error) {
      console.error({error});
      setLoading(false);
    }
  };

  const rendeItem = ({item}: any) => {
    return (
      <>
        {(item.status == 1 || item.status == 2) && (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('AccidentDetailScreen', {accidentId: item.id})
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
                <Text>DNI: {item.user?.dni}</Text>
                <Text>Telefono: {item.phone}</Text>
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
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Atendidos</Text>
          </View>
          <Divider style={styles.dividerTitleLineRed} />

          <CSearchBar
            accidents={accidents}
            search={search}
            setSearch={setSearch}
            filteredDataSource={filteredDataSource}
            setFilteredDataSource={setFilteredDataSource}
            rendeItem={rendeItem}
          />

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
