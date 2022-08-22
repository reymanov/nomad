import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { MAP_TYPES, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { throttle } from 'lodash';

import { mapActions, MapType } from '@store/map/mapSlice';
import { useSelectMapStyle } from '@store/map/useMapSelectors';
import { dark, retro } from '@constants/index';
import { readMapType } from '@utils/Storage';
import { MapControls } from './MapControls';

export const Map = () => {
    const [region, setRegion] = useState<Region>();
    const [cameraHeading, setCameraHeading] = useState(0);
    const mapStyle = useSelectMapStyle();
    const dispatch = useDispatch();

    const mapRef = useRef<MapView>(null);
    const initialRegion = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 2,
        longitudeDelta: 24,
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

    const handleRegionChange = async () => {
        if (!mapRef) return;
        const camera = await mapRef.current?.getCamera();
        if (camera && camera.heading !== cameraHeading) setCameraHeading(camera.heading);
    };

    const throttledRegionChange = throttle(handleRegionChange, 60);

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
                minZoomLevel={3}
                customMapStyle={customMapStyle}
                onRegionChange={throttledRegionChange}
            />
            <MapControls
                cameraHeading={cameraHeading}
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
