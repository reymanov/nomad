import React from 'react';
import { useColorMode, useTheme } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, StyleSheet, ImageBackground, ImageSourcePropType, Dimensions } from 'react-native';

import { ThemedText } from '@components/texts';
import { GenericStyles } from '@constants/index';

interface Props {
    title: string;
    image: ImageSourcePropType;
    isActive: boolean;
    onPress: () => void;
}

export const MapLayersItem: React.FC<Props> = ({ title, image, isActive, onPress }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const isDarkMode = colorMode === 'dark';
    const labelColor = isDarkMode ? colors.dark['200'] : colors.dark['800'];

    const itemWidth = Dimensions.get('window').width / 2 - 26;
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, { width: itemWidth }]}>
            <ImageBackground
                source={image}
                style={styles.image}
                imageStyle={[{ borderRadius: 8 }, isActive ? styles.active : {}]}
            >
                <View
                    style={[
                        styles.label,
                        { backgroundColor: labelColor },
                        isActive ? styles.labelActive : {},
                    ]}
                >
                    <ThemedText>{title}</ThemedText>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 110,
        borderRadius: 9,
        backgroundColor: 'lightgrey',
        marginBottom: 16,
        ...GenericStyles.shadow,
    },
    image: {
        flex: 1,
    },
    active: {
        borderWidth: 2,
        borderColor: '#0891b2',
    },
    label: {
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 12,
        position: 'absolute',

        bottom: 0,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    },
    labelActive: {
        borderColor: '#0891b2',
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
    },
});
