import React, {useEffect, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {Avatar, Input} from 'react-native-elements';
import {Styles} from '../../assets/css/Styles';
import {Button} from 'react-native-elements';
import CModal from '../../components/CModal';
import fetchWithToken from '../../utils/fetchCustom';
import {io} from 'socket.io-client';
import {APP_API, APP_API_SOCKET} from '@env';
import {validateAll} from 'indicative/validator';
import {LoadingScreen} from '../LoadingScreen';
import {Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props extends StackScreenProps<any, any> {
  route: any;
}

const AccidentsDetailScreen = ({route: {params}, navigation}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [accidentDetail, setAccidentDetail] = useState<any>({});

  const [description, setDescription] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [SignUpErrors, setSignUpErrors] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchInitData()
      .then((resp: any) => {
        setAccidentDetail(resp);
        setDescription(resp.description);
        setConclusion(resp.conclusion);
      })
      .catch(err => {
        console.error({err});
        Alert.alert('Error', 'Intentelo en unos minutos por favor');
      });
  }, []);

  const fetchInitData = async () => {
    setLoading(true);
    try {
      const resp = await fetchWithToken(`api/accidents/${params.accidentId}`);
      const data = await resp.json();
      console.log({data});
      setLoading(false);
      return data;
    } catch (error) {
      console.error({error});
      setLoading(false);
    }
  };

  const updatedAccident = async (accident: any) => {
    const rules = {
      // description: 'string',
      // conclusion: 'string',
    };

    const data = {
      description: description,
      conclusion: conclusion,
    };

    const messages = {
      required: 'Campo requerido',
    };

    console.log({accident});

    validateAll(data, rules, messages)
      .then(async () => {
        setLoading(true);
        let body: any = {};
        if (conclusion.trim().length > 0) {
          body = {
            status: 2,
            description,
            conclusion,
            userPolice: accident.userPolice,
          };
        } else {
          body = {
            status: 1,
            description,
            conclusion,
            userPolice: accident.userPolice,
          };
        }

        try {
          console.log({body});
          const data = await fetchWithToken(
            `api/accidents/${accident.id}`,
            body,
            'PUT',
          );
          const resp = await data.json();
          console.log({resp});
          setLoading(false);
          navigation.goBack();
          // navigation.navigate('AccidentsFinishedScreen');
          // navigation.popToTop();
        } catch (error) {
          console.error({error});
          setLoading(false);
        }
      })
      .catch(err => {
        let formatError: any = {};
        console.log('ERROR: ' + JSON.stringify(err));
        err.forEach((err: any) => {
          formatError[err.field] = err.message;
        });
        setSignUpErrors(formatError);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {loading ? (
        <LoadingScreen />
      ) : (
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
                <Text>R: {accidentDetail.user?.name} </Text>
                <Text>Ubicación: {accidentDetail?.address}</Text>
                <Text>Placa: {accidentDetail?.plate}</Text>
                <Text>Dueño: {accidentDetail?.owner} </Text>
                <Text>Telefono: {accidentDetail?.phone}</Text>
                {accidentDetail.status == 0 && <Text>Fase: No atendido</Text>}
                {accidentDetail.status == 1 && <Text>Fase: En proceso</Text>}
                {accidentDetail.status == 2 && <Text>Fase: Finalizado</Text>}
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
                  paddingHorizontal: 10,
                }}
                placeholder="Escriba una descripción"
                value={description}
                onChangeText={setDescription}
              />
              {SignUpErrors && (
                <Text style={styles.errorStyle}>
                  {SignUpErrors.description}
                </Text>
              )}
              <Text style={styles.titleInput}>Conclusión</Text>
              <TextInput
                multiline={true}
                numberOfLines={7}
                style={{
                  borderWidth: 1,
                  borderColor: Styles.colors.primary,
                  borderRadius: 20,
                  paddingHorizontal: 10,
                }}
                placeholder="Escriba una conclusión"
                value={conclusion}
                onChangeText={setConclusion}
              />
              {SignUpErrors && (
                <Text style={styles.errorStyle}>{SignUpErrors.conclusion}</Text>
              )}
              <Button
                title="Guardar registro"
                onPress={() => updatedAccident(accidentDetail)}
                containerStyle={{
                  borderRadius: 10,
                  width: '100%',
                  marginBottom: 10,
                  marginTop: 40,
                }}
                buttonStyle={{backgroundColor: Styles.colors.primary}}
                titleStyle={{paddingVertical: 5}}
              />
            </View>
          </View>
          <CModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </ScrollView>
      )}
    </SafeAreaView>
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
  errorStyle: {
    color: '#ff0000',
    textAlign: 'right',
    paddingRight: 2,
  },
});

export default AccidentsDetailScreen;
