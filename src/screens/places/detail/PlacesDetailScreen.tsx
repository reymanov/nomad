import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, useColorMode } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, Image, StyleSheet, TouchableOpacity, Pressable, View } from 'react-native';

import { ThemedText } from '@components/texts';
import { GenericStyles, HITSLOP } from '@constants/index';
import { ThemedScreenContainer } from '@containers/index';
import { ImagesGallery } from './components/ImagesGallery';
import { PLACES_STACK, TPlacesStack } from '@navigation/types';
import { placesActions, useSelectPlaceById } from '@store/places';
import { triggerHapticFeedback } from '@utils/Haptic';
import { PlaceButton as EditPlaceButton } from '../list/components';

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
    const { id, name, country, description, images, isFavorite, position } = place;

    const toggleFavorite = () => {
        dispatch(placesActions.setFavorite({ id, isFavorite: !isFavorite }));
        triggerHapticFeedback('effectDoubleClick');
    };

    const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
            toggleFavorite();
        } else {
            setLastTap(now);
        }
    };

    return (
        <ThemedScreenContainer useSafeArea={false}>
            <Pressable onPress={handleDoubleTap} style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: images[activeGalleryIndex] }} />
            </Pressable>
            <View style={[styles.header, { top: insets.top }]}>
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => navigation.goBack()}
                    hitSlop={HITSLOP}
                >
                    <Icon name={'chevron-back'} color={'#fff'} size={30} />
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleFavorite} hitSlop={HITSLOP}>
                    <Icon name={isFavorite ? 'heart' : 'heart-outline'} color={'#fff'} size={28} />
                </TouchableOpacity>
            </View>

            <ImagesGallery images={images} onPress={setActiveGalleryIndex} />

            <View style={styles.content}>
                <Animated.View entering={FadeInDown.duration(500)}>
                    <EditPlaceButton
                        style={styles.edit}
                        icon={
                            <Icon name={'create'} size={26} color={isDarkMode ? '#fff' : '#000'} />
                        }
                        onPress={() => navigation.navigate(PLACES_STACK.PlacesEdit, { id })}
                    />

                    <ThemedText fontSize={24} fontWeight={'medium'}>
                        {name}
                    </ThemedText>
                    <Row alignItems={'center'} space={1}>
                        <Icon name={'location'} color={isDarkMode ? '#fff' : '#000'} size={20} />
                        <ThemedText fontSize={16}>{country}</ThemedText>
                    </Row>

                    <ThemedText fontSize={16} marginTop={4}>
                        {description}
                    </ThemedText>
                </Animated.View>
            </View>
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
    header: {
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
    button: {
        flexDirection: 'row',
    },
    edit: {
        position: 'absolute',
        top: 0,
        right: 80,
        zIndex: 1,
    },
});
