import { useColorMode, useTheme } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View, ViewProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { GenericStyles, Colors, Sizes } from '@constants/index';
import { useSelectPlacesToggle } from '@src/store/map/useMapSelectors';
import { mapActions, PToggle } from '@src/store/map/mapSlice';
import { useDispatch } from 'react-redux';

export const PlacesToggle: React.FC<ViewProps> = ({ ...props }) => {
    const activeItem = useSelectPlacesToggle();
    const containerSizeRef = useRef(0);
    const offsetX = useSharedValue(0);

    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const isDarkMode = colorMode === 'dark';

    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];
    const activeTextColor = Colors.white;
    const inactiveTextColor = isDarkMode ? Colors.white : Colors.black;

    const itemWidth = containerSizeRef.current / 2 || (Dimensions.get('window').width - 32) / 2;
    const activeIndex = activeItem === PToggle.VISITED ? 0 : 1;

    useEffect(() => {
        offsetX.value = activeIndex;
    }, [activeItem]);

    const animatedToggleStyle = useAnimatedStyle(() => {
        return {
            width: itemWidth - 4,
            backgroundColor: colors.primary[700],
            left: withSpring(offsetX.value * itemWidth + 2, {
                stiffness: 500,
                overshootClamping: false,
                damping: 50,
            }),
        };
    });

    const onToggle = (item: PToggle) => {
        dispatch(mapActions.setPlacesToggle(item));
    };

    return (
        <View
            {...props}
            style={[styles.container, { backgroundColor }, props.style]}
            onLayout={e => (containerSizeRef.current = e.nativeEvent.layout.width)}
        >
            <Animated.View style={[styles.toggle, animatedToggleStyle]} />
            <Pressable style={styles.item} onPress={() => onToggle(PToggle.VISITED)}>
                <Text
                    style={[
                        activeIndex === 0
                            ? { color: activeTextColor }
                            : { color: inactiveTextColor },
                    ]}
                >
                    Visited
                </Text>
            </Pressable>
            <Pressable style={styles.item} onPress={() => onToggle(PToggle.TO_VISIT)}>
                <Text
                    style={[
                        activeIndex === 1
                            ? { color: activeTextColor }
                            : { color: inactiveTextColor },
                    ]}
                >
                    To visit
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: Sizes.xl,
        backgroundColor: '#fff',
        borderRadius: Sizes.xxs,
        paddingVertical: 2,
        flexDirection: 'row',
        ...GenericStyles.shadow,
    },
    item: {
        flex: 1,
        ...GenericStyles.center,
    },
    toggle: {
        height: '100%',
        position: 'absolute',
        marginTop: 2,
        backgroundColor: Colors.blueLagoon,
        borderRadius: 6,
    },
});
