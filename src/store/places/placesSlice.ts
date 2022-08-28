import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store/index';

export type VisitType = 'VISITED' | 'TO_VISIT';

interface PlacesState {
    visitType: VisitType;
}

const initialState: PlacesState = {
    visitType: 'VISITED',
};

export const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        setPlacesType: (state, action: PayloadAction<VisitType>) => {
            state.visitType = action.payload;
        },
    },
});

export const placesActions = {
    ...placesSlice.actions,
};

const getMapState = (state: AppState): PlacesState => state.places;

const selectActiveVisitType = createSelector([getMapState], state => {
    return state.visitType;
});

export const placesSelectors = {
    selectActiveVisitType,
};

export default placesSlice.reducer;
