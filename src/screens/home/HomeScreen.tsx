import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useColorMode, useTheme } from 'native-base';
import { ThemedText } from '@components/texts';
import { ScreenContainer } from '@containers/index';
import { Sizes } from '@constants/index';
import { DestinationsList } from './components/DestinationsList';
import { DestinationsToggle } from '@components/DestinationsToggle';

const HomeScreen: React.FC = () => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];

    return (
        <ScreenContainer style={{ backgroundColor }}>
            <View style={styles.header}>
                <ThemedText fontSize={36} fontWeight={'medium'}>
                    Home
                </ThemedText>

                <DestinationsToggle style={styles.toggle} />
            </View>
            <DestinationsList />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: Sizes.lg,
        paddingHorizontal: Sizes.md,
    },
    toggle: {
        marginTop: Sizes.md,
    },
});

export default HomeScreen;
