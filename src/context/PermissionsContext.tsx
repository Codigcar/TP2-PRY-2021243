import React, { createContext, useState } from 'react'
import { Platform } from 'react-native';
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';

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

const PermissionsProvider = ({ children }: any) => {

    const [permissions, setPermissions] = useState(permissionInitState);

    const askLocationPermission = async() => {
        let permissionStatus: PermissionStatus;

        if (Platform.OS === 'ios') {
            permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        setPermissions({
            ...permissions,
            localStatus: permissionStatus
        })
    }
    const checkLocationPermission = () => {

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

export { PermissionsProvider }