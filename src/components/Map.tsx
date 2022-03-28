import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';

interface Props {
    markers?: Marker[];
}


export const Map = ({ markers }: Props) => {

    const { 
        hasLocation,
        initialPosition,
    } = useLocation();


    if(!hasLocation){
        return <LoadingScreen />
    }

    return (
        <>
            <MapView
                style={{ flex: 1 }}
                showsUserLocation
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    // image={ require('../assets/custom-marker.png') }
                    coordinate={{
                        // latitude: 37.78825,
                        // longitude: -122.4324,
                        latitude: initialPosition.latitude,
                        longitude: initialPosition.longitude,
                    }}
                    title="Esto es un título"
                    description="Esto es una descripción del marcador"
                />

            </MapView>

        </>
    )
}
