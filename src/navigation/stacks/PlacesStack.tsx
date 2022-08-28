import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PLACES_STACK, TPlacesStack } from '@navigation/types';
import { PlacesDetailScreen, PlacesListScreen } from '@screens/places';

export const PlacesStack: React.FC = () => {
    const Stack = createNativeStackNavigator<TPlacesStack>();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={PLACES_STACK.PlacesList} component={PlacesListScreen} />
            <Stack.Screen name={PLACES_STACK.PlacesDetail} component={PlacesDetailScreen} />
        </Stack.Navigator>
    );
};
