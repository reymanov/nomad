import React, { useEffect, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';
import { StyleSheet } from 'react-native';
import { useColorMode } from 'native-base';
import { dark, light } from '@constants/mapThemes';
import { MapControls } from './MapControls';

export const Map = () => {
    const [region, setRegion] = useState<Region>();
    const [isMapRotated, setIsMapRotated] = useState(false);
    const { colorMode } = useColorMode();

    const mapRef = useRef<MapView>(null);
    const initialRegion = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04,
    };

    const mapStyle = light;

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

    return (
        <>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={region}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStyle}
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
