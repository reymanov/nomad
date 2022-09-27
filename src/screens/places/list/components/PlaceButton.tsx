import React, { ReactElement } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { HITSLOP, Sizes } from '@src/constants';
import { ThemedText } from '@components/texts';

interface Props {
    label?: string;
    icon: ReactElement;
    style?: StyleProp<ViewStyle>;
    onPress: () => void;
}

export const PlaceButton: React.FC<Props> = ({ label, icon, style, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]} hitSlop={HITSLOP}>
            <ThemedText fontSize={16} fontWeight={'medium'} style={styles.label}>
                {label}
            </ThemedText>
            {icon}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginRight: Sizes.xxxs,
    },
});
