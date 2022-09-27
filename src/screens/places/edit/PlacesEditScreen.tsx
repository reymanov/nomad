import React from 'react';
import { StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { Sizes } from '@constants/index';
import { ThemedText } from '@components/texts';
import { ThemedScreenContainer } from '@containers/index';
import { PLACES_STACK, TPlacesStack } from '@navigation/types';

type TRoute = RouteProp<TPlacesStack, PLACES_STACK.PlacesEdit>;

export const PlacesEditScreen: React.FC = () => {
    const route = useRoute<TRoute>();
    const isEditMode = !!route.params?.id;

    return (
        <ThemedScreenContainer style={styles.container}>
            <ThemedText fontSize={36} fontWeight={'medium'}>
                {isEditMode ? 'Edit place' : 'New place'}
            </ThemedText>
        </ThemedScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Sizes.md,
    },
});
