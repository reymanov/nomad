import { StorageManager } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export const colorModeManager: StorageManager = {
    get: async () => {
        try {
            const colorMode = await AsyncStorage.getItem('colorMode');
            return colorMode === 'dark' ? 'dark' : 'light';
        } catch (e) {
            return 'light';
        }
    },
    set: async (colorMode: 'dark' | 'light') => {
        try {
            await AsyncStorage.setItem('colorMode', colorMode);
        } catch (e) {
            console.log(e);
        }
    },
};
