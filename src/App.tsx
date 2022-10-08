import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from '@store/index';
import AuthHandler from '@handlers/AuthHandler';
import { RootNavigator } from '@navigation/navigators';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { colorModeManager } from '@utils/ColorCodeManager';
import { StatusBar } from '@components/others';

const config = { useSystemColorMode: true };
const customTheme = extendTheme({ config });

const App: React.FC = () => {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <NativeBaseProvider theme={customTheme} colorModeManager={colorModeManager}>
                    <BottomSheetModalProvider>
                        <StatusBar />
                        <RootNavigator />
                        <AuthHandler />
                    </BottomSheetModalProvider>
                </NativeBaseProvider>
            </Provider>
        </SafeAreaProvider>
    );
};

export default App;
