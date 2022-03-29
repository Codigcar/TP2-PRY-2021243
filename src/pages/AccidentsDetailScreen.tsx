import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Styles } from '../assets/css/Styles';
import { Button } from 'react-native-elements';
import CModal from '../components/CModal';
import fetchWithToken from '../utils/fetchCustom';
import { io } from "socket.io-client";


const AccidentsDetailScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const socketRef = useRef<any>();

    const updateRegiter = async () => {
        setModalVisible(true);
        const data: any = {
            "description": 'description',
            "conclusion": 'conclusion'
        }
        try {
            const sol = await fetchWithToken(`api/accidents/fbeef40a-dd8f-46ac-a72d-aef02f6d5b77`, data, 'PUT');
            const resp = await sol.json();
            console.log({ resp });
            if (resp?.id) {
                socketRef.current = io('http://10.0.2.2:3001');
                socketRef.current.emit('accidents-taken', { id: 'fbeef40a-dd8f-46ac-a72d-aef02f6d5b77' })
            }
        } catch (error) {
            console.error({error});
            
        }

    };

    return (
        <ScrollView>
            <View style={[styles.card, modalVisible && styles.opacity]} >
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
                        <Text>R: Pablo Perez</Text>
                        <Text>Ubicación: Callao 1453 Calle 2</Text>
                        <Text>Placa: 9043-FF</Text>
                        <Text>Fase: En proceso</Text>
                        <Text>Propietario: Pablo Pere</Text>
                        <Text>Teléfono: 946100691</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={styles.titleInput}>Descripción</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={7}
                        style={{ borderWidth: 1, borderColor: Styles.colors.primary, borderRadius: 20 }}
                    // onChangeText={(text) => this.setState({ text })}
                    // value={'hola'} 
                    />
                    <Text style={styles.titleInput} >Conclusión</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={7}
                        style={{ borderWidth: 1, borderColor: Styles.colors.primary, borderRadius: 20 }}
                    // onChangeText={(text) => this.setState({ text })}
                    // value={'hola'} 
                    />

                    <Button
                        title="Guardar registro"
                        buttonStyle={{ backgroundColor: Styles.colors.primary, marginTop: 30 }}
                        onPress={updateRegiter}
                    />
                </View>
            </View>
            <CModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        paddingVertical: 20,
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    body: {
        marginHorizontal: 20
    },
    titleInput: {
        marginVertical: 15,
        fontWeight: 'bold',
        fontSize: 15
    },
    opacity: {
        opacity: .4
    }
})

export default AccidentsDetailScreen