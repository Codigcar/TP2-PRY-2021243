import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
const AccidentsDetail = () => {
    return (
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
                <Text>Fase: Sin atender</Text>
            </View>
            <View style={styles.arrow} >
                <Icon name='chevron-forward-outline' size={30} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        paddingVertical: 20
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

    }
})

export default AccidentsDetail