import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '@screens/map/MapScreen';

export const MapStack: React.FC = () => {
    const MapStack = createNativeStackNavigator();

    return (
        <MapStack.Navigator screenOptions={{ headerShown: false }}>
            <MapStack.Screen name="Map" component={MapScreen} />
        </MapStack.Navigator>
    );
};
