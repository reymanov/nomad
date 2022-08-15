import { useSelector } from 'react-redux';
import { AppState } from '@store/index';
import { sessionSelectors } from './sessionSlice';

export const useSelectIsAuthenticated = () => {
    return useSelector((state: AppState) => sessionSelectors.selectIsAuthenticated(state));
};

export const useSelectUserDetails = () => {
    return useSelector((state: AppState) => sessionSelectors.selectUserDetails(state));
};
