import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    Dimensions,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    MapPin,
    Clock,
    Sun,
    Moon,
    CreditCard,
    Wallet,
    Banknote,
    ArrowLeft
} from 'lucide-react-native';
import BottomTabs from '../../components/BottomTabs';

const { width } = Dimensions.get('window');

const CheckoutScreen = ({ onBack, onPlaceOrder, onNavigateHome, onNavigateCategories, onNavigateOrders, onNavigateProfile }) => {
    const [selectedSlot, setSelectedSlot] = useState('morning');
    const [paymentMethod, setPaymentMethod] = useState('upi');

    const orderItems = [
        {
            id: 1,
            name: 'Organic Tomatoes',
            weight: '1kg',
            price: 4.00,
            image: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?q=80&w=200&auto=format&fit=crop'
        },
        {
            id: 2,
            name: 'Fresh Spinach',
            weight: '500g',
            price: 2.50,
            image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=200&auto=format&fit=crop'
        }
    ];

    const subtotal = 6.50;
    const deliveryFee = 1.50;
    const total = subtotal + deliveryFee;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={onBack}
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    >
                        <ArrowLeft size={24} color="#1E293B" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Checkout</Text>
                    <View style={{ width: 44 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Delivery Address */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Delivery Address</Text>
                        <View style={styles.addressCard}>
                            <View style={styles.addressInfo}>
                                <Text style={styles.addressLabel}>Home</Text>
                                <Text style={styles.addressText}>
                                    123 Farm Lane, Green Valley, CA 90210
                                </Text>
                                <TouchableOpacity style={styles.changeButton}>
                                    <Text style={styles.changeButtonText}>Change</Text>
                                </TouchableOpacity>
                            </View>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=300&auto=format&fit=crop' }}
                                style={styles.mapImage}
                            />
                        </View>
                    </View>

                    {/* Order Items */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Order Items</Text>
                        {orderItems.map((item) => (
                            <View key={item.id} style={styles.itemCard}>
                                <Image source={{ uri: item.image }} style={styles.itemCardImage} />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemWeight}>{item.weight}</Text>
                                </View>
                                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Delivery Slot */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Delivery Slot</Text>
                        <View style={styles.slotContainer}>
                            <TouchableOpacity
                                style={[styles.slotCard, selectedSlot === 'morning' && styles.selectedSlotCard]}
                                onPress={() => setSelectedSlot('morning')}
                            >
                                <Sun size={24} color={selectedSlot === 'morning' ? '#38BDF8' : '#94A3B8'} />
                                <Text style={[styles.slotName, selectedSlot === 'morning' && styles.selectedSlotText]}>Morning</Text>
                                <Text style={styles.slotTime}>8:00 AM - 11:00 AM</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.slotCard, selectedSlot === 'evening' && styles.selectedSlotCard]}
                                onPress={() => setSelectedSlot('evening')}
                            >
                                <Moon size={24} color={selectedSlot === 'evening' ? '#38BDF8' : '#94A3B8'} />
                                <Text style={[styles.slotName, selectedSlot === 'evening' && styles.selectedSlotText]}>Evening</Text>
                                <Text style={styles.slotTime}>5:00 PM - 8:00 PM</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Payment Method */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Payment Method</Text>
                        <View style={styles.paymentContainer}>
                            <TouchableOpacity
                                style={styles.paymentOption}
                                onPress={() => setPaymentMethod('upi')}
                            >
                                <View style={[styles.radioButton, paymentMethod === 'upi' && styles.radioButtonSelected]}>
                                    {paymentMethod === 'upi' && <View style={styles.radioButtonInner} />}
                                </View>
                                <View style={styles.paymentIconBg}>
                                    <Wallet size={20} color="#1E293B" />
                                </View>
                                <Text style={styles.paymentName}>UPI (GPay/PhonePe)</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.paymentOption}
                                onPress={() => setPaymentMethod('card')}
                            >
                                <View style={[styles.radioButton, paymentMethod === 'card' && styles.radioButtonSelected]}>
                                    {paymentMethod === 'card' && <View style={styles.radioButtonInner} />}
                                </View>
                                <View style={styles.paymentIconBg}>
                                    <CreditCard size={20} color="#1E293B" />
                                </View>
                                <Text style={styles.paymentName}>Credit/Debit Card</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.paymentOption}
                                onPress={() => setPaymentMethod('cod')}
                            >
                                <View style={[styles.radioButton, paymentMethod === 'cod' && styles.radioButtonSelected]}>
                                    {paymentMethod === 'cod' && <View style={styles.radioButtonInner} />}
                                </View>
                                <View style={styles.paymentIconBg}>
                                    <Banknote size={20} color="#1E293B" />
                                </View>
                                <Text style={styles.paymentName}>Cash on Delivery</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Order Summary Card */}
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Delivery Fee</Text>
                            <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
                        </View>
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                        </View>

                        <TouchableOpacity style={styles.placeOrderButton} onPress={onPlaceOrder}>
                            <Text style={styles.placeOrderButtonText}>Place Order</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 120 }} />
                </ScrollView>
            </SafeAreaView>

            <BottomTabs
                activeTab="checkout"
                onNavigateHome={onNavigateHome}
                onNavigateCategories={onNavigateCategories}
                onNavigateCheckout={() => { }}
                onNavigateOrders={onNavigateOrders}
                onNavigateProfile={onNavigateProfile}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
    },
    scrollContent: {
        padding: 20,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 15,
    },
    addressCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    addressInfo: {
        flex: 1,
        marginRight: 15,
    },
    addressLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 8,
    },
    addressText: {
        fontSize: 13,
        color: '#64748B',
        lineHeight: 18,
        marginBottom: 12,
    },
    changeButton: {
        backgroundColor: '#F0F9FF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    changeButtonText: {
        color: '#38BDF8',
        fontSize: 13,
        fontWeight: '700',
    },
    mapImage: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    itemCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 1,
    },
    itemCardImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
    },
    itemDetails: {
        flex: 1,
        marginLeft: 15,
    },
    itemName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 4,
    },
    itemWeight: {
        fontSize: 13,
        color: '#94A3B8',
        fontWeight: '500',
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: '800',
        color: '#1E293B',
    },
    slotContainer: {
        flexDirection: 'row',
        gap: 15,
    },
    slotCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#F1F5F9',
    },
    selectedSlotCard: {
        borderColor: '#38BDF8',
        backgroundColor: '#F0F9FF',
    },
    slotName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#64748B',
        marginTop: 10,
        marginBottom: 4,
    },
    selectedSlotText: {
        color: '#38BDF8',
    },
    slotTime: {
        fontSize: 11,
        color: '#94A3B8',
        fontWeight: '500',
    },
    paymentContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    radioButtonSelected: {
        borderColor: '#38BDF8',
    },
    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#38BDF8',
    },
    paymentIconBg: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    paymentName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1E293B',
    },
    summaryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 15,
        elevation: 5,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    totalRow: {
        marginTop: 10,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        marginBottom: 20,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    summaryValue: {
        fontSize: 14,
        color: '#1E293B',
        fontWeight: '700',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#38BDF8',
    },
    placeOrderButton: {
        backgroundColor: '#38BDF8',
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 4,
    },
    placeOrderButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '800',
    },
});

export default CheckoutScreen;
