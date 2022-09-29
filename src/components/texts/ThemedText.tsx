import React from 'react';
import { ITextProps, Text, useColorMode, useTheme } from 'native-base';

export const ThemedText: React.FC<ITextProps> = props => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const textColor = colorMode === 'dark' ? colors.dark[900] : 'black';

    return (
        <Text color={textColor} fontWeight={props.fontWeight || 'medium'} {...props}>
            {props.children}
        </Text>
    );
};
