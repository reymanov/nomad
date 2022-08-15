import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useSelectIsAuthenticated } from '@store/session/useSessionSelectors';
import { TabNavigator } from './TabNavigator';
import { AuthStack } from '@navigation/stacks';

export const RootNavigator: React.FC = () => {
    const isAuthenticated = useSelectIsAuthenticated();

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {isAuthenticated ? <TabNavigator /> : <AuthStack />}
            </NavigationContainer>
        </SafeAreaProvider>
    );
};
