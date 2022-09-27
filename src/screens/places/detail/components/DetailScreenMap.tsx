import React, { forwardRef } from 'react';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors } from '@src/constants';

interface Props {
    location: LatLng;
}

export const DetailScreenMap = forwardRef<MapView, Props>(({ location }, ref) => {
    const { latitude, longitude } = location;

    return (
        <MapView
            ref={ref}
            style={{ width: '100%', height: 200, borderRadius: 8, marginTop: 64 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 1,
                longitudeDelta: 1,
            }}
            scrollEnabled={false}
        >
            <Marker
                coordinate={{
                    latitude,
                    longitude,
                }}
                pinColor={Colors.primary}
            />
        </MapView>
    );
});
