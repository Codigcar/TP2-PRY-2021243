import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text } from 'react-native';
import { Map } from '../components/Map';

import { io } from "socket.io-client";
import fetchWithToken from '../utils/fetchCustom';
import { PermissionsContext } from '../context/PermissionsContext';
import {APP_API, APP_API_SOCKET} from "@env";

export const MapScreen = () => {

  const socketRef = useRef<any>();
  const [markers, setMarkers] = useState<any>([]);
  const {askLocationPermission} = useContext(PermissionsContext);

  useEffect(() => {
    
    fetchListAccidents().then((resp: any) => setMarkers(resp));
    socketRef.current = io(`${APP_API_SOCKET}`);
    socketRef.current.on('accidents', (data: any) => {
      setMarkers((oldArray: any) => [...oldArray, data]);
      console.log({data});
      
    })
    
    socketRef.current.on('accidents-taken', (data: any) => {
      setMarkers((array:any) => array.filter((item:any) => item.id !== data.id));
    })
  }, [])

  useEffect(() => {
    if (markers) {
      console.log({ markers: markers });
    }
  }, [markers])

  const fetchListAccidents = async () => {
    try {
      const resp = await fetchWithToken('api/accidents');
      const data = await resp.json();
      return data;
    } catch (error) {
      console.error({ error });
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Map markers={markers} />
    </View>

  )
}
