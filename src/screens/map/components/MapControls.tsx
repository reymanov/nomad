import React from 'react';
import { useDispatch } from 'react-redux';
import { useColorMode, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { mapActions } from '@store/map/mapSlice';

interface IMapControls {
    isMapRotated: boolean;
    onLocationPress: () => void;
    onCompassPress: () => void;
}

export const MapControls: React.FC<IMapControls> = ({
    isMapRotated,
    onLocationPress,
    onCompassPress,
}) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const dispatch = useDispatch();

    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];
    const iconColor = isDarkMode ? colors.dark[800] : colors.dark[50];
    const handleMapLayersClick = () => {
        dispatch(mapActions.openMapLayersDrawer());
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.control, { backgroundColor }]}
                onPress={handleMapLayersClick}
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
                    <Icon name={'compass'} size={24} color={iconColor} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60,
        right: 16,
    },
    control: {
        width: 40,
        height: 40,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#222',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        marginBottom: 8,
    },
});
