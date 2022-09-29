import React from 'react';
import { useColorMode } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { HITSLOP } from '@src/constants';

interface Props {
    style?: StyleProp<ViewStyle>;
    onPress: () => void;
}

export const EditPlaceButton: React.FC<Props> = ({ style, onPress }) => {
    const { colorMode } = useColorMode();

    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]} hitSlop={HITSLOP}>
            <Icon
                name={'create-outline'}
                size={26}
                color={colorMode === 'dark' ? '#fff' : '#000'}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: -4,
        right: 80,
        zIndex: 1,
    },
});
