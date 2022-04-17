import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  Button,
} from 'react-native';
import {Avatar, Divider, SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import fetchWithToken from '../utils/fetchCustom';
import {io} from 'socket.io-client';
import {Styles} from '../assets/css/Styles';
import Toast from 'react-native-toast-message';
import {APP_API_SOCKET, POLICE_ID} from '@env';
import ModalTakeAccident from './police/ModalTakeAccident';
import {SearchBarBaseProps} from 'react-native-elements/dist/searchbar/SearchBar';
import {LoadingScreen} from './LoadingScreen';

interface Props extends StackScreenProps<any, any> {}

export const AccidentsNewsScreen = ({navigation}: Props) => {
  const socketRef = useRef<any>();
  const [accidents, setListAccidents] = useState<any>([]);
  const isActive = useRef<any>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userSelected, setUserSelected] = useState<any>({});

  const [search, setSearch] = useState<any>('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>('');

  const SafeSearchBar = SearchBar as unknown as React.FC<SearchBarBaseProps>;

  useEffect(() => {
    fetchListAccidents().then((resp: any) => {
      setListAccidents(resp);
    });
    socketRef.current = io(`${APP_API_SOCKET}`);
    socketRef.current.on('accidents', (data: any) => {
      console.log({data});
      showToast();
      setListAccidents((oldArray: any) => [data, ...oldArray]);
    });

    socketRef.current.on('accidents-taken', (data: any) => {
      setListAccidents((array: any) =>
        array.filter((item: any) => item.id !== data.id),
      );
    });
    isActive.current = true;
  }, []);

  const fetchListAccidents = async () => {
    try {
      const resp = await fetchWithToken(`api/accidents/no-active`);
      const data = await resp.json();
      return data;
    } catch (error) {
      console.error({error});
    }
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: '¡Nuevo Accidente!',
      text2: 'En Av. Las Palmeras 321 👋',
    });
  };

  const openModal = (item: any) => {
    setUserSelected(item);
    setModalVisible(true);
  };

  const searchFilterFunction = (text: string) => {
    console.log({text});

    if (text) {
      const newData = accidents.filter(function (item: any) {
        const itemData = item.user.dni;
        return itemData.indexOf(text) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(accidents);
      setSearch(text);
    }
  };

  const rendeItem = ({item}: any) => {
    return (
      <>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            openModal(item);
          }}>
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
              {item.status == 2 && <Text>Fase: Finzaldo</Text>}
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
        <ModalTakeAccident
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          user={userSelected}
          navigation={navigation}
        />
      </>
    );
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Recientes</Text>
      </View>
      <Divider style={styles.dividerTitleLineRed} />

      <SafeSearchBar
        containerStyle={{
          backgroundColor: '#fff',
          borderTopColor: '#FFF',
          borderBottomColor: '#FFF',
          paddingHorizontal: 0,
          ...Platform.select({
            ios: {
              paddingVertical: 0,
              borderRadius: 10,
            },
          }),
        }}
        inputContainerStyle={styles.estiloBarraBusqueda}
        onChangeText={(text: string) => searchFilterFunction(text)}
        onClear={() => searchFilterFunction('')}
        placeholder="DNI"
        value={search}
        platform={'android'}
      />

      {typeof filteredDataSource === 'string' ? (
        <LoadingScreen />
      ) : (
        <>
          {filteredDataSource.length === 0 ? (
            <Text>No se encontrador</Text>
          ) : (
            <FlatList
              data={filteredDataSource}
              keyExtractor={(item, index) => index.toString()}
              renderItem={rendeItem}
            />
          )}
        </>
      )}
    </View>
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
  estiloBarraBusqueda: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 0,
    // borderColor: 'rgba(0,0,0,0.5)',
    ...Platform.select({
      ios: {},
      android: {
        marginLeft: 15,
        marginRight: 15,
        shadowOpacity: 0.39,
        shadowRadius: 13.97,
        elevation: 11,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
});
