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
import VendorDashboardScreen from './src/screens/VendorDashboardScreen';
import VendorStockScreen from './src/screens/VendorStockScreen';
import VendorProfileScreen from './src/screens/VendorProfileScreen';
import FarmSettingsScreen from './src/screens/vendor/FarmSettingsScreen';
import PaymentSettingsScreen from './src/screens/vendor/PaymentSettingsScreen';
import DeliveryPreferencesScreen from './src/screens/vendor/DeliveryPreferencesScreen';
import PayoutHistoryScreen from './src/screens/vendor/PayoutHistoryScreen';
import AddProductScreen from './src/screens/AddProductScreen';
import VendorOrdersScreen from './src/screens/VendorOrdersScreen';
import CategoriesScreen from './src/screens/OrderProduct/CategoriesScreen';
import ProductDetailScreen from './src/screens/OrderProduct/ProductDetailScreen';
import CheckoutScreen from './src/screens/payment/CheckoutScreen';
import OrderSuccessScreen from './src/screens/OrderProduct/OrderSuccessScreen';
import TrackOrderScreen from './src/screens/OrderProduct/TrackOrderScreen';
import OrdersScreen from './src/screens/OrderProduct/OrdersScreen';
import ProfileScreen from './src/screens/userProfile/ProfileScreen';
import EditProfileScreen from './src/screens/userProfile/EditProfileScreen';
import DeliveryAddressesScreen from './src/screens/userProfile/DeliveryAddressesScreen';
import PaymentMethodsScreen from './src/screens/userProfile/PaymentMethodsScreen';
import WalletScreen from './src/screens/userProfile/WalletScreen';
import HelpSupportScreen from './src/screens/userProfile/HelpSupportScreen';

const RootNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { user, isAppReady } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('role'); // Default initial screen
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userRole, setUserRole] = useState(''); // Default role
  const [initialized, setInitialized] = useState(false);

  console.log("userRole", userRole);

  // Update starting screen based on auth state when app is ready
  useEffect(() => {
    if (isAppReady && !initialized) {
      if (user) {
        // Check stored user role if it exists in user object
        const role = user.role || user.user_role || userRole;
        if (role === 'farmer' || role === 'vendor') {
          setCurrentScreen('vendor-dashboard');
        } else {
          setCurrentScreen('home');
        }
      }
      setInitialized(true);
    }
  }, [isAppReady, user, initialized, userRole]);

  if (!isAppReady || !initialized) {
    return <SplashScreen />;
  }

  const handleSendOtpSuccess = (phone: string, role: string) => {
    setPhoneNumber(phone);
    setUserRole(role);
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
          onContinue={(role: string) => {
            setUserRole(role);
            setCurrentScreen('signup');
          }}
          onLogin={(role: string) => {
            setUserRole(role);
            setCurrentScreen('login');
          }}
        />
      ) : currentScreen === 'login' ? (
        <LoginScreen
          role={userRole}
          onBack={() => setCurrentScreen('role')}
          onSignup={() => setCurrentScreen('signup')}
          onContinue={handleSendOtpSuccess}
        />
      ) : currentScreen === 'signup' ? (
        <SignupScreen
          role={userRole}
          onBack={() => setCurrentScreen('role')}
          onLogin={() => setCurrentScreen('login')}
          onContinue={handleSendOtpSuccess}
        />
      ) : currentScreen === 'verify-otp' ? (
        <VerifyOTPScreen
          phoneNumber={phoneNumber}
          onBack={() => setCurrentScreen('login')}
          onSuccess={() => {
            if (userRole === 'farmer' || userRole === 'vendor') {
              setCurrentScreen('vendor-dashboard');
            } else {
              setCurrentScreen('home');
            }
          }}
        />
      ) : currentScreen === 'vendor-dashboard' ? (
        <VendorDashboardScreen
          onNavigateOrders={() => setCurrentScreen('vendor-orders')}
          onNavigateStock={() => setCurrentScreen('vendor-stock')}
          onNavigateProfile={() => setCurrentScreen('vendor-profile')}
          onAddProduct={() => setCurrentScreen('add-product')}
          onLogout={() => {
            setCurrentScreen('role');
          }}
        />
      ) : currentScreen === 'vendor-orders' ? (
        <VendorOrdersScreen
          onNavigateDashboard={() => setCurrentScreen('vendor-dashboard')}
          onNavigateStock={() => setCurrentScreen('vendor-stock')}
          onNavigateProfile={() => setCurrentScreen('vendor-profile')}
          onAddProduct={() => setCurrentScreen('add-product')}
          onLogout={() => {
            setCurrentScreen('role');
          }}
        />
      ) : currentScreen === 'vendor-stock' ? (
        <VendorStockScreen
          onNavigateDashboard={() => setCurrentScreen('vendor-dashboard')}
          onNavigateOrders={() => setCurrentScreen('vendor-orders')}
          onNavigateProfile={() => setCurrentScreen('vendor-profile')}
          onAddProduct={() => setCurrentScreen('add-product')}
          onLogout={() => {
            setCurrentScreen('role');
          }}
        />
      ) : currentScreen === 'vendor-profile' ? (
        <VendorProfileScreen
          onNavigateDashboard={() => setCurrentScreen('vendor-dashboard')}
          onNavigateOrders={() => setCurrentScreen('vendor-orders')}
          onNavigateStock={() => setCurrentScreen('vendor-stock')}
          onNavigateFarmSettings={() => setCurrentScreen('vendor-farm-settings')}
          onNavigatePaymentSettings={() => setCurrentScreen('vendor-payment-settings')}
          onNavigateDeliveryPreferences={() => setCurrentScreen('vendor-delivery-preferences')}
          onNavigatePayoutHistory={() => setCurrentScreen('vendor-payout-history')}
          onLogout={() => setCurrentScreen('role')}
        />
      ) : currentScreen === 'vendor-farm-settings' ? (
        <FarmSettingsScreen
          onBack={() => setCurrentScreen('vendor-profile')}
        />
      ) : currentScreen === 'vendor-payment-settings' ? (
        <PaymentSettingsScreen
          onBack={() => setCurrentScreen('vendor-profile')}
        />
      ) : currentScreen === 'vendor-delivery-preferences' ? (
        <DeliveryPreferencesScreen
          onBack={() => setCurrentScreen('vendor-profile')}
        />
      ) : currentScreen === 'vendor-payout-history' ? (
        <PayoutHistoryScreen
          onBack={() => setCurrentScreen('vendor-profile')}
        />
      ) : currentScreen === 'add-product' ? (
        <AddProductScreen
          onBack={() => setCurrentScreen('vendor-dashboard')}
          onSave={() => {
            setCurrentScreen('vendor-stock');
          }}
        />
      ) : currentScreen === 'home' ? (
        <HomeScreen
          onNavigateCategories={() => setCurrentScreen('categories')}
          onNavigateProduct={handleNavigateProduct}
          onNavigateCheckout={() => setCurrentScreen('checkout')}
          onNavigateOrders={() => setCurrentScreen('orders')}
          onNavigateProfile={() => setCurrentScreen('profile')}
        />
      ) : currentScreen === 'categories' ? (
        <CategoriesScreen
          onNavigateHome={() => setCurrentScreen('home')}
          onNavigateProduct={handleNavigateProduct}
          onNavigateCheckout={() => setCurrentScreen('checkout')}
          onNavigateOrders={() => setCurrentScreen('orders')}
          onNavigateProfile={() => setCurrentScreen('profile')}
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
          onBack={() => setCurrentScreen('home')}
          onNavigateHome={() => setCurrentScreen('home')}
          onNavigateCategories={() => setCurrentScreen('categories')}
          onNavigateOrders={() => setCurrentScreen('orders')}
          onNavigateProfile={() => setCurrentScreen('profile')}
          onPlaceOrder={() => {
            setCurrentScreen('order-success');
          }}
        />
      ) : currentScreen === 'order-success' ? (
        <OrderSuccessScreen
          onTrackOrder={() => {
            setCurrentScreen('track-order');
          }}
          onContinueShopping={() => setCurrentScreen('home')}
        />
      ) : currentScreen === 'orders' ? (
        <OrdersScreen
          onNavigateHome={() => setCurrentScreen('home')}
          onNavigateCategories={() => setCurrentScreen('categories')}
          onNavigateCheckout={() => setCurrentScreen('checkout')}
          onNavigateTrackOrder={(orderId: string) => setCurrentScreen('track-order')}
          onNavigateProfile={() => setCurrentScreen('profile')}
        />
      ) : currentScreen === 'profile' ? (
        <ProfileScreen
          onNavigateHome={() => setCurrentScreen('home')}
          onNavigateCategories={() => setCurrentScreen('categories')}
          onNavigateCheckout={() => setCurrentScreen('checkout')}
          onNavigateOrders={() => setCurrentScreen('orders')}
          onLogout={() => setCurrentScreen('role')}
          onEditProfile={() => setCurrentScreen('edit-profile')}
          onNavigateAddresses={() => setCurrentScreen('delivery-addresses')}
          onNavigatePayment={() => setCurrentScreen('payment-methods')}
          onNavigateWallet={() => setCurrentScreen('wallet')}
          onNavigateHelp={() => setCurrentScreen('help-support')}
        />
      ) : currentScreen === 'edit-profile' ? (
        <EditProfileScreen
          onBack={() => setCurrentScreen('profile')}
          onSave={() => setCurrentScreen('profile')}
        />
      ) : currentScreen === 'delivery-addresses' ? (
        <DeliveryAddressesScreen
          onBack={() => setCurrentScreen('profile')}
        />
      ) : currentScreen === 'payment-methods' ? (
        <PaymentMethodsScreen
          onBack={() => setCurrentScreen('profile')}
        />
      ) : currentScreen === 'wallet' ? (
        <WalletScreen
          onBack={() => setCurrentScreen('profile')}
        />
      ) : currentScreen === 'help-support' ? (
        <HelpSupportScreen
          onBack={() => setCurrentScreen('profile')}
        />
      ) : (
        <TrackOrderScreen
          onBack={() => setCurrentScreen('home')}
          onNavigateHome={() => setCurrentScreen('home')}
          onNavigateCategories={() => setCurrentScreen('categories')}
          onNavigateCheckout={() => setCurrentScreen('checkout')}
          onNavigateOrders={() => setCurrentScreen('orders')}
          onNavigateProfile={() => setCurrentScreen('profile')}
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
