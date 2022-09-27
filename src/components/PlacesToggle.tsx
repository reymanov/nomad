import React, { useEffect, useRef } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View, ViewProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

import { triggerHapticFeedback } from '@utils/Haptic';
import { GenericStyles, Colors, Sizes } from '@constants/index';
import { placesActions, useSelectActiveVisitType, VisitType } from '@store/places';

export const PlacesToggle: React.FC<ViewProps> = ({ ...props }) => {
    const activeItem = useSelectActiveVisitType();
    const containerSizeRef = useRef(0);
    const offsetX = useSharedValue(0);
    const dispatch = useDispatch();

    const itemWidth = containerSizeRef.current / 2 || (Dimensions.get('window').width - 32) / 2;
    const activeIndex = activeItem === 'VISITED' ? 0 : 1;

    useEffect(() => {
        offsetX.value = activeIndex;
    }, [activeItem]);

    const animatedToggleStyle = useAnimatedStyle(() => {
        return {
            width: itemWidth - 4,
            backgroundColor: Colors.primary,
            left: withSpring(offsetX.value * itemWidth + 2, {
                stiffness: 500,
                overshootClamping: false,
                damping: 50,
            }),
        };
    });

    const onToggle = (item: VisitType) => {
        dispatch(placesActions.setPlacesType(item));
        triggerHapticFeedback('impactLight');
    };

    return (
        <View
            {...props}
            style={[styles.container, props.style]}
            onLayout={e => (containerSizeRef.current = e.nativeEvent.layout.width)}
        >
            <Animated.View style={[styles.toggle, animatedToggleStyle]} />
            <Pressable style={styles.item} onPress={() => onToggle('VISITED')}>
                <Text style={{ color: activeIndex === 0 ? Colors.white : Colors.black }}>
                    Visited
                </Text>
            </Pressable>
            <Pressable style={styles.item} onPress={() => onToggle('TO_VISIT')}>
                <Text style={{ color: activeIndex === 1 ? Colors.white : Colors.black }}>
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
        borderRadius: 6,
    },
});
