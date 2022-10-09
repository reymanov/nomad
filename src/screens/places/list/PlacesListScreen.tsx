import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { HStack, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { Sizes } from '@constants/theme';
import { Places } from '@constants/data';
import { ThemedScreenContainer } from '@components/containers';
import { PlacesList } from './components';
import { PlacesToggle } from '@components/others';
import { placesActions } from '@store/places';
import { PLACES_STACK } from '@navigation/types';
import { IconButton } from '@components/buttons';

export const PlacesListScreen: React.FC = () => {
    const dispatch = useDispatch();
    const { navigate } = useNavigation<any>();

    useEffect(() => {
        dispatch(placesActions.setPlaces(Places));
    }, []);

    return (
        <ThemedScreenContainer>
            <View style={styles.header}>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <Text fontSize={36} fontWeight={'medium'}>
                        Places
                    </Text>

                    <IconButton
                        size={32}
                        themed={true}
                        name={'add-circle-outline'}
                        onPress={() => navigate(PLACES_STACK.PlacesEdit)}
                    />
                </HStack>

                <PlacesToggle style={styles.toggle} />
            </View>
            <PlacesList />
        </ThemedScreenContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: Sizes.lg,
        marginBottom: Sizes.md,
        paddingHorizontal: Sizes.md,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    toggle: {
        marginTop: Sizes.md,
    },
});
