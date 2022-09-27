import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export const useSwipe = (onSwipeLeft?: any, onSwipeRight?: any, rangeOffset = 25) => {
    let firstTouch = 0;

    const onTouchStart = (e: any) => {
        firstTouch = e.nativeEvent.pageX;
    };

    const onTouchEnd = (e: any) => {
        const positionX = e.nativeEvent.pageX;
        const range = windowWidth / rangeOffset;

        if (positionX - firstTouch > range) {
            onSwipeRight && onSwipeRight();
        } else if (firstTouch - positionX > range) {
            onSwipeLeft && onSwipeLeft();
        }
    };

    return { onTouchStart, onTouchEnd };
};
