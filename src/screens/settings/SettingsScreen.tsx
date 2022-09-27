import React from 'react';
import { StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button, Switch, Text, useColorMode } from 'native-base';

// import { writeMapType } from '@utils/Storage';
// import { mapActions, MapType } from '@store/map/mapSlice';
import { Colors, Sizes } from '@constants/index';
import { ThemedText } from '@components/texts';
import { ThemedScreenContainer } from '@containers/index';
import { useSelectUserDetails } from '@store/session/useSessionSelectors';

const SettingsScreen = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const userDetails = useSelectUserDetails();

    const handleSignOut = async () => {
        try {
            await auth().signOut();
        } catch (e) {
            console.error(e);
        }
    };

    const handleToggleColorMode = () => {
        // if (colorMode === 'light') {
        //     dispatch(mapActions.setMapStyle(MapType.DARK));
        //     writeMapType(MapType.DARK);
        // } else {
        //     dispatch(mapActions.setMapStyle(MapType.STANDARD));
        //     writeMapType(MapType.STANDARD);
        // }
        toggleColorMode();
    };

    return (
        <ThemedScreenContainer style={styles.container}>
            <View>
                <ThemedText fontSize={36} fontWeight={'medium'}>
                    Settings
                </ThemedText>

                <View style={styles.section}>
                    <View style={styles.row}>
                        <ThemedText fontSize={16} fontWeight={'bold'}>
                            Username
                        </ThemedText>
                        <ThemedText fontSize={16}>{userDetails.userName}</ThemedText>
                    </View>

                    <View style={styles.row}>
                        <ThemedText fontSize={16} fontWeight={'bold'}>
                            Email
                        </ThemedText>
                        <ThemedText fontSize={16}>{userDetails.email}</ThemedText>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.row}>
                        <ThemedText fontSize={16} fontWeight={'bold'}>
                            Dark mode
                        </ThemedText>
                        <Switch
                            onTrackColor={'cyan.600'}
                            isChecked={colorMode === 'dark'}
                            onToggle={handleToggleColorMode}
                        />
                    </View>
                </View>
            </View>

            <Button
                rounded={'lg'}
                width={'32'}
                backgroundColor={Colors.primary}
                alignSelf={'center'}
                onPress={handleSignOut}
            >
                <Text color={'#fff'}>Sign out</Text>
            </Button>
        </ThemedScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Sizes.lg,
        paddingHorizontal: Sizes.md,
        justifyContent: 'space-between',
    },
    section: {
        marginTop: Sizes.xl,
    },
    row: {
        marginTop: Sizes.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default SettingsScreen;
