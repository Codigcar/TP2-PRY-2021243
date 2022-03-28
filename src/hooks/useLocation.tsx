import { useEffect, useState, useRef } from 'react';

import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {

    const [hasLocation, setHasLocation] = useState(false);

    const [initialPosition, setInitialPosition] = useState<Location>({
        longitude: 0,
        latitude: 0
    });

    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, [])



    useEffect(() => {
        Geolocation.getCurrentPosition(
            (info) => {
                setInitialPosition({
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude
                })
                setHasLocation(true);
            },
            (err) => console.error({ err }),
            { enableHighAccuracy: true }
        );
    }, []);


    return {
        hasLocation,
        initialPosition,
    }
}
