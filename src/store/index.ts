import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

import map from '@store/map';
import session from '@store/session';
import destinations from '@store/destinations';

const middlewares = [thunk];

// if (__DEV__) {
//     const createDebugger = require('redux-flipper').default;
//     middlewares.push(createDebugger());
// }

export const store = configureStore({
    reducer: {
        session,
        map,
        destinations,
    },
    middleware: middlewares,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
