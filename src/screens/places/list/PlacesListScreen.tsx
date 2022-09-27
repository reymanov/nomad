import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Sizes } from '@constants/index';
import { Places } from '@constants/data';
import { ThemedText } from '@components/texts';
import { ThemedScreenContainer } from '@containers/index';
import { PlaceButton as NewPlaceButton, PlacesList } from './components';
import { PlacesToggle } from '@components/PlacesToggle';
import { placesActions } from '@store/places';
import { useNavigation } from '@react-navigation/native';
import { PLACES_STACK } from '@navigation/types';
import { useColorMode } from 'native-base';

export const PlacesListScreen: React.FC = () => {
    const dispatch = useDispatch();
    const { colorMode } = useColorMode();
    const { navigate } = useNavigation<any>();

    const isDarkMode = colorMode === 'dark';

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
                    <NewPlaceButton
                        icon={
                            <Icon
                                name={'add-circle'}
                                size={32}
                                color={isDarkMode ? '#fff' : '#000'}
                            />
                        }
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
