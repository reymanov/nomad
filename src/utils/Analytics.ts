import analytics from '@react-native-firebase/analytics';

export const logEvent = async (name: string, payload?: { [key: string]: any }) => {
    await analytics().logEvent(name, payload);
};

export const logScreenView = async (name: string) => {
    await analytics().logScreenView({
        screen_name: name,
        screen_class: name,
    });
};
