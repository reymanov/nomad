import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemedText } from '@components/texts';

interface Props {
    title: string;
}

export const MapLayersItem: React.FC<Props> = ({ title }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.title}>
                <ThemedText>{title}</ThemedText>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 168,
        height: 100,
        borderRadius: 8,
        backgroundColor: 'lightgrey',
        marginBottom: 16,
    },
    title: {
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 12,
        position: 'absolute',
        bottom: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: '#999',
    },
});
