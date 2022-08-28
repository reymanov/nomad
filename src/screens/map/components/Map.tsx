import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { MAP_TYPES, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { throttle } from 'lodash';

import { mapActions, MapType } from '@store/map/mapSlice';
import { useSelectMapStyle } from '@store/map/useMapSelectors';
import { dark, GenericStyles, retro } from '@constants/index';
import { readMapType } from '@utils/Storage';
import { MapControls } from './MapControls';
import { logEvent } from '@utils/Analytics';
import { Place, Places } from '@constants/data';
import { useSelectActiveVisitType } from '@store/places';
import { useTheme } from 'native-base';

export const Map = () => {
    const [region, setRegion] = useState<Region>();
    const [cameraHeading, setCameraHeading] = useState(0);
    const visitType = useSelectActiveVisitType();
    const mapStyle = useSelectMapStyle();
    const { colors } = useTheme();
    const dispatch = useDispatch();

    const showVisited = visitType === 'VISITED';

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
                mapRef.current.animateToRegion(region, 600);
            }
        });
        logEvent('focus_user_location');
    };

    const focusPlace = (Place: Place) => {
        const { latitude, longitude } = Place.position;
        const region = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.4,
            longitudeDelta: 0.4,
        };
        if (mapRef.current) {
            mapRef.current.animateToRegion(region, 1000);
        }
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
        logEvent('map_rotate_north');
    };

    const openMapLayersDrawer = () => {
        dispatch(mapActions.openMapLayersDrawer());
        logEvent('open_map_layers_drawer');
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
            >
                {Places.map(i => {
                    if ((showVisited && !i.visited) || (!showVisited && i.visited)) return null;
                    return (
                        <Marker
                            key={i.id}
                            coordinate={{
                                latitude: i.position.latitude,
                                longitude: i.position.longitude,
                            }}
                            title={i.name}
                            pinColor={colors.primary['700']}
                            onPress={() => focusPlace(i)}
                        />
                    );
                })}
            </MapView>
            <MapControls
                cameraHeading={cameraHeading}
                onMapLayersPress={openMapLayersDrawer}
                onLocationPress={focusUserLocation}
                onCompassPress={rotateNorth}
            />
        </>
    );
};

const styles = StyleSheet.create({
    map: {
        ...GenericStyles.absoluteFill,
        bottom: -25,
        zIndex: 0,
    },
});
