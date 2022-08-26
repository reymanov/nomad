import React from 'react';
import { Text } from 'native-base';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { GenericStyles } from '@constants/index';

interface Props {
    id: number;
    name: string;
    country: string;
    image: string;
    isFavorite: boolean;
}

export const DestinationsListItem: React.FC<Props> = ({ id, name, country, image, isFavorite }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image source={{ uri: image }} resizeMode={'cover'} style={styles.image} />

            <View style={styles.content}>
                <View style={styles.title}>
                    <Text fontSize={16} fontWeight={'medium'}>
                        {name}
                    </Text>
                    <Text fontSize={12} color={'gray'}>
                        {country}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 6,
        backgroundColor: '#fff',
        marginBottom: 16,
        overflow: 'hidden',
        ...GenericStyles.shadow,
    },
    image: {
        width: '100%',
        height: 140,
        overflow: 'hidden',
    },
    content: {
        padding: 8,
    },
    title: {},
});
