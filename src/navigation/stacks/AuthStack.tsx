import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthScreen, ForgotPasswordScreen } from '@screens/auth';
import { AUTH_STACK, TAuthStack } from '@navigation/types';

export const AuthStack: React.FC = () => {
    const Stack = createNativeStackNavigator<TAuthStack>();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={AUTH_STACK.Auth} component={AuthScreen} />
            <Stack.Screen
                name={AUTH_STACK.ForgotPassword}
                component={ForgotPasswordScreen}
                options={{
                    presentation: 'modal',
                }}
            />
        </Stack.Navigator>
    );
};
