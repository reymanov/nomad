import { StyleSheet } from 'react-native';

export const GenericStyles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.6,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    absoluteFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
