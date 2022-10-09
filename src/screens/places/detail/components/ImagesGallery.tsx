import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { GenericStyles } from '@constants/styles';

interface Props {
    images: string[];
    onPress: (index: number) => void;
}

export const ImagesGallery: React.FC<Props> = ({ images, onPress }) => {
    if (images.length === 1) return null;
    return (
        <View style={styles.container}>
            {images.map((image, index) => {
                return (
                    <Animated.View
                        key={image}
                        entering={FadeInDown.delay(index * 200).duration(500)}
                    >
                        <TouchableOpacity key={image} onPress={() => onPress(index)}>
                            <Image source={{ uri: image }} style={[styles.galleryItem]} />
                        </TouchableOpacity>
                    </Animated.View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Dimensions.get('window').height * 0.25,
        right: 16,
        zIndex: 1,
        alignItems: 'center',
        ...GenericStyles.shadow,
    },
    galleryItem: {
        height: 64,
        width: 64,
        borderRadius: 8,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
});
