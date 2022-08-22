import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { extendTheme, NativeBaseProvider } from 'native-base';

import { store } from '@store/index';
import AuthHandler from '@handlers/AuthHandler';
import { RootNavigator } from '@navigation/navigators';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { colorModeManager } from '@utils/ColorCodeManager';

const config = { useSystemColorMode: true };
const customTheme = extendTheme({ config });

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <NativeBaseProvider theme={customTheme} colorModeManager={colorModeManager}>
                <BottomSheetModalProvider>
                    <RootNavigator />
                    <AuthHandler />
                </BottomSheetModalProvider>
            </NativeBaseProvider>
        </Provider>
    );
};

export default App;
