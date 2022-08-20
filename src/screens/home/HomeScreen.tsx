import React from 'react';
import { StyleSheet } from 'react-native';
import { useColorMode, useTheme } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@components/texts';

const HomeScreen: React.FC = () => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <ThemedText>Home</ThemedText>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
});

export default HomeScreen;
