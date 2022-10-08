import React from 'react';
import { AuthStack } from '@navigation/stacks';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

import { TabNavigator } from './TabNavigator';
import { useSelectIsAuthenticated } from '@store/session/useSessionSelectors';

export const RootNavigator: React.FC = () => {
    const isAuthenticated = useSelectIsAuthenticated();
    const navigationRef = useNavigationContainerRef();

    return (
        <NavigationContainer ref={navigationRef}>
            {isAuthenticated ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
};
