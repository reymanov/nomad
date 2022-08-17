import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HOME_STACK, THomeStack } from '@navigation/types';
import HomeScreen from '@screens/home/HomeScreen';

export const HomeStack: React.FC = () => {
    const Stack = createNativeStackNavigator<THomeStack>();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={HOME_STACK.Home} component={HomeScreen} />
        </Stack.Navigator>
    );
};
