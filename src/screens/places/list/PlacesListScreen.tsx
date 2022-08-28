import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Sizes } from '@constants/index';
import { ThemedText } from '@components/texts';
import { ThemedScreenContainer } from '@containers/index';
import { PlacesList } from './components/PlacesList';
import { PlacesToggle } from '@components/PlacesToggle';

export const PlacesListScreen: React.FC = () => {
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
