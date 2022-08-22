import React, { useEffect, useRef, useState } from 'react';
import MapView, { MAP_TYPES, PROVIDER_GOOGLE, Region } from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';
import { StyleSheet } from 'react-native';
import { MapControls } from './MapControls';
import { useSelectMapStyle } from '@store/map/useMapSelectors';
import { dark, retro } from '@constants/index';
import { mapActions, MapType } from '@store/map/mapSlice';
import { useDispatch } from 'react-redux';
import { readMapType } from '@utils/Storage';

export const Map = () => {
    const [region, setRegion] = useState<Region>();
    const [isMapRotated, setIsMapRotated] = useState(false);
    const mapStyle = useSelectMapStyle();
    const dispatch = useDispatch();

    const mapRef = useRef<MapView>(null);
    const initialRegion = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 2,
        longitudeDelta: 28,
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
        const fetchMapstateAndSendToStore = async () => {
            const savedMapType = await readMapType();
            dispatch(mapActions.setMapStyle(savedMapType || MapType.STANDARD));
        };
        fetchMapstateAndSendToStore();

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

    const mapType =
        mapStyle === MapType.DARK || mapStyle === MapType.RETRO
            ? MAP_TYPES.STANDARD
            : MAP_TYPES[mapStyle];
    const customMapStyle =
        mapStyle === MapType.DARK ? dark : mapStyle === MapType.RETRO ? retro : undefined;

    return (
        <>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={region}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                mapType={mapType}
                maxZoomLevel={18}
                minZoomLevel={2}
                customMapStyle={customMapStyle}
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
