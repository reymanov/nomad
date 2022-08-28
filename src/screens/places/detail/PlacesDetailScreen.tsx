import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, useColorMode } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@components/texts';
import { GenericStyles } from '@constants/index';
import { ThemedScreenContainer } from '@containers/index';
import { ImagesGallery } from './components/ImagesGallery';
import { PLACES_STACK, TPlacesStack } from '@navigation/types';
import { placesActions, useSelectPlaceById } from '@store/places';

type TRoute = RouteProp<TPlacesStack, PLACES_STACK.PlacesDetail>;

export const PlacesDetailScreen: React.FC = () => {
    const route = useRoute<TRoute>();
    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
    const place = useSelectPlaceById(route.params.id);
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();

    if (!place) return null;
    const { id, name, country, description, images, isFavorite } = place;

    const toggleFavorite = () => {
        dispatch(placesActions.setFavorite({ id, isFavorite: !isFavorite }));
    };

    return (
        <ThemedScreenContainer useSafeArea={false}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: images[activeGalleryIndex] }} />
            </View>

            <TouchableOpacity
                style={[styles.favorite, { top: insets.top }]}
                onPress={toggleFavorite}
            >
                <Icon name={isFavorite ? 'favorite' : 'favorite-border'} color={'#fff'} size={26} />
            </TouchableOpacity>

            <ImagesGallery images={images} onPress={setActiveGalleryIndex} />

            <ScrollView style={styles.content}>
                <ThemedText fontSize={24} fontWeight={'medium'}>
                    {name}
                </ThemedText>
                <Row alignItems={'center'} space={1}>
                    <Icon name={'place'} color={isDarkMode ? '#fff' : '#000'} size={20} />
                    <ThemedText fontSize={16}>{country}</ThemedText>
                </Row>

                <ThemedText fontSize={16} marginTop={4}>
                    {description}
                </ThemedText>
            </ScrollView>
        </ThemedScreenContainer>
    );
};
const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: Dimensions.get('window').height * 0.45,
        ...GenericStyles.shadow,
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    content: {
        height: Dimensions.get('window').height * 0.5,
        padding: 16,
    },
    favorite: {
        position: 'absolute',
        right: 16,
        padding: 8,
    },
});
