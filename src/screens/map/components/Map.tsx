import React, { useEffect, useRef, useState } from 'react';
import MapView, { MAP_TYPES, PROVIDER_GOOGLE, Region } from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';
import { StyleSheet } from 'react-native';
import { MapControls } from './MapControls';
import { useSelectMapStyle } from '@store/map/useMapSelectors';
import { dark } from '@constants/index';
import { MapType } from '@store/map/mapSlice';

export const Map = () => {
    const [region, setRegion] = useState<Region>();
    const [isMapRotated, setIsMapRotated] = useState(false);
    const mapStyle = useSelectMapStyle();

    const mapRef = useRef<MapView>(null);
    const initialRegion = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04,
    };

    const focusUserLocation = () => {
        Geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const region = {
                ...initialRegion,
                latitude: latitude,
                longitude: longitude,
            };
            if (mapRef.current) {
                mapRef.current.animateToRegion(region, 200);
            }
        });
    };

    useEffect(() => {
        Geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setRegion({
                ...initialRegion,
                latitude: latitude,
                longitude: longitude,
            });
        });
    }, []);

    const handleRegionChangeComplete = async () => {
        if (!mapRef) return;
        const camera = await mapRef.current?.getCamera();

        if (camera?.heading !== 0) {
            setIsMapRotated(true);
        } else {
            setIsMapRotated(false);
        }
    };

    const rotateNorth = () => {
        mapRef.current?.animateCamera({ heading: 0 });
    };

    const mapType = mapStyle === MapType.DARK ? MAP_TYPES.STANDARD : MAP_TYPES[mapStyle];

    return (
        <>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={region}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                mapType={mapType}
                customMapStyle={mapStyle === MapType.DARK ? dark : undefined}
                onRegionChangeComplete={handleRegionChangeComplete}
            />
            <MapControls
                isMapRotated={isMapRotated}
                onLocationPress={focusUserLocation}
                onCompassPress={rotateNorth}
            />
        </>
    );
};

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: -25,
        zIndex: 0,
    },
});
