import React from 'react';
import { useColorMode, useTheme } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { Map, MapLayersDrawer } from './components';
import { DestinationsToggle } from '@components/DestinationsToggle';
import { GenericStyles, Sizes } from '@constants/index';

const MapScreen: React.FC = () => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];

    return (
        <View style={styles.container}>
            <Map />
            <DestinationsToggle style={styles.toggle} />
            <MapLayersDrawer />
            <View style={[styles.curve, { backgroundColor }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toggle: {
        position: 'absolute',
        bottom: Sizes.xl,
        left: Sizes.md,
        right: Sizes.md,
    },
    curve: {
        width: '100%',
        height: 8,
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        ...GenericStyles.center,
    },
});

export default MapScreen;
