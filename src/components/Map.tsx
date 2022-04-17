import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../pages/LoadingScreen';
import {Fab} from './Fab';
import {View, Image} from 'react-native';

interface Props {
  markers?: Marker[];
}

export const Map = ({markers}: Props) => {
  const {hasLocation, initialPosition, getCurrentLocation} = useLocation();

  const mapViewRef = useRef<MapView>();

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();
    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  };
  console.log('[Markersv1]: ', initialPosition.latitude);
  console.log('[Markersv2]: ', initialPosition.longitude);

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <MapView
      ref={el => (mapViewRef.current = el!)}
      style={{flex: 1}}
      showsUserLocation
      initialRegion={{
        latitude: initialPosition.latitude,
        longitude: initialPosition.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {markers &&
        markers.length > 0 &&
        markers.map((marker: any, key: any) => (
          <Marker
            // image={ require('../assets/custom-marker.png') }
            key={key}
            coordinate={{
              latitude: Number(marker.latitude),
              longitude: Number(marker.longitude),
            }}
            title="Esto es un título"
            description="Esto es una descripción del marcador"
          />
        ))}
      {/* <View style={{position: 'absolute', top: 0, left: 0}}>
        <Image
          source={require('./../assets/images/icon-navbar.png')}
          resizeMode="contain"
        />
      </View> */}
    </MapView>
  );
};
