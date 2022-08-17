import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MAP_STACK, TMapStack } from '@navigation/types';
import MapScreen from '@screens/map/MapScreen';

export const MapStack: React.FC = () => {
    const MapStack = createNativeStackNavigator<TMapStack>();

    return (
        <MapStack.Navigator screenOptions={{ headerShown: false }}>
            <MapStack.Screen name={MAP_STACK.Map} component={MapScreen} />
        </MapStack.Navigator>
    );
};
