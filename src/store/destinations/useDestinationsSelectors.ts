import { AppState } from 'react-native';
import { useSelector } from 'react-redux';
import { destinationsSelectors } from './destinationsSlice';

export const useSelectActiveVisitType = () => {
    return useSelector((state: AppState) => destinationsSelectors.selectActiveVisitType(state));
};
