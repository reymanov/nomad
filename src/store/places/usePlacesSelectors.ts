import { AppState } from 'react-native';
import { useSelector } from 'react-redux';
import { placesSelectors } from './placesSlice';

export const useSelectActiveVisitType = () => {
    return useSelector((state: AppState) => placesSelectors.selectActiveVisitType(state));
};
