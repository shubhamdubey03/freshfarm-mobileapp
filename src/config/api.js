import { Platform } from 'react-native';

const BASE_URL = Platform.OS === 'android' ? 'https://freshfarm-1-y323.onrender.com' : 'https://freshfarm-1-y323.onrender.com';

export const API_URLS = {
    BASE_URL,
    GOOGLE_LOGIN: `${BASE_URL}/api/app/google-login/`,
    REGISTER: `${BASE_URL}/api/app/register/`,
    SEND_OTP: `${BASE_URL}/api/app/send-otp/`,
    VERIFY_OTP: `${BASE_URL}/api/app/verify-otp/`,
};

export default API_URLS;
