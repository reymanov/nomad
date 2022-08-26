import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useColorMode, useTheme } from 'native-base';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { MapLayersItem } from './MapLayersItem';
import { ThemedText } from '@components/texts';
import { useSelectMapLayersDrawerState, useSelectMapStyle, mapActions, MapType } from '@store/map';
import { writeMapType } from '@utils/Storage';
import { logEvent } from '@utils/Analytics';

export const MapLayersDrawer: React.FC = () => {
    const dispatch = useDispatch();
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];
    const isOpen = useSelectMapLayersDrawerState();
    const mapStyle = useSelectMapStyle();
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = [340];

    const handleClose = () => {
        dispatch(mapActions.closeMapLayersDrawer());
    };

    const selectMapType = useCallback(
        async (mapType: MapType) => {
            await writeMapType(mapType);
            dispatch(mapActions.setMapStyle(mapType));
            logEvent('select_map', { type: mapType });
        },
        [dispatch]
    );

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
        ),
        []
    );

    return (
        <>
            <BottomSheet
                ref={bottomSheetRef}
                index={isOpen ? 0 : -1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                onClose={handleClose}
                handleIndicatorStyle={{
                    backgroundColor: isDarkMode ? colors.dark[400] : colors.dark[200],
                }}
                enablePanDownToClose={true}
                backgroundStyle={{ backgroundColor }}
            >
                <View style={styles.content}>
                    <View style={styles.title}>
                        <ThemedText fontSize={24} fontWeight="medium">
                            Select map type
                        </ThemedText>
                    </View>

                    <View style={styles.items}>
                        <MapLayersItem
                            title="Standard"
                            image={require('@assets/images/standard.png')}
                            isActive={mapStyle === MapType.STANDARD}
                            onPress={() => selectMapType(MapType.STANDARD)}
                        />
                        <MapLayersItem
                            title="Hybrid"
                            image={require('@assets/images/hybrid.png')}
                            isActive={mapStyle === MapType.HYBRID}
                            onPress={() => selectMapType(MapType.HYBRID)}
                        />
                        <MapLayersItem
                            title="Dark"
                            image={require('@assets/images/dark.png')}
                            isActive={mapStyle === MapType.DARK}
                            onPress={() => selectMapType(MapType.DARK)}
                        />
                        <MapLayersItem
                            title="Retro"
                            image={require('@assets/images/retro.png')}
                            isActive={mapStyle === MapType.RETRO}
                            onPress={() => selectMapType(MapType.RETRO)}
                        />
                    </View>
                </View>
            </BottomSheet>
        </>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginHorizontal: 16,
    },
    title: {
        marginBottom: 16,
    },
    items: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
});
