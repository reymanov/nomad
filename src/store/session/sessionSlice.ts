import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageURISource } from 'react-native';
import { AppState } from '@store/index';
import { UserData } from './sessionTypes';

interface SessionState {
    isAuthenticated: boolean;
    userName: string | null;
    email: string | null;
    emailVerified: boolean;
    phoneNumber: string | null;
    photoURL: ImageURISource | null;
}

const initialState: SessionState = {
    isAuthenticated: false,
    userName: null,
    email: null,
    emailVerified: false,
    phoneNumber: null,
    photoURL: null,
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setUserDetails: (store, action: PayloadAction<UserData>) => {
            const { displayName, email, emailVerified, phoneNumber, photoURL } = action.payload;
            store.isAuthenticated = true;
            store.userName = displayName;
            store.email = email;
            store.emailVerified = emailVerified;
            store.phoneNumber = phoneNumber;
            store.photoURL = photoURL;
        },
        resetUserDetails: store => (store = initialState),
        setUserPhoto: (store, action: PayloadAction<ImageURISource>) => {
            store.photoURL = action.payload;
        },
    },
});

export const sessionActions = {
    ...sessionSlice.actions,
};

const getSessionState = (state: AppState): SessionState => state.session;

const selectIsAuthenticated = createSelector([getSessionState], state => {
    return state.isAuthenticated;
});

const selectUserDetails = createSelector([getSessionState], state => {
    const { userName, email, phoneNumber, photoURL } = state;
    return { userName, email, phoneNumber, photoURL };
});

export const sessionSelectors = {
    selectIsAuthenticated,
    selectUserDetails,
};

export default sessionSlice.reducer;
