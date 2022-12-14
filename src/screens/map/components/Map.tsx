import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { MAP_TYPES, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { throttle } from 'lodash';

import { Colors } from '@constants/theme';
import { GenericStyles } from '@constants/styles';
import { dark, retro } from '@constants/mapStyles';
import { mapActions, MapType } from '@store/map/mapSlice';
import { useSelectMapStyle } from '@store/map/useMapSelectors';
import { readMapType } from '@utils/Storage';
import { MapControls } from './MapControls';
import { TPlace, useSelectActiveVisitType, useSelectPlaces } from '@store/places';

export const Map: React.FC = () => {
    const [region, setRegion] = useState<Region>();
    const [cameraHeading, setCameraHeading] = useState(0);
    const visitType = useSelectActiveVisitType();
    const mapStyle = useSelectMapStyle();
    const places = useSelectPlaces();
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
    };

    const focusPlace = (Place: TPlace) => {
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
    };

    const openMapLayersDrawer = () => {
        dispatch(mapActions.openMapLayersDrawer());
    };

    const mapType =
        mapStyle === MapType.DARK || mapStyle === MapType.RETRO
            ? MAP_TYPES.STANDARD
            : MAP_TYPES[mapStyle];

    const customMapStyle =
        mapStyle === MapType.DARK ? dark : mapStyle === MapType.RETRO ? retro : undefined;

    const filteredPlaces = useMemo(
        () =>
            places.filter(place => {
                return showVisited ? place.isVisited : !place.isVisited;
            }),
        [places, showVisited]
    );

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
                {filteredPlaces.map(i => {
                    return (
                        <Marker
                            key={i.id}
                            coordinate={{
                                latitude: i.position.latitude,
                                longitude: i.position.longitude,
                            }}
                            title={i.name}
                            pinColor={Colors.primary}
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
