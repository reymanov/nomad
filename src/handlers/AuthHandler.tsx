import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';

import { sessionActions } from '@store/session/sessionSlice';

const AuthHandler: React.FC = () => {
    const [initializing, setInitializing] = useState(true);
    const dispatch = useDispatch();

    const onUserStateChanged = (user: any) => {
        if (user) dispatch(sessionActions.setUserDetails(user));
        else dispatch(sessionActions.resetUserDetails());

        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriptions = [
            auth().onAuthStateChanged(onUserStateChanged),
            auth().onUserChanged(onUserStateChanged),
        ];

        return () => {
            subscriptions.forEach(subscription => subscription());
        };
    }, []);

    return null;
};

export default AuthHandler;
