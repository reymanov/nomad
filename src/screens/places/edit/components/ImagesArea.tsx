import React from 'react';
import { HStack, useTheme } from 'native-base';
import { Image, StyleSheet, View } from 'react-native';

import { IconButton } from '@components/buttons';

interface Props {
    images: string[];
    onRemove: (img: string) => void;
}

export const ImagesArea: React.FC<Props> = ({ images = [], onRemove }) => {
    const { colors } = useTheme();

    return (
        <HStack style={styles.container}>
            {images.map(img => (
                <View key={img} style={styles.imageContainer}>
                    <Image source={{ uri: img }} style={styles.image} resizeMode={'cover'} />
                    <IconButton
                        icon={'remove-circle'}
                        color={colors.red['600']}
                        size={32}
                        style={styles.removeImage}
                        onPress={() => onRemove(img)}
                    />
                </View>
            ))}
        </HStack>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
    },
    imageContainer: {
        width: '30%',
        marginRight: '5%',
    },
    image: {
        aspectRatio: 1,
        borderRadius: 4,
    },
    removeImage: {
        position: 'absolute',
        top: -12,
        right: -10,
    },
});
