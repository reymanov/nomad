import React, { useState } from 'react';
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
// import { SignIn, SignUp } from '@src/utils/Auth';
import { Button, Input } from 'native-base';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AuthScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const emailInputOffsetX = useSharedValue(0);
    const passwordInputOffsetX = useSharedValue(0);

    const animatedEmail = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: emailInputOffsetX.value }],
        };
    });

    const animatedPassword = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: passwordInputOffsetX.value }],
        };
    });

    const shakeInput = (input: 'email' | 'password') => {
        const desiredInput = input === 'email' ? emailInputOffsetX : passwordInputOffsetX;

        desiredInput.value = withSequence(
            withTiming(6, { duration: 200 }),
            withTiming(-6, { duration: 200 }),
            withTiming(0, { duration: 200 })
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
        // SignIn(email, password).then(() => setIsLoading(false));
    };

    const handleSignUp = () => {
        setIsLoading(true);
        // SignUp(email, password).then(() => setIsLoading(false));
    };

    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={require('@assets/images/background_night.png')}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                    keyboardVerticalOffset={-100}
                >
                    <View style={styles.inputContainer}>
                        <Animated.View style={animatedEmail}>
                            <Input
                                style={styles.input}
                                borderColor="lightgray"
                                variant={'underlined'}
                                placeholder="Email"
                                placeholderTextColor="lightgray"
                                value={email}
                                onChangeText={setEmail}
                                textContentType="emailAddress"
                            />
                        </Animated.View>
                        <Animated.View style={animatedPassword}>
                            <Input
                                style={styles.input}
                                borderColor="lightgray"
                                variant="underlined"
                                placeholder="Password"
                                placeholderTextColor="lightgray"
                                value={password}
                                onChangeText={setPassword}
                                type={showPassword ? 'text' : 'password'}
                                InputRightElement={
                                    <TouchableOpacity
                                        style={styles.visibilityIcon}
                                        onPress={() => setShowPassword(!showPassword)}
                                    >
                                        <Icon name="visibility-off" size={24} color={'white'} />
                                    </TouchableOpacity>
                                }
                            />
                        </Animated.View>
                    </View>
                    <View style={styles.buttonContainer}>
                        {isLoginMode ? (
                            <>
                                <Button
                                    rounded={'lg'}
                                    style={styles.button}
                                    disabled={isLoading}
                                    onPress={() => onActionClick(handleSignIn)}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator />
                                    ) : (
                                        <Text style={styles.buttonText}>Login</Text>
                                    )}
                                </Button>
                                <TouchableOpacity onPress={() => setIsLoginMode(false)}>
                                    <Text style={styles.subText}>Don't have account ? </Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Button
                                    rounded={'lg'}
                                    style={styles.button}
                                    disabled={isLoading}
                                    onPress={() => onActionClick(handleSignUp)}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator />
                                    ) : (
                                        <Text style={styles.buttonText}>Register</Text>
                                    )}
                                </Button>
                                <TouchableOpacity onPress={() => setIsLoginMode(true)}>
                                    <Text style={styles.subText}>Already have account ? </Text>
                                </TouchableOpacity>
                            </>
                        )}
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: '25%',
    },
    inputContainer: {
        width: '70%',
    },
    input: {
        color: '#fff',
        paddingHorizontal: 6,
        paddingVertical: 10,
        marginTop: 12,
        fontSize: 16,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },
    subText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '400',
        marginTop: 20,
    },
    visibilityIcon: {
        position: 'absolute',
        right: 0,
        bottom: 8,
    },
});
