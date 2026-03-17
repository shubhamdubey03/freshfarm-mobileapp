import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import SplashScreen from './src/screens/SplashScreen';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

import { AuthProvider } from './src/context/AuthContext';
import VerifyOTPScreen from './src/screens/VerifyOTPScreen';
import HomeScreen from './src/screens/HomeScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('role'); // 'role', 'login', 'signup', 'verify-otp', or 'home'
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  const handleSendOtpSuccess = (phone: string) => {
    setPhoneNumber(phone);
    setCurrentScreen('verify-otp');
  };

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {currentScreen === 'role' ? (
          <RoleSelectionScreen
            onContinue={() => setCurrentScreen('signup')}
            onLogin={() => setCurrentScreen('login')}
          />
        ) : currentScreen === 'login' ? (
          <LoginScreen
            onBack={() => setCurrentScreen('role')}
            onSignup={() => setCurrentScreen('signup')}
            onContinue={handleSendOtpSuccess}
          />
        ) : currentScreen === 'signup' ? (
          <SignupScreen
            onBack={() => setCurrentScreen('role')}
            onLogin={() => setCurrentScreen('login')}
            onContinue={handleSendOtpSuccess}
          />
        ) : currentScreen === 'verify-otp' ? (
          <VerifyOTPScreen
            phoneNumber={phoneNumber}
            onBack={() => setCurrentScreen('login')}
            onSuccess={() => {
              console.log('Login Successful');
              setCurrentScreen('home');
            }}
          />
        ) : (
          <HomeScreen />
        )}
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainApp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default App;

