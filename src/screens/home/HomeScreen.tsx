import React from 'react';
import { StyleSheet } from 'react-native';
import { useColorMode, useTheme } from 'native-base';
import { ThemedText } from '@components/texts';
import { PlacesToggle } from '../map/components';
import { ScreenContainer } from '@containers/index';
import { Sizes } from '@constants/index';

const HomeScreen: React.FC = () => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];

    return (
        <ScreenContainer style={{ backgroundColor }}>
            <ThemedText fontSize={36} fontWeight={'medium'}>
                Home
            </ThemedText>

            <PlacesToggle style={styles.toggle} />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    toggle: {
        marginTop: Sizes.md,
    },
});

export default HomeScreen;
