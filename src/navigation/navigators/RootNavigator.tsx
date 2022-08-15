import React from 'react';
// import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

// import { useSelectIsAuthenticated } from '@store/session/useSessionSelectors';
import { TabNavigator } from './TabNavigator';
import { AuthStack } from '@navigation/stacks';
// import { store } from '@src/store';

export const RootNavigator: React.FC = () => {
    // const isAuthenticated = useSelectIsAuthenticated();
    const isAuthenticated = false;

    console.log('isAuthenticated', isAuthenticated);

    return (
        // <Provider store={store}>
        <NavigationContainer>
            {isAuthenticated ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
        // </Provider>
    );
};
