import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '@screens/settings/SettingsScreen';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { useColorMode, useTheme } from 'native-base';
import { HomeStack, MapStack } from '../stacks';

const Tab = createBottomTabNavigator();

export const TabNavigator: React.FC = () => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const isDarkMode = colorMode === 'dark';
    const bgColor = isDarkMode ? colors.dark[50] : colors.dark[800];
    const textColor = isDarkMode ? colors.dark[800] : colors.cyan[700];

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: textColor,
                tabBarInactiveTintColor: colors.gray[400],
                tabBarStyle: {
                    backgroundColor: bgColor,
                    borderTopWidth: 0,
                },
                // tabBarIcon: ({ focused }) => {
                //     let iconName = '';
                //     let iconSize = 28;
                //     let iconColor = focused ? textColor : colors.gray[500];

                //     if (route.name === 'Home') iconName = 'home';
                //     if (route.name === 'Settings') iconName = 'gear';
                //     if (route.name === 'Map') (iconName = 'map'), (iconSize = 20);

                //     return <Icon name={iconName} size={iconSize} color={iconColor} />;
                // },
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Map" component={MapStack} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};
