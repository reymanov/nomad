// import ThemedText from '@src/components/texts/ThemedText';
import { View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    title: string;
}

export const MapLayersItem: React.FC<Props> = ({ title }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.title}>{/* <ThemedText fontSize={16}>{title}</ThemedText> */}</View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 165,
        height: 100,
        borderRadius: 8,
        backgroundColor: 'lightgrey',
        marginBottom: 16,
    },
    title: {
        width: '100%',
        height: 28,
        position: 'absolute',
        bottom: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: 'darkgrey',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
