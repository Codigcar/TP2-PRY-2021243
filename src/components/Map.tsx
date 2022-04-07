import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useRef, useState } from 'react';

import { Button } from 'react-native-elements';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Styles } from '../assets/css/Styles';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Image, Text, View, Animated, StyleSheet, Modal } from 'react-native';
import nfcManager from 'react-native-nfc-manager';
import CModal from './CModal';
import ModalConnectNFC from './ModalConnectNFC';




interface Props {
    markers?: Marker[];
    user?: any
}

export const Map = ({ markers, user = "admin" }: Props) => {

    const {
        hasLocation,
        initialPosition,
        getCurrentLocation
    } = useLocation();
    const mapViewRef = useRef<MapView>();
    const animValue = React.useRef(new Animated.Value(0)).current;
    const [modalVisible, setModalVisible] = React.useState(false);


    const centerPosition = async () => {
        const { latitude, longitude } = await getCurrentLocation();
        mapViewRef.current?.animateCamera({
            center: { latitude, longitude }
        });
    }
    console.log('[Markersv1]: ', initialPosition.latitude);
    console.log('[Markersv2]: ', initialPosition.longitude);

    if (!hasLocation) {
        return <LoadingScreen />
    }

    const modalScanNFC = () => {
        console.log('dale');
        setModalVisible(true);
    }

    const bgAnimStyle = {
        backgroundColor: 'rgba(0,0,0,0.3)',
        opacity: animValue,
    };

    function cancelNfcScan() {
        setTimeout(() => {
            nfcManager.cancelTechnologyRequest().catch(() => 0);
        }, 200);
        setModalVisible(false);
    }

    const promptAnimStyle = {
        transform: [
            {
                translateY: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0],
                }),
            },
        ],
    };

    return (
        <>
            <MapView
                ref={(el) => mapViewRef.current = el!}
                style={[styles.mapViewContainer, modalVisible && styles.opacity]}
                showsUserLocation
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {
                    markers && markers.length > 0 && markers.map((marker: any, key: any) => (
                        marker.status && <Marker
                            // image={ require('../assets/custom-marker.png') }
                            key={key}
                            coordinate={{
                                latitude: Number(marker.latitude),
                                longitude: Number(marker.altitude),
                            }}
                            title="Esto es un título"
                            description="Esto es una descripción del marcador"
                        />
                    ))
                }
            </MapView>
            <Button
                title="¡Mandar Alerta!"
                onPress={() => modalScanNFC()}
                containerStyle={{
                    position: 'absolute',
                    bottom: 20,
                    left: 0,
                    right: 0,
                    marginHorizontal: 50,
                    borderRadius: 10,
                }}
                buttonStyle={{ backgroundColor: Styles.colors.primary }}
                titleStyle={{ paddingVertical: 5 }}
            />
            {/* <Fab
                iconName="compass-outline"
                onPress={centerPosition}
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                }}
            /> */}

          {/*   <Modal transparent={false} visible={true}>
                <View style={[styles.wrapper]}>
                    <View style={{ flex: 1 }} />
                    <Animated.View style={[styles.prompt, promptAnimStyle]}>
                        <View
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('../assets/images/nfc-512.png')}
                                style={{ width: 120, height: 120, padding: 20 }}
                                resizeMode="contain"
                            />

                            <Text>Listo para scanear tag NFC</Text>
                        </View>

                        <Button onPress={cancelNfcScan}>
                            CANCEL
                        </Button>
                    </Animated.View>

                    <Animated.View style={[styles.promptBg, bgAnimStyle]} />
                </View>
            </Modal> */}
            <ModalConnectNFC modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>

    )
}


const styles = StyleSheet.create({
    mapViewContainer:{
        flex:1,
    },
    wrapper: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    promptBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        // width: '100%',
        // height: '100%',
        zIndex: 1,
    },
    prompt: {
        height: 1300,
        alignSelf: 'stretch',
        padding: 20,
        backgroundColor: 'transparent',
        borderRadius: 20,
        margin: 20,
        zIndex: 2,
    },
    opacity: {
        opacity: .3
    }
});
