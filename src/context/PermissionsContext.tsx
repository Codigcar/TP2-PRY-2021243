import React, { createContext, useState } from 'react'
import { PermissionStatus } from 'react-native-permissions';

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

    const askLocationPermission = () => {

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