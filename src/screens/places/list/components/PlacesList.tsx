import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PLACES_STACK } from '@navigation/types';

import { Sizes } from '@constants/theme';
import { PlacesListItem } from './PlacesListItem';
import { useSelectActiveVisitType, useSelectPlaces } from '@store/places';

export const PlacesList: React.FC = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const visitType = useSelectActiveVisitType();
    const places = useSelectPlaces();

    const { navigate } = useNavigation<any>();
    const showVisited = visitType === 'VISITED';

    const onRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 500);
    };

    const filteredPlaces = useMemo(
        () => places.filter(place => place.isVisited === showVisited),
        [places, showVisited]
    );

    return (
        <FlatList
            data={filteredPlaces}
            style={[styles.container, isRefreshing && { opacity: 0.5 }]}
            renderItem={({ item }) => {
                const { id, name, country, images, isFavorite } = item;
                console.log(images);
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
            }}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Sizes.xs,
        paddingHorizontal: Sizes.md,
    },
});
