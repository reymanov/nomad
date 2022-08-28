import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedScreenContainer } from '@containers/index';
import { NavigateBackButton } from '@components/buttons/NavigateBackButton';

export const PlacesDetailScreen: React.FC = () => {
    return (
        <ThemedScreenContainer>
            <NavigateBackButton />
        </ThemedScreenContainer>
    );
};

const styles = StyleSheet.create({});
