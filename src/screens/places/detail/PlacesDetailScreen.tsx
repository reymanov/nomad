import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { HStack, Row, Text, useColorMode } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, Image, StyleSheet, Pressable, View, Alert, Share } from 'react-native';

import { IconButton } from '@components/buttons';
import { GenericStyles } from '@constants/styles';
import { triggerHapticFeedback } from '@utils/Haptic';
import { ImagesGallery } from './components/ImagesGallery';
import { PLACES_STACK, TPlacesStack } from '@navigation/types';
import { ThemedScreenContainer } from '@components/containers';
import { placesActions, useSelectPlaceById } from '@store/places';

type TRoute = RouteProp<TPlacesStack, PLACES_STACK.PlacesDetail>;

export const PlacesDetailScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<TRoute>();
    const { colorMode } = useColorMode();
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();

    const [lastTap, setLastTap] = useState<number | null>(null);
    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
    const place = useSelectPlaceById(route.params.id);

    const isDarkMode = colorMode === 'dark';

    if (!place) return null;
    const { id, name, country, description, images, isFavorite } = place;

    const toggleFavorite = () => {
        dispatch(placesActions.setFavorite({ id, isFavorite: !isFavorite }));
        triggerHapticFeedback('effectDoubleClick');
    };

    const onDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;

        if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) toggleFavorite();
        else setLastTap(now);
    };

    const onDelete = () => {
        Alert.alert(`Delete ${name} `, 'Are you sure you want to delete this place?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    navigation.goBack();
                    dispatch(placesActions.deletePlace(id));

                    setTimeout(() => {
                        Alert.alert('Place deleted', `${name} has been deleted successfully`);
                    }, 200);
                },
            },
        ]);
    };

    const onShare = async () => {
        try {
            await Share.share({
                message: `Check out ${name}, It's amazing!`,
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <ThemedScreenContainer useSafeArea={false}>
            <View style={[styles.header, { top: insets.top }]}>
                <IconButton
                    size={30}
                    name={'chevron-back'}
                    style={styles.back}
                    onPress={() => navigation.goBack()}
                />

                <IconButton
                    size={28}
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    onPress={toggleFavorite}
                />
            </View>

            <Pressable onPress={onDoubleTap} style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: images[activeGalleryIndex] }} />
            </Pressable>

            <ImagesGallery images={images} onPress={setActiveGalleryIndex} />

            <View style={styles.content}>
                <Animated.View entering={FadeInDown.duration(500)}>
                    <HStack
                        style={[styles.controls, { right: images.length === 1 ? 0 : 80 }]}
                        space={4}
                    >
                        <IconButton themed={true} name={'share-outline'} onPress={onShare} />
                        <IconButton
                            themed={true}
                            name={'create-outline'}
                            onPress={() => navigation.navigate(PLACES_STACK.PlacesEdit, { id })}
                        />
                        <IconButton themed={true} name={'trash-outline'} onPress={onDelete} />
                    </HStack>

                    <Text fontSize={24} fontWeight={'medium'}>
                        {name}
                    </Text>
                    <Row alignItems={'center'} space={1}>
                        <Icon name={'location'} color={isDarkMode ? '#fff' : '#000'} size={20} />
                        <Text fontSize={16}>{country}</Text>
                    </Row>

                    <Text fontSize={16} marginTop={4}>
                        {description}
                    </Text>
                </Animated.View>
            </View>
        </ThemedScreenContainer>
    );
};
const styles = StyleSheet.create({
    imageContainer: {
        zIndex: 0,
        width: '100%',
        height: Dimensions.get('window').height * 0.45,
        ...GenericStyles.shadow,
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    header: {
        zIndex: 1,
        width: Dimensions.get('window').width - 32,
        marginHorizontal: 16,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    back: {
        left: -6,
    },
    content: {
        height: Dimensions.get('window').height * 0.5,
        padding: 16,
        paddingBottom: 48,
    },
    controls: {
        position: 'absolute',
        zIndex: 1,
    },
});
