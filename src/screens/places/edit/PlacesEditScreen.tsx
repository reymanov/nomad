import React, { useState } from 'react';
import { HStack, Input, Stack, Text, useColorMode, useTheme, VStack } from 'native-base';
import { Keyboard, Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';

import { IconButton } from '@components/buttons';
import { PlacesToggle } from '@components/others';
import { ImagesArea } from './components/ImagesArea';
import { Colors, Sizes, HITSLOP } from '@constants/theme';
import { ThemedScreenContainer } from '@components/containers';
import { PLACES_STACK, TPlacesStack } from '@navigation/types';
import { placesActions, TPlace, useSelectPlaceById } from '@store/places';

type TRoute = RouteProp<TPlacesStack, PLACES_STACK.PlacesEdit>;

export const PlacesEditScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<TRoute>();
    const place = useSelectPlaceById(route.params?.id);
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const dispatch = useDispatch();

    const backgroundColor = colorMode === 'dark' ? colors.gray[800] : colors.gray[200];
    const isEditMode = !!route.params?.id;

    const [name, setName] = useState<string>(place?.name || '');
    const [country, setCountry] = useState<string>(place?.country || '');
    const [description, setDescription] = useState<string>(place?.description || '');
    const [images, setImages] = useState<string[] | []>(place?.images || []);
    const [isVisited, setIsVisited] = useState<boolean>(place?.isVisited || true);
    const [isFavorite, setIsFavorite] = useState<boolean>(place?.isFavorite || false);

    const onImageAdd = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                selectionLimit: 3 - images.length,
                includeBase64: true,
            });

            if (result.didCancel || !result.assets) return;

            const newImages = result.assets.map(asset => `data:image;base64,${asset.base64}`);
            setImages([...images, ...newImages]);
        } catch (e) {
            console.error(e);
        }
    };

    const onImageRemove = (img: string) => {
        setImages(images.filter((image: string) => image !== img));
    };

    const onSave = () => {
        const newPlace: TPlace = {
            id: route.params?.id || Date.now(),
            name,
            country,
            description,
            images,
            isVisited,
            isFavorite,
            position: place?.position || { latitude: 0, longitude: 0 },
        };

        if (isEditMode) dispatch(placesActions.updatePlace(newPlace));
        else dispatch(placesActions.addPlace(newPlace));
        navigation.goBack();
    };

    return (
        <ThemedScreenContainer>
            <Stack style={styles.header}>
                <VStack>
                    <HStack alignItems={'center'} justifyContent={'space-between'}>
                        <Text fontSize={36}>{isEditMode ? 'Edit place' : 'New place'}</Text>
                        <TouchableOpacity hitSlop={HITSLOP} onPress={onSave}>
                            <Text fontSize={18} fontWeight={'medium'} color={Colors.primary}>
                                Save
                            </Text>
                        </TouchableOpacity>
                    </HStack>
                    <Text fontSize={16} fontWeight={'normal'}>
                        {isEditMode
                            ? 'Edit informations about existing destination'
                            : 'Fill in informations about new destination'}
                    </Text>
                </VStack>
            </Stack>

            <Pressable style={styles.container} onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollview}>
                    <PlacesToggle
                        style={styles.toggle}
                        active={isVisited ? 'VISITED' : 'TO_VISIT'}
                        onChange={() => {
                            setIsVisited(!isVisited);
                        }}
                    />

                    <VStack space={4}>
                        <Stack>
                            <Text>Name</Text>
                            <Input
                                value={name}
                                onChangeText={setName}
                                size="lg"
                                variant={'filled'}
                                style={{ backgroundColor }}
                            />
                        </Stack>
                        <Stack>
                            <Text>Country</Text>
                            <Input
                                value={country}
                                onChangeText={setCountry}
                                size="lg"
                                variant={'filled'}
                                style={{ backgroundColor }}
                            />
                        </Stack>
                        <Stack>
                            <Text>Description</Text>
                            <Input
                                value={description}
                                onChangeText={setDescription}
                                h={'32'}
                                size={'lg'}
                                maxLength={240}
                                variant={'filled'}
                                multiline={true}
                                style={{ backgroundColor }}
                            />
                            <Text style={styles.count}>{description.length}/240</Text>
                        </Stack>
                        <HStack style={styles.row}>
                            <Text>Favorite</Text>
                            <IconButton
                                size={28}
                                name={isFavorite ? 'heart' : 'heart-outline'}
                                onPress={() => setIsFavorite(!isFavorite)}
                            />
                        </HStack>
                        <Stack>
                            <Text>Images</Text>
                            <ImagesArea
                                images={images}
                                onAdd={onImageAdd}
                                onRemove={onImageRemove}
                            />
                            <Text style={styles.count}>{images.length}/3</Text>
                        </Stack>
                    </VStack>
                </ScrollView>
            </Pressable>
        </ThemedScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollview: {
        flex: 1,
        marginHorizontal: Sizes.md,
    },
    header: {
        paddingHorizontal: Sizes.md,
    },
    toggle: {
        marginTop: 24,
        marginBottom: 16,
    },
    row: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    count: {
        alignSelf: 'flex-end',
    },
});
