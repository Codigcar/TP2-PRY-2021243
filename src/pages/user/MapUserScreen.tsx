import React from 'react'
import { View } from 'react-native'
import { Map } from '../../components/Map'

const MapUserScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Map markers={[]} />
        </View>
    )
}

export default MapUserScreen