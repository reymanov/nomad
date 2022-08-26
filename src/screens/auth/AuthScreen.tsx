import React, { useMemo, useState } from 'react';
import { Button, Input } from 'native-base';
import {
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signIn, signUp, updateProfile } from '@utils/Auth';
import { AUTH_STACK } from '@navigation/types';
import { Fonts, HITSLOP, Sizes, emailRegex, Colors } from '@constants/index';
import { logEvent } from '@src/utils/Analytics';

export const AuthScreen: React.FC = () => {
    const [isSignInMode, setIsSignInMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { navigate } = useNavigation<any>();

    const usernameInputOffsetX = useSharedValue(0);
    const emailInputOffsetX = useSharedValue(0);
    const passwordInputOffsetX = useSharedValue(0);

    const isUsernameValid = !isSignInMode && username.length > 0;
    const isEmailValid = email && emailRegex.test(email);
    const isPasswordValid = password;

    const currentHour = new Date().getHours();
    const isDayTime = currentHour >= 6 && currentHour < 18;

    const animatedUsername = useAnimatedStyle(() => ({
        transform: [{ translateX: usernameInputOffsetX.value }],
    }));

    const animatedEmail = useAnimatedStyle(() => ({
        transform: [{ translateX: emailInputOffsetX.value }],
    }));

    const animatedPassword = useAnimatedStyle(() => ({
        transform: [{ translateX: passwordInputOffsetX.value }],
    }));

    const shakeInput = (input: 'username' | 'email' | 'password') => {
        let desiredInput;

        switch (input) {
            case 'username':
                desiredInput = usernameInputOffsetX;
                break;
            case 'email':
                desiredInput = emailInputOffsetX;
                break;
            case 'password':
                desiredInput = passwordInputOffsetX;
                break;
        }

        if (desiredInput.value !== 0) return;

        desiredInput.value = withSequence(
            withTiming(8, { duration: 150 }),
            withTiming(-8, { duration: 150 }),
            withTiming(8, { duration: 150 }),
            withTiming(0, { duration: 150 })
        );
    };

    const handleSignIn = async () => {
        if (!isEmailValid) shakeInput('email');
        if (!isPasswordValid) shakeInput('password');

        if (!isEmailValid || !isPasswordValid) return;

        setIsLoading(true);
        await signIn(email, password);
        logEvent('sign_in');
        setIsLoading(false);
    };

    const handleSignUp = async () => {
        if (!isUsernameValid) shakeInput('username');
        if (!isEmailValid) shakeInput('email');
        if (!isPasswordValid) shakeInput('password');

        if (!isUsernameValid || !isEmailValid || !isPasswordValid) return;

        setIsLoading(true);
        const authResult = await signUp(email, password);
        logEvent('sign_up');
        if (authResult) await updateProfile(username);
        setIsLoading(false);
    };

    const getTitle = useMemo(() => {
        if (currentHour >= 6 && currentHour <= 12) return 'Good Morning';
        else if (currentHour > 12 && currentHour < 18) return 'Good Afternoon';
        else return 'Good Evening';
    }, [currentHour]);

    return (
        <>
            <ImageBackground
                style={{ flex: 1 }}
                source={
                    isDayTime
                        ? require('@assets/images/background_day.png')
                        : require('@assets/images/background_night.png')
                }
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior="padding"
                        keyboardVerticalOffset={-140}
                    >
                        <Text style={styles.title}>{getTitle}</Text>

                        <View>
                            {!isSignInMode && (
                                <Animated.View style={[styles.inputContainer, animatedUsername]}>
                                    <Input
                                        style={styles.input}
                                        variant={'underlined'}
                                        placeholder={'Username'}
                                        placeholderTextColor={'#fff'}
                                        selectionColor={'#fff'}
                                        borderColor={'#fff'}
                                        value={username}
                                        onChangeText={setUserName}
                                        InputLeftElement={
                                            <Icon name={'person'} size={Sizes.lg} color={'#fff'} />
                                        }
                                    />
                                </Animated.View>
                            )}

                            <Animated.View style={[styles.inputContainer, animatedEmail]}>
                                <Input
                                    style={styles.input}
                                    variant={'underlined'}
                                    placeholder={'Email'}
                                    placeholderTextColor={'#fff'}
                                    selectionColor={'#fff'}
                                    borderColor={'#fff'}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType={'email-address'}
                                    InputLeftElement={
                                        <Icon name={'mail'} size={Sizes.lg} color={'#fff'} />
                                    }
                                />
                            </Animated.View>

                            <Animated.View style={[styles.inputContainer, animatedPassword]}>
                                <Input
                                    style={styles.input}
                                    variant={'underlined'}
                                    placeholder={'Password'}
                                    placeholderTextColor={'#fff'}
                                    selectionColor={'#fff'}
                                    borderColor={'#fff'}
                                    value={password}
                                    onChangeText={setPassword}
                                    type={passwordVisible ? 'text' : 'password'}
                                    InputLeftElement={
                                        <Icon name={'lock'} size={Sizes.lg} color={'#fff'} />
                                    }
                                    InputRightElement={
                                        password ? (
                                            <TouchableOpacity
                                                onPress={() => setPasswordVisible(!passwordVisible)}
                                            >
                                                <Icon
                                                    name={
                                                        passwordVisible
                                                            ? 'visibility-off'
                                                            : 'visibility'
                                                    }
                                                    size={Sizes.lg}
                                                    color={'#fff'}
                                                />
                                            </TouchableOpacity>
                                        ) : undefined
                                    }
                                />
                            </Animated.View>

                            <TouchableOpacity
                                onPress={() => navigate(AUTH_STACK.ForgotPassword)}
                                hitSlop={HITSLOP}
                            >
                                <Text style={styles.forgotPassword}>Forgot Password ?</Text>
                            </TouchableOpacity>

                            <View style={styles.bottomContainer}>
                                {isSignInMode ? (
                                    <>
                                        <Button
                                            style={styles.button}
                                            isLoading={isLoading}
                                            isDisabled={isLoading}
                                            variant={'outline'}
                                            onPress={handleSignIn}
                                        >
                                            <Text style={styles.buttonText}>Sign in</Text>
                                        </Button>
                                        <TouchableOpacity
                                            onPress={() => setIsSignInMode(false)}
                                            hitSlop={HITSLOP}
                                        >
                                            <Text style={styles.subText}>
                                                Don't have account ? <Text>Sign up</Text>
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant={'outline'}
                                            style={styles.button}
                                            isLoading={isLoading}
                                            isDisabled={isLoading}
                                            onPress={handleSignUp}
                                        >
                                            <Text style={styles.buttonText}>Sign up</Text>
                                        </Button>

                                        <TouchableOpacity
                                            onPress={() => setIsSignInMode(true)}
                                            hitSlop={HITSLOP}
                                        >
                                            <Text style={styles.subText}>
                                                Already have account ? <Text>Sign in</Text>
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: '25%',
        marginBottom: 75,
        paddingHorizontal: Sizes.xxl,
    },
    title: {
        fontSize: Sizes.xxl,
        color: Colors.white,
        alignSelf: 'center',
        fontFamily: Fonts.SatisfyRegular,
    },
    inputContainer: {
        marginBottom: Sizes.lg,
    },
    input: {
        color: Colors.white,
        marginLeft: Sizes.xxs,
        fontSize: Sizes.md,
    },
    forgotPassword: {
        color: Colors.white,
        fontSize: Sizes.sm,
        alignSelf: 'flex-end',
    },
    bottomContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%',
    },
    button: {
        width: '100%',
        height: 40,
        borderRadius: Sizes.xxs,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.white,
        marginBottom: Sizes.lg,
    },
    buttonText: {
        color: Colors.white,
        fontSize: Sizes.md,
    },
    subText: {
        color: Colors.white,
        fontSize: Sizes.sm,
    },
});
