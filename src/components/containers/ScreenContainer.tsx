import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface Props {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

export const ScreenContainer: React.FC<Props> = ({ style, children }) => {
    return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});
