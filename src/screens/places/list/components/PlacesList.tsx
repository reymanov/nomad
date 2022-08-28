import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { PlacesListItem } from './PlacesListItem';

import { Sizes } from '@constants/index';
import { Places } from '@constants/data';
import { useSelectActiveVisitType } from '@store/places';
import { useNavigation } from '@react-navigation/native';
import { PLACES_STACK, TPlacesStack } from '@src/navigation/types';

export const PlacesList: React.FC = () => {
    const visitType = useSelectActiveVisitType();
    const showVisited = visitType === 'VISITED';
    const { navigate } = useNavigation<any>();

    return (
        <ScrollView style={styles.container}>
            {Places.map(({ id, name, country, images, visited, favourite }) => {
                if ((showVisited && !visited) || (!showVisited && visited)) return null;
                return (
                    <PlacesListItem
                        key={id}
                        name={name}
                        country={country}
                        image={images[0]}
                        isFavorite={favourite}
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
        marginTop: Sizes.md,
        paddingHorizontal: Sizes.md,
    },
});
