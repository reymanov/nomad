import { Platform } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { getUniqueId, getManufacturer, getModel, getSystemVersion } from 'react-native-device-info';
import { version } from '@src/../package.json';

const init = async () => {
    let manufacturer = '';
    try {
        manufacturer = await getManufacturer();
    } catch {
        manufacturer = 'unknown';
    }

    let deviceId = '';
    try {
        deviceId = await getUniqueId();
    } catch {
        deviceId = 'unknown';
    }

    const userProperties = {
        deviceId,
        deviceModel: getModel(),
        manufacturer,
        appVersion: version,
        platform: Platform.OS,
        systemVersion: getSystemVersion(),
    };

    await analytics().setUserProperties(userProperties);
    await crashlytics().setAttributes(userProperties);
};

const UserTrackingService = {
    init,
};

export default UserTrackingService;
