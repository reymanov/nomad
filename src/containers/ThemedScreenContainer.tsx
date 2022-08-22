import { useColorMode, useTheme } from 'native-base';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ScreenContainer } from './ScreenContainer';

interface Props {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

export const ThemedScreenContainer: React.FC<Props> = ({ style, children }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];

    return <ScreenContainer style={[{ backgroundColor }, style]}>{children}</ScreenContainer>;
};
