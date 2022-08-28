import { AppState } from 'react-native';
import { useSelector } from 'react-redux';
import { placesSelectors } from './placesSlice';

export const useSelectPlaceById = (id: number) => {
    return useSelector(placesSelectors.selectPlace(id));
};

export const useSelectPlaces = () => {
    return useSelector((state: AppState) => placesSelectors.selectPlaces(state));
};

export const useSelectActiveVisitType = () => {
    return useSelector((state: AppState) => placesSelectors.selectActiveVisitType(state));
};
