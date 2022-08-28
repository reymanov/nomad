import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store/index';

export interface TPlace {
    id: number;
    name: string;
    country: string;
    description: string;
    images: string[];
    position: {
        latitude: number;
        longitude: number;
    };
    isFavorite: boolean;
    isVisited: boolean;
}

export type VisitType = 'VISITED' | 'TO_VISIT';

interface PlacesState {
    places: TPlace[];
    visitType: VisitType;
}

const initialState: PlacesState = {
    places: [],
    visitType: 'VISITED',
};

export const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        setPlaces: (state, action: PayloadAction<TPlace[]>) => {
            state.places = action.payload;
        },
        setFavorite: (state, action: PayloadAction<{ id: number; isFavorite: boolean }>) => {
            const { id, isFavorite } = action.payload;
            const place = state.places.find(p => p.id === id);
            if (place) place.isFavorite = isFavorite;
        },
        setPlacesType: (state, action: PayloadAction<VisitType>) => {
            state.visitType = action.payload;
        },
    },
});

export const placesActions = {
    ...placesSlice.actions,
};

const getMapState = (state: AppState): PlacesState => state.places;

const selectPlaces = createSelector(getMapState, state => state.places);

const selectPlace = (id: number) =>
    createSelector(selectPlaces, places => places.find(p => p.id === id));

const selectActiveVisitType = createSelector([getMapState], state => {
    return state.visitType;
});

export const placesSelectors = {
    selectPlace,
    selectPlaces,
    selectActiveVisitType,
};

export default placesSlice.reducer;
