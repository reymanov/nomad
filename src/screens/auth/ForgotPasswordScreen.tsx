import React, { useState } from 'react';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert, Pressable, StyleSheet, Keyboard, View, Text } from 'react-native';
import { Button, FormControl, Input, useTheme, WarningOutlineIcon } from 'native-base';

import { Sizes } from '@constants/index';
import { useKeyboard } from '@hooks/index';
import { sendPasswordResetEmail } from '@utils/Auth';
import { useNavigation } from '@react-navigation/native';

export const ForgotPasswordScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [email, setEmail] = useState('');

    const { keyboardShown } = useKeyboard();
    const navigation = useNavigation();
    const { colors } = useTheme();

    const handleInputChange = (event: any) => {
        isInvalid && setIsInvalid(false);
        setEmail(event);
    };

    const handleSubmit = async (email: string) => {
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setIsInvalid(true);
            return;
        }

        try {
            setIsLoading(true);
            const result = await sendPasswordResetEmail(email);
            if (!result) return;
            Alert.alert('Success!', 'Password reset email has been sent', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.container}>
            <View>
                <Text style={styles.title}>Forgot Password ?</Text>
                <Text style={styles.subtitle}>Don't worry, we got your back</Text>

                <Lottie
                    source={require('@assets/animations/forgot_password.json')}
                    style={styles.animation}
                    autoPlay
                    loop
                />

                <Text style={styles.description}>
                    Enter your email and we will send you instructions
                </Text>

                <FormControl isInvalid={isInvalid}>
                    <Input
                        value={email}
                        style={styles.input}
                        onChangeText={handleInputChange}
                        selectionColor={colors.black}
                        placeholder="Email"
                        placeholderTextColor={colors.gray['400']}
                        borderColor={colors.gray['300']}
                        keyboardType={'email-address'}
                        InputLeftElement={
                            <Icon
                                size={24}
                                name={'mail'}
                                style={{ marginLeft: Sizes.xxs }}
                                color={keyboardShown ? colors.primary['600'] : colors.gray['300']}
                            />
                        }
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Please enter a valid email
                    </FormControl.ErrorMessage>
                </FormControl>
            </View>

            <Button
                style={styles.button}
                isLoading={isLoading}
                isDisabled={isLoading || !email}
                onPress={() => handleSubmit(email)}
            >
                <Text style={styles.buttonText}>Reset password</Text>
            </Button>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingVertical: Sizes.xxl,
        paddingHorizontal: Sizes.lg,
    },
    title: {
        fontSize: Sizes.lg,
        fontWeight: '600',
        marginBottom: Sizes.xxxs,
    },
    subtitle: {
        fontSize: Sizes.md,
        fontWeight: '500',
        marginBottom: Sizes.xl,
    },
    description: {
        fontSize: Sizes.md,
        marginTop: Sizes.xl,
        marginBottom: Sizes.xs,
    },
    animation: {
        width: '75%',
        alignSelf: 'center',
    },
    input: {
        color: '#000',
        fontSize: Sizes.md,
        marginLeft: -Sizes.xxs,
    },
    button: {
        borderRadius: Sizes.xxs,
    },
    buttonText: {
        color: '#fff',
        fontSize: Sizes.md,
    },
});
