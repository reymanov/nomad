import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { HStack, useColorMode, useTheme } from 'native-base';
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';

import { IconButton } from '@components/buttons';
import { GenericStyles } from '@constants/styles';

interface Props {
    images: string[];
    onAdd: () => void;
    onRemove: (img: string) => void;
}

export const ImagesArea: React.FC<Props> = ({ images = [], onAdd, onRemove }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const indexArray = [0, 1, 2];

    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.gray[800] : colors.gray[200];
    const iconColor = isDarkMode ? colors.dark[800] : colors.dark[100];

    return (
        <HStack style={styles.container}>
            {indexArray.map(n => {
                const image = images[n];

                if (image) {
                    return (
                        <View key={n} style={styles.item}>
                            <Image
                                source={{ uri: image }}
                                style={styles.image}
                                resizeMode={'cover'}
                            />
                            <IconButton
                                size={30}
                                themed={false}
                                name={'remove-circle'}
                                color={colors.red[600]}
                                style={styles.removeImage}
                                onPress={() => onRemove(image)}
                            />
                        </View>
                    );
                } else
                    return (
                        <TouchableOpacity
                            key={n}
                            style={[styles.item, { backgroundColor }]}
                            onPress={onAdd}
                        >
                            <Icon size={38} name="image-outline" color={iconColor} />
                            <Icon
                                style={styles.addImage}
                                size={24}
                                name="add-circle"
                                color={iconColor}
                            />
                        </TouchableOpacity>
                    );
            })}
        </HStack>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        marginBottom: 2,
    },
    item: {
        width: '30%',
        height: 85,
        marginRight: '5%',
        borderRadius: 4,
        ...GenericStyles.center,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
    addImage: {
        position: 'absolute',
        right: 26,
        bottom: 16,
    },
    removeImage: {
        position: 'absolute',
        top: -12,
        right: -10,
    },
});
