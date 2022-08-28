import React from 'react';
import { useTheme } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { HITSLOP, Sizes } from '@constants/index';

export const NavigateBackButton: React.FC = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const color = colors.primary['600'];

    const handlePress = () => {
        navigation.goBack();
    };
    return (
        <View>
            <TouchableOpacity style={styles.container} hitSlop={HITSLOP} onPress={handlePress}>
                <Icon name={'chevron-left'} color={color} size={26} />
                <Text style={[styles.text, { color }]}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        padding: Sizes.xxxs,
    },
    text: {
        fontSize: 16,
    },
});
