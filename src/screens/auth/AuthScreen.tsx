import React, { useMemo, useState } from 'react';
import { Button, Input } from 'native-base';
import {
    ActivityIndicator,
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SignIn, SignUp } from '@utils/Auth';
import { Fonts, Sizes } from '@constants/index';

const AuthScreen: React.FC = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const emailInputOffsetX = useSharedValue(0);
    const passwordInputOffsetX = useSharedValue(0);

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

        desiredInput.value = withSequence(
            withTiming(6, { duration: 150 }),
            withTiming(-6, { duration: 150 }),
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
        SignIn(email, password).then(() => setIsLoading(false));
    };

    const handleSignUp = () => {
        setIsLoading(true);
        SignUp(email, password).then(() => setIsLoading(false));
    };

    const getTitle = useMemo(() => {
        if (currentHour >= 6 && currentHour <= 12) return 'Good Morning';
        else if (currentHour > 12 && currentHour < 18) return 'Good Afternoon';
        else return 'Good Evening';
    }, [currentHour]);

    return (
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
                    keyboardVerticalOffset={-120}
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
                                value={email}
                                onChangeText={setEmail}
                                textContentType={'emailAddress'}
                                InputLeftElement={
                                    <Icon name={'person'} size={Sizes.lg} color={'#fff'} />
                                }
                            />
                        </Animated.View>

                        <Animated.View style={[styles.inputContainer, animatedPassword]}>
                            <Input
                                style={styles.input}
                                variant="underlined"
                                placeholder="Password"
                                placeholderTextColor={'#fff'}
                                selectionColor={'#fff'}
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

                        <View style={styles.bottomContainer}>
                            {isLoginMode ? (
                                <>
                                    <Button
                                        rounded={'md'}
                                        style={styles.button}
                                        disabled={isLoading}
                                        variant={'outline'}
                                        onPress={() => onActionClick(handleSignIn)}
                                    >
                                        {isLoading ? (
                                            <ActivityIndicator />
                                        ) : (
                                            <Text style={styles.buttonText}>Sign in</Text>
                                        )}
                                    </Button>
                                    <TouchableOpacity onPress={() => setIsLoginMode(false)}>
                                        <Text style={styles.subText}>Don't have account ? </Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <Button
                                        rounded={'md'}
                                        style={styles.button}
                                        disabled={isLoading}
                                        variant={'outline'}
                                        onPress={() => onActionClick(handleSignUp)}
                                    >
                                        {isLoading ? (
                                            <ActivityIndicator />
                                        ) : (
                                            <Text style={styles.buttonText}>Sign up</Text>
                                        )}
                                    </Button>

                                    <TouchableOpacity onPress={() => setIsLoginMode(true)}>
                                        <Text style={styles.subText}>Already have account ?</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: '25%',
        marginBottom: '20%',
        paddingHorizontal: Sizes.xxl,
    },
    title: {
        fontSize: Sizes.xxl,
        color: '#fff',
        alignSelf: 'center',
        fontFamily: Fonts.SatisfyRegular,
    },
    inputContainer: {
        marginBottom: Sizes.md,
    },
    input: {
        color: '#fff',
        marginLeft: Sizes.xxs,
        fontSize: Sizes.md,
    },
    bottomContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Sizes.xxxl,
    },
    button: {
        width: '100%',
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: Sizes.md,
    },
    subText: {
        color: '#fff',
        fontSize: Sizes.sm,
        marginTop: Sizes.md,
    },
});
