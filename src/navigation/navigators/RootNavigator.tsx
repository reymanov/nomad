import React, { useRef } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useSelectIsAuthenticated } from '@store/session/useSessionSelectors';
import { TabNavigator } from './TabNavigator';
import { AuthStack } from '@navigation/stacks';
import { logScreenView } from '@src/utils/Analytics';

export const RootNavigator: React.FC = () => {
    const isAuthenticated = useSelectIsAuthenticated();
    const navigationRef = useNavigationContainerRef();
    const routeNameRef = useRef<string>();

    return (
        <SafeAreaProvider>
            <NavigationContainer
                ref={navigationRef}
                onReady={() =>
                    (routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name)
                }
                onStateChange={async () => {
                    const previousRouteName = routeNameRef.current;
                    const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name;
                    if (currentRouteName && previousRouteName !== currentRouteName) {
                        await logScreenView(currentRouteName);
                    }
                    routeNameRef.current = currentRouteName;
                }}
            >
                {isAuthenticated ? <TabNavigator /> : <AuthStack />}
            </NavigationContainer>
        </SafeAreaProvider>
    );
};
