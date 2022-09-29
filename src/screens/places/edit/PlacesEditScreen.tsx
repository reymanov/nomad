import React, { useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { Colors, Sizes } from '@constants/index';
import { ThemedText } from '@components/texts';
import { ThemedScreenContainer } from '@containers/index';
import { PLACES_STACK, TPlacesStack } from '@navigation/types';
import {
    FormControl,
    HStack,
    Input,
    Stack,
    Text,
    TextArea,
    useColorMode,
    useTheme,
    VStack,
} from 'native-base';
import { PlacesToggle } from '@components/PlacesToggle';
import { IconButton } from '@components/buttons';
import { ImagesArea } from './components/ImagesArea';
import { HITSLOP } from '@src/constants';
import { useSelectPlaceById } from '@store/places';

type TRoute = RouteProp<TPlacesStack, PLACES_STACK.PlacesEdit>;

export const PlacesEditScreen: React.FC = () => {
    const route = useRoute<TRoute>();
    const placeId = route.params?.id;
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const isEditMode = !!placeId;
    const isDarkMode = colorMode === 'dark';

    const place = useSelectPlaceById(placeId);

    const [isVisited, setIsVisited] = useState<any>(place?.isVisited || true);
    // const [isFavorite, setIsFavorite] = useState<any>(place?.isFavorite || false);
    const [images, setImages] = useState<any>(place?.images || []);
    const [descCount, setDescCount] = useState(0);

    return (
        <ThemedScreenContainer>
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>
                <Stack style={styles.header}>
                    <VStack>
                        <HStack alignItems={'center'} justifyContent={'space-between'}>
                            <ThemedText fontSize={36}>
                                {isEditMode ? 'Edit place' : 'New place'}
                            </ThemedText>
                            <TouchableOpacity hitSlop={HITSLOP}>
                                <Text fontSize={18} fontWeight={'medium'} color={Colors.primary}>
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

                <ScrollView contentContainerStyle={styles.scrollview}>
                    <PlacesToggle
                        active={isVisited ? 'VISITED' : 'TO_VISIT'}
                        onChange={() => setIsVisited(!isVisited)}
                        style={styles.toggle}
                    />
                    <FormControl>
                        <VStack space={4}>
                            <Stack>
                                <FormControl.Label>Name</FormControl.Label>
                                <Input
                                    size="lg"
                                    defaultValue={place?.name}
                                    variant={'filled'}
                                    style={!isDarkMode && { backgroundColor: colors.gray['200'] }}
                                />
                            </Stack>
                            <Stack>
                                <FormControl.Label>Country</FormControl.Label>
                                <Input
                                    size="lg"
                                    defaultValue={place?.country}
                                    variant={'filled'}
                                    style={!isDarkMode && { backgroundColor: colors.gray['200'] }}
                                />
                            </Stack>
                            <Stack>
                                <FormControl.Label>Description</FormControl.Label>
                                <TextArea
                                    h={'32'}
                                    size="lg"
                                    maxLength={240}
                                    variant={'filled'}
                                    autoCompleteType={false}
                                    defaultValue={place?.description}
                                    onChangeText={text => setDescCount(text.length)}
                                    style={!isDarkMode && { backgroundColor: colors.gray['200'] }}
                                />
                                <FormControl.Label alignSelf={'flex-end'}>
                                    {descCount}/240
                                </FormControl.Label>
                            </Stack>
                            <Stack>
                                <HStack justifyContent={'space-between'}>
                                    <FormControl.Label>Images</FormControl.Label>
                                    <IconButton
                                        icon={'add'}
                                        size={26}
                                        themed
                                        onPress={() =>
                                            setImages([...images, Math.random().toString()])
                                        }
                                    />
                                </HStack>
                                <ImagesArea
                                    images={images}
                                    onRemove={img => setImages(images.filter(i => i !== img))}
                                />
                            </Stack>

                            {/* <HStack justifyContent={'space-between'}>
                                <FormControl.Label>Favourite</FormControl.Label>
                                <IconButton
                                    onPress={() => setIsFavorite(!isFavorite)}
                                    icon={isFavorite ? 'heart' : 'heart-outline'}
                                    themed
                                    size={28}
                                />
                            </HStack> */}
                        </VStack>
                    </FormControl>
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
        marginVertical: 16,
    },
    saveButton: {
        padding: 8,
    },
});
