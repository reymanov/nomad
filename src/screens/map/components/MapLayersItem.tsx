import React from 'react';
import { View, StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemedText } from '@components/texts';
import { useColorMode } from 'native-base';

interface Props {
    title: string;
    image: ImageSourcePropType;
    isActive: boolean;
    onPress: () => void;
}

export const MapLayersItem: React.FC<Props> = ({ title, image, isActive, onPress }) => {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';
    const labelColor = isDarkMode ? '#444' : '#e7e5e4';
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
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
        width: 168,
        height: 100,
        borderRadius: 8,
        backgroundColor: 'lightgrey',
        marginBottom: 16,
    },
    image: {
        flex: 1,
    },
    active: {
        borderWidth: 2,
        borderColor: '#0891b2',
    },
    label: {
        opacity: 0.9,
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 12,
        position: 'absolute',
        bottom: 0,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        backgroundColor: '#e7e5e4',
    },
    labelActive: {
        borderColor: '#0891b2',
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
    },
});
