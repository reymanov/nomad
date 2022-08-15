import React from 'react';
import 'react-native-gesture-handler';
import { extendTheme, NativeBaseProvider } from 'native-base';

import { SafeAreaProvider } from 'react-native-safe-area-context';
// import StatusBar from '@components/StatusBar';
// import NetworkHandler from '@handlers/NetworkHandler';
// import AuthHandler from '@handlers/AuthHandler';
// import { Provider } from 'react-redux';
// import {colorModeManager} from '@utils/ColorModeManager';
// import {store} from '@src/store';
import { RootNavigator } from '@navigation/navigators';

const config = {
    useSystemColorMode: true,
};

const customTheme = extendTheme({ config });

const App: React.FC = () => {
    return (
        <SafeAreaProvider>
            {/* <Provider store={store}> */}
            <NativeBaseProvider theme={customTheme}>
                {/* <StatusBar /> */}
                <RootNavigator />
                {/* <AuthHandler /> */}
                {/* <NetworkHandler /> */}
            </NativeBaseProvider>
            {/* </Provider> */}
        </SafeAreaProvider>
    );
};

export default App;
