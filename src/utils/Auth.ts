import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const SignIn = async (email: string, password: string) => {
    try {
        await auth().signInWithEmailAndPassword(email, password);
        return true;
    } catch (error: any) {
        switch (error.code) {
            case 'auth/invalid-email':
                Alert.alert('Error', 'Invalid email');
                break;
            case 'auth/wrong-password':
                Alert.alert('Error', 'Wrong password');
                break;
            case 'auth/user-not-found':
                Alert.alert('Error', "User doesn't exist");
                break;
            case 'auth/user-disabled':
                Alert.alert('Error', 'Account has been disabled');
                break;
            case 'auth/too-many-requests':
                Alert.alert('Error', 'Too many attempts, try again later');
                break;
            default:
                Alert.alert('Error');
                break;
        }
        return false;
    }
};

export const SignUp = async (email: string, password: string) => {
    try {
        await auth().createUserWithEmailAndPassword(email, password);
        return true;
    } catch (error: any) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                Alert.alert('Error', 'Email is already in use');
                break;
            case 'auth/invalid-email':
                Alert.alert('Error', 'Invalid email');
                break;
            case 'auth/weak-password':
                Alert.alert('Error', 'Password is too weak');
                break;
            case 'auth/operation-not-allowed':
                Alert.alert('Error', 'This email has been disabled');
                break;
            default:
                Alert.alert('Error');
                break;
        }
        return false;
    }
};

export const SendPasswordResetEmail = async (email: string) => {
    try {
        await auth().sendPasswordResetEmail(email);
        return true;
    } catch (error: any) {
        switch (error.code) {
            case 'auth/invalid-email':
                Alert.alert('Error', 'Invalid email');
                break;
            case 'auth/user-not-found':
                Alert.alert('Error', "User doesn't exist");
                break;
            case 'auth/too-many-requests':
                Alert.alert('Error', 'Too many attempts, try again later');
                break;
            default:
                Alert.alert('Error');
                break;
        }
        return false;
    }
};