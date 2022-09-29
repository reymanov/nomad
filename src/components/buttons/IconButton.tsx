import React from 'react';
import { useColorMode } from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors, HITSLOP } from '@src/constants';

interface Props extends TouchableOpacityProps {
    icon: string;
    size?: number;
    color?: string;
    themed?: boolean;
    onPress: () => void;
}

export const IconButton: React.FC<Props> = ({
    icon,
    size,
    color = Colors.white,
    themed,
    onPress,
    ...props
}) => {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';
    const themedColor = isDarkMode ? Colors.white : Colors.black;

    return (
        <TouchableOpacity onPress={onPress} hitSlop={HITSLOP} {...props}>
            <Icon name={icon} size={size} color={themed ? themedColor : color} />
        </TouchableOpacity>
    );
};
