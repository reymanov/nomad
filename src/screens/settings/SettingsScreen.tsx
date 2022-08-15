import React from 'react';
import { StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Switch, useColorMode, useTheme } from 'native-base';
// import ThemedText from '@components/texts/ThemedText';

const SettingsScreen = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { colors } = useTheme();
    const isDarkMode = colorMode === 'dark';
    const backgroundColor = isDarkMode ? colors.dark[50] : colors.dark[800];

    const handleSignOut = async () => {
        try {
            await auth().signOut();
        } catch (e) {
            console.error(e);
        }
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
                <Button rounded={'md'} onPress={handleSignOut}>
                    Sign out
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
