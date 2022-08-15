import React, { useCallback, useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    Keyboard,
    Pressable,
    View,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button, Input, useTheme } from 'native-base';
import { SendPasswordResetEmail } from '@utils/Auth';
import { Sizes } from '@constants/index';

interface Props extends BottomSheetModalProps {
    onClose: () => void;
    onExpand: () => void;
    onCollapse: () => void;
}

export const ForgotPasswordBottomSheet = React.forwardRef<BottomSheetModal, Props>(
    ({ onClose, onExpand, onCollapse, snapPoints, ...props }, ref) => {
        const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const [email, setEmail] = useState('');
        const { colors } = useTheme();

        const handleSubmit = async () => {
            try {
                setIsLoading(true);
                const result = await SendPasswordResetEmail(email);
                if (!result) return;

                Alert.alert('Success', 'Password reset email has been sent', [
                    { text: 'OK', onPress: onClose },
                ]);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        const handleDrawerChange = (index: number) => {
            if (index === -1) setEmail('');
        };

        useEffect(() => {
            const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
                setIsKeyboardOpen(true);
                onExpand();
            });
            const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
                setIsKeyboardOpen(false);
                onCollapse();
            });

            return () => {
                showSubscription.remove();
                hideSubscription.remove();
            };
        }, []);

        const renderBackdrop = useCallback(
            (p: any) => <BottomSheetBackdrop {...p} disappearsOnIndex={-1} appearsOnIndex={0} />,
            []
        );

        return (
            <BottomSheetModal
                ref={ref}
                index={0}
                snapPoints={snapPoints}
                keyboardBehavior={'fillParent'}
                backdropComponent={renderBackdrop}
                onChange={handleDrawerChange}
                enablePanDownToClose={true}
                {...props}
            >
                <Pressable style={styles.contentContainer} onPress={() => Keyboard.dismiss()}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Forgot password ?</Text>
                        <Text style={styles.description}>
                            Enter your email and we'll send the instructions
                        </Text>
                    </View>

                    <Input
                        value={email}
                        onChangeText={setEmail}
                        variant={'underlined'}
                        placeholder={'Email'}
                        textContentType={'emailAddress'}
                        style={styles.input}
                        InputLeftElement={
                            <Icon
                                name={'mail'}
                                color={isKeyboardOpen ? colors.primary['600'] : colors.gray['400']}
                                size={20}
                            />
                        }
                    />

                    <Button
                        variant={'outline'}
                        rounded={'md'}
                        style={[styles.button, !email && { opacity: 0.5 }]}
                        _pressed={{ backgroundColor: '#fff', opacity: 0.5 }}
                        disabled={!email}
                        onPress={handleSubmit}
                    >
                        {isLoading ? <ActivityIndicator /> : <Text>Send Email</Text>}
                    </Button>
                </Pressable>
            </BottomSheetModal>
        );
    }
);

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingVertical: Sizes.md,
        paddingHorizontal: Sizes.lg,
    },
    header: {
        marginBottom: Sizes.lg,
    },
    title: {
        fontSize: Sizes.lg,
        fontWeight: '500',
        marginBottom: Sizes.xxs,
    },
    description: {
        fontWeight: '300',
    },
    input: {
        marginLeft: Sizes.xxs,
        fontSize: Sizes.md,
    },
    button: {
        marginTop: 80,
        borderColor: '#000',
    },
});
