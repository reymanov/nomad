import { ImageURISource } from 'react-native';

export type UserData = {
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    phoneNumber: string | null;
    photoURL: ImageURISource | null;
};
