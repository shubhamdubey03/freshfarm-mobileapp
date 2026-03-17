import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme, Alert } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import SplashScreen from './src/screens/SplashScreen';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import VerifyOTPScreen from './src/screens/VerifyOTPScreen';
import HomeScreen from './src/screens/HomeScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import OrderSuccessScreen from './src/screens/OrderSuccessScreen';

const RootNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { user, isAppReady } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('role'); // Default initial screen
  const [phoneNumber, setPhoneNumber] = useState('');
  const [initialized, setInitialized] = useState(false);

  // Update starting screen based on auth state when app is ready
  useEffect(() => {
    if (isAppReady && !initialized) {
      if (user) {
        setCurrentScreen('home');
      }
      setInitialized(true);
    }
  }, [isAppReady, user, initialized]);

  if (!isAppReady || !initialized) {
    return <SplashScreen />;
  }

  const handleSendOtpSuccess = (phone: string) => {
    setPhoneNumber(phone);
    setCurrentScreen('verify-otp');
  };

  const handleNavigateProduct = () => {
    setCurrentScreen('product-detail');
  };

  return (
    <>
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
            setCurrentScreen('home');
          }}
        />
      ) : currentScreen === 'home' ? (
        <HomeScreen
          onNavigateCategories={() => setCurrentScreen('categories')}
          onLogout={() => setCurrentScreen('role')}
          onNavigateProduct={handleNavigateProduct}
        />
      ) : currentScreen === 'categories' ? (
        <CategoriesScreen
          onNavigateHome={() => setCurrentScreen('home')}
          onNavigateProduct={handleNavigateProduct}
        />
      ) : currentScreen === 'product-detail' ? (
        <ProductDetailScreen
          onBack={() => setCurrentScreen('home')}
          onAddToCart={() => {
            Alert.alert('Added to Cart', 'Your item has been added to the cart.');
            setCurrentScreen('home');
          }}
          onNavigateCheckout={() => setCurrentScreen('checkout')}
        />
      ) : currentScreen === 'checkout' ? (
        <CheckoutScreen
          onBack={() => setCurrentScreen('product-detail')}
          onPlaceOrder={() => {
            setCurrentScreen('order-success');
          }}
        />
      ) : (
        <OrderSuccessScreen
          onTrackOrder={() => {
            Alert.alert('Coming Soon', 'Order tracking feature is under development.');
          }}
          onContinueShopping={() => setCurrentScreen('home')}
        />
      )}
    </>
  );
};

function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
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

