import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors, Sizes } from '@constants/index';
import { Places } from '@constants/data';
import { ThemedText } from '@components/texts';
import { ThemedScreenContainer } from '@containers/index';
import { PlacesList } from './components';
import { PlacesToggle } from '@components/PlacesToggle';
import { placesActions } from '@store/places';
import { PLACES_STACK } from '@navigation/types';
import { IconButton } from '@src/components/buttons';

export const PlacesListScreen: React.FC = () => {
    const dispatch = useDispatch();
    const { navigate } = useNavigation<any>();

    useEffect(() => {
        dispatch(placesActions.setPlaces(Places));
    }, []);

    return (
        <ThemedScreenContainer>
            <View style={styles.header}>
                <View style={styles.row}>
                    <ThemedText fontSize={36} fontWeight={'medium'}>
                        Places
                    </ThemedText>

                    <IconButton
                        icon={'add-circle-outline'}
                        size={32}
                        themed={true}
                        onPress={() => navigate(PLACES_STACK.PlacesEdit)}
                    />
                </View>

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
