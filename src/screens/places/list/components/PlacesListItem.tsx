import React from 'react';
import { ImageBackground, Text, Pressable, StyleSheet, View } from 'react-native';

import { GenericStyles, Sizes } from '@constants/index';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
    name: string;
    country: string;
    image: string;
    isFavorite: boolean;
    onPress: () => void;
}

export const PlacesListItem: React.FC<Props> = ({ name, country, image, isFavorite, onPress }) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <ImageBackground source={{ uri: image }} resizeMode={'cover'} style={styles.image}>
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']}
                    style={styles.content}
                >
                    <View>
                        <Text style={styles.nameText}>{name}</Text>
                        <View style={styles.countryContainer}>
                            <Icon name={'place'} color={'#fff'} size={16} />
                            <Text style={styles.countryText}>{country}</Text>
                        </View>
                    </View>
                    {isFavorite && <Icon name={'favorite'} color={'#fff'} size={20} />}
                </LinearGradient>
            </ImageBackground>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 160,
        borderRadius: Sizes.xxs,
        marginBottom: Sizes.md,
        ...GenericStyles.shadow,
    },
    image: {
        flex: 1,
        borderRadius: Sizes.xxs,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    content: {
        height: '50%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: Sizes.sm,
    },
    nameText: {
        fontSize: Sizes.md,
        color: '#fff',
        marginBottom: Sizes.xxxs,
        fontWeight: '500',
    },
    countryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryText: {
        color: '#fff',
        marginLeft: Sizes.xxxs,
    },
});
