import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Camera } from 'react-native-maps';
import { AppState } from '@store/index';

export enum MapType {
    STANDARD = 'STANDARD',
    DARK = 'DARK',
    RETRO = 'RETRO',
    HYBRID = 'HYBRID',
}

interface MapState {
    camera: Camera | null;
    isMapLayersDrawerOpen: boolean;
    mapStyle: MapType;
}

const initialState: MapState = {
    camera: null,
    isMapLayersDrawerOpen: false,
    mapStyle: MapType.STANDARD,
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
        setMapStyle: (state, action: PayloadAction<MapType>) => {
            state.mapStyle = action.payload;
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

const selectMapStyle = createSelector([getMapState], state => {
    return state.mapStyle;
});

const selectCamera = createSelector([getMapState], state => {
    return state.camera;
});

export const mapSelectors = {
    selectMapLayersState,
    selectMapStyle,
    selectCamera,
};

export default mapSlice.reducer;
