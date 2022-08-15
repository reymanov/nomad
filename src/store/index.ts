import { configureStore } from '@reduxjs/toolkit';
import session from '@store/session/sessionSlice';
import map from '@store/map/mapSlice';
import thunk from 'redux-thunk';

const middlewares = [thunk];

// if (__DEV__) {
//     const createDebugger = require('redux-flipper').default;
//     middlewares.push(createDebugger());
// }

export const store = configureStore({
    reducer: {
        session,
        map,
    },
    middleware: middlewares,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
