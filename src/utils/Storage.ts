import AsyncStorage from '@react-native-community/async-storage';
import { MapType } from '@store/map/mapSlice';

export const readMapType = async () => {
    return (await AsyncStorage.getItem('mapType')) as MapType | null;
};

export const writeMapType = async (mapType: MapType) =>
    await AsyncStorage.setItem('mapType', mapType);
