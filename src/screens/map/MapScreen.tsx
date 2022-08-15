import React from 'react';
import { useColorMode, useTheme } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { Map, MapLayersDrawer } from './components';

const MapScreen = () => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];

    return (
        <View style={styles.container}>
            <Map />
            <MapLayersDrawer />
            <View style={[styles.curve, { backgroundColor }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    curve: {
        width: '100%',
        height: 15,
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    mapLayers: {
        position: 'absolute',
        top: 72,
        right: 16,
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#222',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.5,
    },
});

export default MapScreen;
