import { useColorMode } from 'native-base';
import React from 'react';
import { StatusBar as DefaultStatusBar } from 'native-base';

const StatusBar: React.FC = () => {
    const { colorMode } = useColorMode();

    const statusBarStyle = colorMode === 'dark' ? 'light-content' : 'dark-content';
    return <DefaultStatusBar barStyle={statusBarStyle} />;
};

export default StatusBar;
