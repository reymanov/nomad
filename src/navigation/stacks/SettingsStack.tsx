import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '@src/screens/settings/SettingsScreen';
import { SETTINGS_STACK, TSettingsStack } from '../types';

export const SettingsStack: React.FC = () => {
    const SettingsStack = createNativeStackNavigator<TSettingsStack>();

    return (
        <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
            <SettingsStack.Screen name={SETTINGS_STACK.Settings} component={SettingsScreen} />
        </SettingsStack.Navigator>
    );
};
