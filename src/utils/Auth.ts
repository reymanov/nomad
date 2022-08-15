import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const SignIn = (email: string, password: string) => {
    return new Promise(resolve => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        return Alert.alert('Error', 'Invalid email');
                    case 'auth/wrong-password':
                        return Alert.alert('Error', 'Wrong password');
                    case 'auth/user-not-found':
                        return Alert.alert('Error', "User doesn't exist");
                    case 'auth/user-disabled':
                        return Alert.alert('Error', 'Account has been disabled');
                    case 'auth/too-many-requests':
                        return Alert.alert('Error', 'Too many attempts, try again later');
                    default:
                        return Alert.alert('Error');
                }
            })
            .finally(() => resolve(true));
    });
};

export const SignUp = (email: string, password: string) => {
    return new Promise(resolve => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(error => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        return Alert.alert('Error', 'Email is already in use');
                    case 'auth/invalid-email':
                        return Alert.alert('Error', 'Invalid email');
                    case 'auth/weak-password':
                        return Alert.alert('Error', 'Password is too weak');
                    case 'auth/operation-not-allowed':
                        return Alert.alert('Error', 'This email has been disabled');
                    default:
                        return Alert.alert('Error');
                }
            })
            .finally(() => resolve(true));
    });
};
