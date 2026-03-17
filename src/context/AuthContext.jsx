import React, { createContext, useState, useContext, useEffect } from 'react';
import API_URLS from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendOtp = async (phoneNumber) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URLS.SEND_OTP, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phoneNumber }),
            });


            const responseText = await response.text();
            console.log("responseText", responseText)
            let data;
            try {
                data = JSON.parse(responseText);
                console.log("kakakakakak", data)
            } catch (e) {
                console.error('Failed to parse response as JSON:', responseText);
                throw new Error('Server returned an unexpected response (HTML instead of JSON).');
            }

            if (response.ok) {
                setLoading(false);
                return { success: true, data };
            } else {
                throw new Error(data.message || data.error || 'Failed to send OTP');
            }
        } catch (err) {
            setLoading(false);
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    const verifyOtp = async (phoneNumber, otp) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URLS.VERIFY_OTP, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phoneNumber, otp }),
            });

            const responseText = await response.text();
            console.log("responseText", responseText)
            let data;
            try {
                data = JSON.parse(responseText);
                console.log("---------", data)
            } catch (e) {
                console.error('Failed to parse response as JSON:', responseText);
                throw new Error('Server returned an unexpected response.');
            }

            if (response.ok) {
                setUser(data.user);
                setLoading(false);
                return { success: true, data };
            } else {
                throw new Error(data.message || data.error || 'Invalid OTP');
            }
        } catch (err) {
            setLoading(false);
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URLS.REGISTER, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const responseText = await response.text();
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error('Failed to parse response as JSON:', responseText);
                throw new Error('Server returned an unexpected response.');
            }

            if (response.ok) {
                setLoading(false);
                return { success: true, data };
            } else {
                throw new Error(data.message || data.error || 'Registration failed');
            }
        } catch (err) {
            setLoading(false);
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, sendOtp, verifyOtp, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
