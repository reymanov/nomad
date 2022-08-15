import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { extendTheme, NativeBaseProvider } from 'native-base';

import { store } from '@store/index';
import AuthHandler from '@handlers/AuthHandler';
// import StatusBar from '@components/StatusBar';
import { RootNavigator } from '@navigation/navigators';
// import NetworkHandler from '@handlers/NetworkHandler';
// import {colorModeManager} from '@utils/ColorModeManager';

const config = { useSystemColorMode: true };

const customTheme = extendTheme({ config });

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <NativeBaseProvider theme={customTheme}>
                {/* <StatusBar /> */}
                <RootNavigator />
                <AuthHandler />
                {/* <NetworkHandler /> */}
            </NativeBaseProvider>
        </Provider>
    );
};

export default App;
