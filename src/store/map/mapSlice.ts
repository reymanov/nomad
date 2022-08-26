import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Camera } from 'react-native-maps';
import { AppState } from '@store/index';

export enum MapType {
    STANDARD = 'STANDARD',
    DARK = 'DARK',
    RETRO = 'RETRO',
    HYBRID = 'HYBRID',
}

export enum PToggle {
    VISITED = 'VISITED',
    TO_VISIT = 'TO_VISIT',
}

interface MapState {
    camera: Camera | null;
    mapStyle: MapType;
    isMapLayersDrawerOpen: boolean;
    PlacesToggle: PToggle;
}

const initialState: MapState = {
    camera: null,
    mapStyle: MapType.STANDARD,
    isMapLayersDrawerOpen: false,
    PlacesToggle: PToggle.VISITED,
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
        setPlacesToggle: (state, action: PayloadAction<PToggle>) => {
            state.PlacesToggle = action.payload;
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

const selectPlacesToggle = createSelector([getMapState], state => {
    return state.PlacesToggle;
});

export const mapSelectors = {
    selectMapLayersState,
    selectMapStyle,
    selectCamera,
    selectPlacesToggle,
};

export default mapSlice.reducer;
