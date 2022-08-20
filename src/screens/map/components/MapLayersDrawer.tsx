import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useColorMode, useTheme } from 'native-base';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { MapLayersItem } from './MapLayersItem';
import { mapActions } from '@store/map/mapSlice';
import { ThemedText } from '@components/texts';
import { useSelectMapLayersDrawerState } from '@store/map/useMapSelectors';

export const MapLayersDrawer: React.FC = () => {
    const dispatch = useDispatch();
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];
    const isOpen = useSelectMapLayersDrawerState();
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = [320];

    const handleClose = () => {
        dispatch(mapActions.closeMapLayersDrawer());
    };

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
                        <MapLayersItem title="Standard" />
                        <MapLayersItem title="Dark" />
                        <MapLayersItem title="Satelite" />
                        <MapLayersItem title="Mixed" />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
});
