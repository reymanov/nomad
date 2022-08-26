import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DestinationsListItem } from './DestinationsListItem';

import { Sizes } from '@constants/index';
import { DESTINATIONS } from '@constants/data';
import { useSelectActiveVisitType } from '@store/destinations';

export const DestinationsList: React.FC = () => {
    const visitType = useSelectActiveVisitType();
    const showVisited = visitType === 'VISITED';

    return (
        <ScrollView style={styles.container}>
            {DESTINATIONS.map(({ id, name, country, images, visited, favourite }) => {
                if ((showVisited && !visited) || (!showVisited && visited)) return null;
                return (
                    <DestinationsListItem
                        key={id}
                        id={id}
                        name={name}
                        country={country}
                        image={images[0]}
                        isFavorite={favourite}
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
