import { useSelector } from 'react-redux';
import { AppState } from '@store/index';
import { mapSelectors } from './mapSlice';

export const useSelectMapLayersDrawerState = () => {
    return useSelector((state: AppState) => mapSelectors.selectMapLayersState(state));
};
