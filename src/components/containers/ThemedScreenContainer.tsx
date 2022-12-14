import React from 'react';
import { useColorMode, useTheme } from 'native-base';
import { StyleProp, View, ViewStyle } from 'react-native';

import { ScreenContainer } from './ScreenContainer';

interface Props {
    useSafeArea?: boolean;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

export const ThemedScreenContainer: React.FC<Props> = ({ useSafeArea = true, style, children }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];

    if (useSafeArea === false)
        return <View style={[{ backgroundColor, flex: 1 }, style]}>{children}</View>;

    return <ScreenContainer style={[{ backgroundColor }, style]}>{children}</ScreenContainer>;
};
