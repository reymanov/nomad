import ReactNativeHapticFeedback, { HapticFeedbackTypes } from 'react-native-haptic-feedback';

export const triggerHapticFeedback = (type: HapticFeedbackTypes) => {
    ReactNativeHapticFeedback.trigger(type, {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
    });
};
