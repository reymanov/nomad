import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

export const ScreenContainer: React.FC<Props> = ({ style, children }) => {
    return <SafeAreaView style={[{ flex: 1 }, style]}>{children}</SafeAreaView>;
};
