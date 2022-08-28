import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

import map from '@store/map';
import session from '@store/session';
import places from '@store/places';

const middlewares = [thunk];

// if (__DEV__) {
//     const createDebugger = require('redux-flipper').default;
//     middlewares.push(createDebugger());
// }

export const store = configureStore({
    reducer: {
        session,
        map,
        places,
    },
    middleware: middlewares,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
