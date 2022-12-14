import React from 'react';
import { useColorMode, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PlacesStack, MapStack } from '@navigation/stacks';
import { SettingsStack } from '@navigation/stacks/SettingsStack';

const Tab = createBottomTabNavigator();

export const TabNavigator: React.FC = () => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];
    const textColor = isDarkMode ? colors.dark[900] : colors.dark[100];

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: textColor,
                tabBarInactiveTintColor: colors.gray[400],
                tabBarStyle: {
                    backgroundColor,
                    borderTopWidth: 0,
                },
                tabBarIcon: ({ focused }) => {
                    let iconName = '';
                    let iconSize = 24;
                    let iconColor = focused ? textColor : colors.dark[400];

                    if (route.name === 'PlacesTab') iconName = 'earth';
                    if (route.name === 'MapTab') iconName = 'map';
                    if (route.name === 'SettingsTab') iconName = 'settings';

                    return <Icon name={iconName} size={iconSize} color={iconColor} />;
                },
            })}
        >
            <Tab.Screen name="PlacesTab" component={PlacesStack} options={{ title: 'Places' }} />
            <Tab.Screen name="MapTab" component={MapStack} options={{ title: 'Map' }} />
            <Tab.Screen
                name="SettingsTab"
                component={SettingsStack}
                options={{ title: 'Settings' }}
            />
        </Tab.Navigator>
    );
};
