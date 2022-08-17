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

import { signIn, signUp } from '@utils/Auth';
import { AUTH_STACK } from '@navigation/types';
import { Fonts, DEFAULT_HITSLOP, Sizes } from '@constants/index';

export const AuthScreen: React.FC = () => {
    const [isSignInMode, setIsSignInMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const emailInputOffsetX = useSharedValue(0);
    const passwordInputOffsetX = useSharedValue(0);
    const { navigate } = useNavigation<any>();

    const currentHour = new Date().getHours();
    const isDayTime = currentHour >= 6 && currentHour < 18;

    const animatedEmail = useAnimatedStyle(() => ({
        transform: [{ translateX: emailInputOffsetX.value }],
    }));

    const animatedPassword = useAnimatedStyle(() => ({
        transform: [{ translateX: passwordInputOffsetX.value }],
    }));

    const shakeInput = (input: 'email' | 'password') => {
        const desiredInput = input === 'email' ? emailInputOffsetX : passwordInputOffsetX;

        if (desiredInput.value !== 0) return;

        desiredInput.value = withSequence(
            withTiming(8, { duration: 150 }),
            withTiming(-8, { duration: 150 }),
            withTiming(8, { duration: 150 }),
            withTiming(0, { duration: 150 })
        );
    };

    const onActionClick = (callback: { (): void }) => {
        const isEmailValid = email && email.includes('@');
        const isPasswordValid = password;

        if (!isEmailValid) {
            shakeInput('email');
        }
        if (!isPasswordValid) {
            shakeInput('password');
        }
        if (isEmailValid && isPasswordValid) callback();
    };

    const handleSignIn = () => {
        setIsLoading(true);
        signIn(email, password).then(() => setIsLoading(false));
    };

    const handleSignUp = () => {
        setIsLoading(true);
        signUp(email, password).then(() => setIsLoading(false));
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
                                        <Icon name={'person'} size={Sizes.lg} color={'#fff'} />
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
                                hitSlop={DEFAULT_HITSLOP}
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
                                            onPress={() => onActionClick(handleSignIn)}
                                        >
                                            <Text style={styles.buttonText}>Sign in</Text>
                                        </Button>
                                        <TouchableOpacity onPress={() => setIsSignInMode(false)}>
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
                                            onPress={() => onActionClick(handleSignUp)}
                                        >
                                            <Text style={styles.buttonText}>Sign up</Text>
                                        </Button>

                                        <TouchableOpacity
                                            onPress={() => setIsSignInMode(true)}
                                            hitSlop={DEFAULT_HITSLOP}
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
        color: '#fff',
        alignSelf: 'center',
        fontFamily: Fonts.SatisfyRegular,
    },
    inputContainer: {
        marginBottom: Sizes.lg,
    },
    input: {
        color: '#fff',
        marginLeft: Sizes.xxs,
        fontSize: Sizes.md,
    },
    forgotPassword: {
        color: '#fff',
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
        height: 42,
        borderRadius: Sizes.xxs,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        marginBottom: Sizes.lg,
    },
    buttonText: {
        color: '#fff',
        fontSize: Sizes.md,
    },
    subText: {
        color: '#fff',
        fontSize: Sizes.sm,
    },
});
