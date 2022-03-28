import React, { createContext, useEffect, useState } from 'react'
import { AppState, Platform } from 'react-native';
import { check, openSettings, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';

export interface PermissionState {
    localStatus: PermissionStatus;
}

export const permissionInitState: PermissionState = {
    localStatus: 'unavailable'
}

type PermissionContextProps = {
    permissions: PermissionState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
}

export const PermissionContext = createContext({} as PermissionContextProps); // TODO: que data compartirá

export const PermissionsProvider = ({ children }: any) => {

    const [permissions, setPermissions] = useState(permissionInitState);

    useEffect(() => {
        // verifica si el app está en background o active
        checkLocationPermission();
        AppState.addEventListener('change', state => {
            console.log({ state });
            if (state !== 'active') return;
            checkLocationPermission();
        })
    }, [])

    const askLocationPermission = async () => {
        // solicita/pregunta la activacion
        let permissionStatus: PermissionStatus;

        if (Platform.OS === 'ios') {
            permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        if(permissionStatus==='blocked'){
            openSettings();
        }

        setPermissions({
            ...permissions,
            localStatus: permissionStatus
        })
    }
    const checkLocationPermission = async () => {
        // revisa
        let permissionStatus: PermissionStatus;

        if (Platform.OS === 'ios') {
            permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        setPermissions({
            ...permissions,
            localStatus: permissionStatus
        })
    }

    return (
        <PermissionContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission
        }} >
            {children}
        </PermissionContext.Provider>
    )
}
