import React, { useCallback, useRef } from 'react';

// import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
// import { useSelectMapLayersDrawerState } from '@store/map/useMapSelectors';
import { useDispatch } from 'react-redux';
// import { mapActions } from '@store/map/mapSlice';
import { useColorMode, useTheme } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { MapLayersItem } from './MapLayersItem';
// import ThemedText from '@components/texts/ThemedText';

export const MapLayersDrawer = () => {
    const dispatch = useDispatch();
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];
    // const isOpen = useSelectMapLayersDrawerState();
    // const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = ['42%'];

    // const handleSheetChanges = useCallback((index: number) => {
    //     if (index < 0) {
    //         dispatch(mapActions.closeMapLayersDrawer());
    //     }
    // }, []);

    // // renders
    // const renderBackdrop = useCallback(
    //     props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    //     []
    // );
    return (
        <>
            {/* <BottomSheet
                ref={bottomSheetRef}
                index={isOpen ? 0 : -1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                onChange={handleSheetChanges}
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
                        <MapLayersItem title="Standard" />
                        <MapLayersItem title="Standard" />
                        <MapLayersItem title="Standard" />
                    </View>
                </View>
            </BottomSheet> */}
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
