import React from 'react';
import { useDispatch } from 'react-redux';
import { useColorMode, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { mapActions } from '@store/map/mapSlice';
import { GenericStyles } from '@constants/index';

interface IMapControls {
    cameraHeading: number;
    onLocationPress: () => void;
    onCompassPress: () => void;
}

export const MapControls: React.FC<IMapControls> = ({
    cameraHeading,
    onLocationPress,
    onCompassPress,
}) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const dispatch = useDispatch();

    const isMapRotated = cameraHeading !== 0;
    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];
    const iconColor = isDarkMode ? colors.dark[800] : colors.dark[100];

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={[styles.control, { backgroundColor }]}
                onPress={() => dispatch(mapActions.openMapLayersDrawer())}
            >
                <Icon name={'earth'} size={22} color={iconColor} />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.control, { backgroundColor }]}
                onPress={onLocationPress}
            >
                <Icon name={'navigate'} size={20} color={iconColor} />
            </TouchableOpacity>

            {isMapRotated && (
                <TouchableOpacity
                    style={[styles.control, { backgroundColor }]}
                    onPress={onCompassPress}
                >
                    <Icon
                        name={'compass'}
                        size={24}
                        color={iconColor}
                        style={{ transform: [{ rotate: `-${cameraHeading}deg` }] }}
                    />
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 80,
        right: 12,
    },
    control: {
        padding: 10,
        borderRadius: 6,
        marginBottom: 8,
        ...GenericStyles.center,
        ...GenericStyles.shadow,
    },
});
