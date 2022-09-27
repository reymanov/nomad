import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { PlacesListItem } from './PlacesListItem';

import { Sizes } from '@constants/index';
import { useSelectActiveVisitType, useSelectPlaces } from '@store/places';
import { useNavigation } from '@react-navigation/native';
import { PLACES_STACK } from '@navigation/types';

export const PlacesList: React.FC = () => {
    const places = useSelectPlaces();
    const visitType = useSelectActiveVisitType();
    const showVisited = visitType === 'VISITED';
    const { navigate } = useNavigation<any>();

    return (
        <ScrollView style={styles.container}>
            {places.map(({ id, name, country, images, isVisited, isFavorite }) => {
                if ((showVisited && !isVisited) || (!showVisited && isVisited)) return null;
                return (
                    <PlacesListItem
                        key={id}
                        name={name}
                        country={country}
                        image={images[0]}
                        isFavorite={isFavorite}
                        onPress={() => navigate(PLACES_STACK.PlacesDetail, { id })}
                    />
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Sizes.xxs,
        paddingTop: Sizes.xxs,
        paddingHorizontal: Sizes.md,
    },
});
