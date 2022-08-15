import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Camera } from 'react-native-maps';
import { AppState } from '@store/index';

interface MapState {
    isMapLayersDrawerOpen: boolean;
    camera: Camera | null;
}

const initialState: MapState = {
    isMapLayersDrawerOpen: false,
    camera: null,
};

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        openMapLayersDrawer: state => {
            state.isMapLayersDrawerOpen = true;
        },
        closeMapLayersDrawer: state => {
            state.isMapLayersDrawerOpen = false;
        },
        setCamera: (state, action: PayloadAction<Camera>) => {
            state.camera = action.payload;
        },
    },
});

export const mapActions = {
    ...mapSlice.actions,
};

const getMapState = (state: AppState): MapState => state.map;

const selectMapLayersState = createSelector([getMapState], state => {
    return state.isMapLayersDrawerOpen;
});

export const mapSelectors = {
    selectMapLayersState,
};

export default mapSlice.reducer;
