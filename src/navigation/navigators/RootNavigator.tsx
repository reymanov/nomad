import React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

import { useSelectIsAuthenticated } from '@store/session/useSessionSelectors';
import { TabNavigator } from './TabNavigator';
import { AuthStack } from '@navigation/stacks';

export const RootNavigator: React.FC = () => {
    const isAuthenticated = useSelectIsAuthenticated();
    const navigationRef = useNavigationContainerRef();

    return (
        <NavigationContainer ref={navigationRef}>
            {isAuthenticated ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
};
