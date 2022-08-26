import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store/index';

export type VisitType = 'VISITED' | 'TO_VISIT';

interface DestinationsState {
    visitType: VisitType;
}

const initialState: DestinationsState = {
    visitType: 'VISITED',
};

export const destinationsSlice = createSlice({
    name: 'destinations',
    initialState,
    reducers: {
        setDestinationsType: (state, action: PayloadAction<VisitType>) => {
            state.visitType = action.payload;
        },
    },
});

export const destinationsActions = {
    ...destinationsSlice.actions,
};

const getMapState = (state: AppState): DestinationsState => state.destinations;

const selectActiveVisitType = createSelector([getMapState], state => {
    return state.visitType;
});

export const destinationsSelectors = {
    selectActiveVisitType,
};

export default destinationsSlice.reducer;
