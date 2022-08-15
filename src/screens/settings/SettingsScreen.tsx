import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Switch, useColorMode, useTheme } from 'native-base';
// import auth from '@react-native-firebase/auth';
// import ThemedText from '@components/texts/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Card from '@src/components/containers/Card';

const SettingsScreen = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { colors } = useTheme();
    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];

    const handleSignOut = () => {
        // auth()
        //     .signOut()
        //     .catch(e => {
        //         console.log(e);
        //     });
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <View>
                {/* <ThemedText fontSize={36}>Settings</ThemedText> */}

                <Switch
                    onTrackColor={'cyan.600'}
                    isChecked={colorMode === 'dark'}
                    onToggle={toggleColorMode}
                />
            </View>

            <View style={styles.logoutButton}>
                <Button
                    rounded={'xl'}
                    onPress={handleSignOut}
                    bgColor={colors.cyan[700]}
                    size={'lg'}
                >
                    Log out
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    logoutButton: {
        width: '80%',
        alignSelf: 'center',
    },
});

export default SettingsScreen;
