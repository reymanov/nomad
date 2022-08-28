import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import { Sizes } from '@constants/index';
import { Places } from '@constants/data';
import { ThemedText } from '@components/texts';
import { ThemedScreenContainer } from '@containers/index';
import { PlacesList } from './components/PlacesList';
import { PlacesToggle } from '@components/PlacesToggle';
import { placesActions } from '@store/places';

export const PlacesListScreen: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(placesActions.setPlaces(Places));
    }, []);

    return (
        <ThemedScreenContainer>
            <View style={styles.header}>
                <ThemedText fontSize={36} fontWeight={'medium'}>
                    Places
                </ThemedText>
                <PlacesToggle style={styles.toggle} />
            </View>
            <PlacesList />
        </ThemedScreenContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: Sizes.lg,
        paddingHorizontal: Sizes.md,
    },
    toggle: {
        marginTop: Sizes.md,
    },
});
