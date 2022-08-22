import React from 'react';
import { useColorMode, useTheme } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { Map, MapLayersDrawer } from './components';

const MapScreen: React.FC = () => {
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
        position: 'absolute',
        top: -24,
        left: 0,
        right: 0,
        bottom: 0,
    },
    curve: {
        width: '100%',
        height: 8,
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        shadowColor: '#222',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.4,
    },
});

export default MapScreen;
