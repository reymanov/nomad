import React, { useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

import {
    FormControl,
    HStack,
    Input,
    Stack,
    Text,
    useColorMode,
    useTheme,
    VStack,
} from 'native-base';

import { ThemedText } from '@components/texts';
import { PlacesToggle } from '@components/others';
import { placesActions, TPlace, useSelectPlaceById } from '@store/places';
import { ImagesArea } from './components/ImagesArea';
import { Colors, Sizes, HITSLOP } from '@constants/theme';
import { ThemedScreenContainer } from '@components/containers';
import { PLACES_STACK, TPlacesStack } from '@navigation/types';

type TRoute = RouteProp<TPlacesStack, PLACES_STACK.PlacesEdit>;

export const PlacesEditScreen: React.FC = () => {
    const route = useRoute<TRoute>();
    const placeId = route.params?.id;
    const place = useSelectPlaceById(placeId);
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const isEditMode = !!placeId;
    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.gray[800] : colors.gray[200];

    const [images, setImages] = useState<[] | string[]>(place?.images || []);
    const [isVisited, setIsVisited] = useState<boolean>(place?.isVisited || true);
    const [descriptionCount, setDescriptionCount] = useState(place?.description.length || 0);

    const initialFormValues: Partial<TPlace> = {
        name: place?.name || '',
        country: place?.country || '',
        description: place?.description || '',
    };

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

    const onSave = (values: Partial<TPlace>) => {
        const place: any = { id: Date.now(), ...values, images, isVisited };

        if (placeId) dispatch(placesActions.updatePlace(place));
        else dispatch(placesActions.addPlace(place));

        navigation.goBack();
    };

    return (
        <ThemedScreenContainer>
            <Formik initialValues={initialFormValues} onSubmit={onSave}>
                {({ handleChange, handleSubmit, values }) => (
                    <>
                        <Stack style={styles.header}>
                            <VStack>
                                <HStack alignItems={'center'} justifyContent={'space-between'}>
                                    <ThemedText fontSize={36}>
                                        {isEditMode ? 'Edit place' : 'New place'}
                                    </ThemedText>
                                    <TouchableOpacity hitSlop={HITSLOP} onPress={handleSubmit}>
                                        <Text
                                            fontSize={18}
                                            fontWeight={'medium'}
                                            color={Colors.primary}
                                        >
                                            Save
                                        </Text>
                                    </TouchableOpacity>
                                </HStack>
                                <ThemedText fontSize={16} fontWeight={'normal'}>
                                    {isEditMode
                                        ? 'Edit informations about existing destination'
                                        : 'Fill in informations about new destination'}
                                </ThemedText>
                            </VStack>
                        </Stack>

                        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
                            <ScrollView contentContainerStyle={styles.scrollview}>
                                <PlacesToggle
                                    active={isVisited ? 'VISITED' : 'TO_VISIT'}
                                    onChange={() => {
                                        setIsVisited(!isVisited);
                                    }}
                                    style={styles.toggle}
                                />

                                <VStack space={5}>
                                    <Stack>
                                        <FormControl.Label>Name</FormControl.Label>
                                        <Input
                                            value={values.name}
                                            onChangeText={handleChange('name')}
                                            size="lg"
                                            variant={'filled'}
                                            style={{ backgroundColor }}
                                        />
                                    </Stack>
                                    <Stack>
                                        <FormControl.Label>Country</FormControl.Label>
                                        <Input
                                            value={values.country}
                                            onChangeText={handleChange('country')}
                                            size="lg"
                                            variant={'filled'}
                                            style={{ backgroundColor }}
                                        />
                                    </Stack>
                                    <Stack>
                                        <FormControl.Label>Description</FormControl.Label>
                                        <Input
                                            value={values.description}
                                            onChangeText={text => {
                                                handleChange('description')(text);
                                                setDescriptionCount(text.length);
                                            }}
                                            h={'32'}
                                            size={'lg'}
                                            maxLength={240}
                                            variant={'filled'}
                                            multiline={true}
                                            style={{ backgroundColor }}
                                        />
                                        <FormControl.Label alignSelf={'flex-end'}>
                                            {descriptionCount}/240
                                        </FormControl.Label>
                                    </Stack>
                                    <Stack>
                                        <FormControl.Label>Images</FormControl.Label>
                                        <ImagesArea
                                            images={images}
                                            onAdd={onImageAdd}
                                            onRemove={onImageRemove}
                                        />
                                        <FormControl.Label alignSelf={'flex-end'}>
                                            {images.length}/3
                                        </FormControl.Label>
                                    </Stack>
                                </VStack>
                            </ScrollView>
                        </Pressable>
                    </>
                )}
            </Formik>
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
});
