import { Sizes } from '@src/constants';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

export const ScreenContainer: React.FC<Props> = ({ style, children }) => {
    return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Sizes.lg,
        paddingHorizontal: Sizes.md,
    },
});
