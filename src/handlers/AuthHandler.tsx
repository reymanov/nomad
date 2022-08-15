import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';

import { sessionActions } from '@store/session/sessionSlice';

const AuthHandler: React.FC = () => {
    const [initializing, setInitializing] = useState(true);
    const dispatch = useDispatch();

    const onAuthStateChanged = (user: any) => {
        if (user) dispatch(sessionActions.setUserDetails(user));
        else dispatch(sessionActions.resetUserDetails());

        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    return null;
};

export default AuthHandler;
