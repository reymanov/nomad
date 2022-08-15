// import { mapActions } from '@src/store/map/mapSlice';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { useColorMode, useTheme } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface IMapControls {
    isCompassDisplayed: boolean;
    onLocationPress: () => void;
    onCompassPress: () => void;
}

export const MapControls: React.FC<IMapControls> = ({
    isCompassDisplayed,
    onLocationPress,
    onCompassPress,
}) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const dispatch = useDispatch();

    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];
    const revertedBackgroundColor = !isDarkMode ? colors.dark[300] : colors.dark[800];

    const handleMapLayersClick = () => {
        // dispatch(mapActions.openMapLayersDrawer());
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.control, { backgroundColor }]}
                onPress={handleMapLayersClick}
            >
                {/* <Icon name={'map'} size={20} color={revertedBackgroundColor} /> */}
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.control, { backgroundColor }]}
                onPress={onLocationPress}
            >
                {/* <Icon name={'location-arrow'} size={22} color={revertedBackgroundColor} /> */}
            </TouchableOpacity>

            {isCompassDisplayed && (
                <TouchableOpacity
                    style={[styles.control, { backgroundColor }]}
                    onPress={onCompassPress}
                >
                    {/* <Icon name={'compass'} size={24} color={revertedBackgroundColor} /> */}
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 64,
        right: 16,
    },
    control: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#222',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        marginBottom: 10,
    },
});
