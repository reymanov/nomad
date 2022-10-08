import React from 'react';
import { useColorMode } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Colors, HITSLOP } from '@constants/theme';

interface Props extends TouchableOpacityProps {
    name: string;
    size?: number;
    color?: string;
    themed?: boolean;
    onPress: () => void;
}

export const IconButton: React.FC<Props> = ({
    name,
    size = 26,
    color = Colors.white,
    themed = true,
    onPress,
    ...props
}) => {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';
    const themedColor = isDarkMode ? Colors.white : Colors.black;

    return (
        <TouchableOpacity onPress={onPress} hitSlop={HITSLOP} {...props}>
            <Icon name={name} size={size} color={themed ? themedColor : color} />
        </TouchableOpacity>
    );
};
