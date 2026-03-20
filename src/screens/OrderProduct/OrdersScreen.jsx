import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar,
    TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, ChevronRight, Clock, Package, CheckCircle2, Truck, RefreshCcw, Star } from 'lucide-react-native';
import BottomTabs from '../../components/BottomTabs';

const { width } = Dimensions.get('window');

const OngoingOrders = [
    {
        id: 'FARM-8291',
        date: 'Oct 24, 2023',
        time: '10:30 AM',
        status: 'IN TRANSIT',
        statusColor: '#0EA5E9',
        statusBg: '#E0F2FE',
        total: '34.20',
        items: [
            { id: 1, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=400&auto=format&fit=crop' },
            { id: 2, image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?q=80&w=400&auto=format&fit=crop' }
        ],
        itemCount: 5,
        mainItems: 'Strawberry, Broccoli'
    },
    {
        id: 'FARM-7721',
        date: 'Oct 23, 2023',
        time: '04:15 PM',
        status: 'PROCESSING',
        statusColor: '#F59E0B',
        statusBg: '#FEF3C7',
        total: '12.50',
        items: [
            { id: 3, image: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?q=80&w=400&auto=format&fit=crop' }
        ],
        itemCount: 2,
        mainItems: 'Red Tomatoes'
    }
];

const PastOrders = [
    {
        id: 'FARM-6102',
        date: 'Oct 18, 2023',
        time: '09:20 AM',
        status: 'DELIVERED',
        statusColor: '#10B981',
        statusBg: '#D1FAE5',
        total: '19.95',
        items: [
            { id: 4, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=400&auto=format&fit=crop' }
        ],
        itemCount: 1,
        mainItems: 'Premium Wheat Bundle'
    }
];

const OrdersScreen = ({ onNavigateHome, onNavigateCategories, onNavigateCheckout, onNavigateTrackOrder, onNavigateProfile }) => {
    const [activeTab, setActiveTab] = useState('Ongoing');

    const renderOrderCard = (order) => {
        const isOngoing = activeTab === 'Ongoing';

        return (
            <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                    <View>
                        <Text style={styles.orderNumber}>ORDER ID: #{order.id}</Text>
                        <Text style={styles.orderDate}>{order.date} • {order.time}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: order.statusBg }]}>
                        <Text style={[styles.statusText, { color: order.statusColor }]}>{order.status}</Text>
                    </View>
                </View>

                <View style={styles.orderBody}>
                    <View style={styles.itemsPreview}>
                        {order.items.map((item, index) => (
                            <View key={item.id} style={[styles.itemImageWrapper, { zIndex: 10 - index }]}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                            </View>
                        ))}
                        {order.itemCount > order.items.length && (
                            <View style={styles.moreItemsBadge}>
                                <Text style={styles.moreItemsText}>+{order.itemCount - order.items.length}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.orderInfo}>
                        <Text style={styles.itemNames} numberOfLines={1}>
                            {order.mainItems} {order.itemCount > order.items.length ? `+ ${order.itemCount - order.items.length} more` : ''}
                        </Text>
                        <Text style={styles.orderTotal}>${order.total}</Text>
                    </View>
                </View>

                <View style={styles.orderActions}>
                    {isOngoing ? (
                        <>
                            <TouchableOpacity
                                style={styles.trackButton}
                                onPress={() => onNavigateTrackOrder(order.id)}
                            >
                                <Text style={styles.trackButtonText}>Track Order</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.detailsButton}>
                                <Text style={styles.detailsButtonText}>Details</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity style={styles.reorderButton}>
                                <RefreshCcw size={16} color="#38BDF8" style={{ marginRight: 6 }} />
                                <Text style={styles.reorderButtonText}>Reorder</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rateButton}>
                                <Star size={16} color="#64748B" style={{ marginRight: 6 }} />
                                <Text style={styles.rateButtonText}>Rate</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Orders</Text>
                    <TouchableOpacity style={styles.searchButton}>
                        <Search size={22} color="#1E293B" />
                    </TouchableOpacity>
                </View>

                {/* Custom Tab Switcher */}
                <View style={styles.tabContainer}>
                    <View style={styles.tabBackground}>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'Ongoing' && styles.activeTab]}
                            onPress={() => setActiveTab('Ongoing')}
                        >
                            <Text style={[styles.tabText, activeTab === 'Ongoing' && styles.activeTabText]}>Ongoing</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'Past Orders' && styles.activeTab]}
                            onPress={() => setActiveTab('Past Orders')}
                        >
                            <Text style={[styles.tabText, activeTab === 'Past Orders' && styles.activeTabText]}>Past Orders</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 120 }}
                >
                    {activeTab === 'Ongoing' ? (
                        OngoingOrders.map(order => renderOrderCard(order))
                    ) : (
                        <>
                            <Text style={styles.sectionHeading}>PAST ORDERS</Text>
                            {PastOrders.map(order => renderOrderCard(order))}
                        </>
                    )}
                </ScrollView>
            </SafeAreaView>

            <BottomTabs
                activeTab="orders"
                onNavigateHome={onNavigateHome}
                onNavigateCategories={onNavigateCategories}
                onNavigateCheckout={onNavigateCheckout}
                onNavigateOrders={() => { }}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1E293B',
    },
    searchButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    tabBackground: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        borderRadius: 15,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 12,
    },
    activeTab: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#94A3B8',
    },
    activeTabText: {
        color: '#38BDF8',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    sectionHeading: {
        fontSize: 12,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 1,
        marginBottom: 15,
        marginTop: 5,
    },
    orderCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    orderNumber: {
        fontSize: 12,
        fontWeight: '700',
        color: '#94A3B8',
        marginBottom: 4,
    },
    orderDate: {
        fontSize: 13,
        color: '#64748B',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '800',
    },
    orderBody: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    itemsPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    itemImageWrapper: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        overflow: 'hidden',
        marginLeft: -15,
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    moreItemsBadge: {
        width: 35,
        height: 35,
        borderRadius: 10,
        backgroundColor: '#F0F9FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        borderWidth: 1,
        borderColor: '#E0F2FE',
    },
    moreItemsText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0EA5E9',
    },
    orderInfo: {
        flex: 1,
    },
    itemNames: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 4,
    },
    orderTotal: {
        fontSize: 18,
        fontWeight: '800',
        color: '#38BDF8',
    },
    orderActions: {
        flexDirection: 'row',
        gap: 12,
    },
    trackButton: {
        flex: 2,
        height: 48,
        backgroundColor: '#38BDF8',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    trackButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
    detailsButton: {
        flex: 1,
        height: 48,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    detailsButtonText: {
        color: '#1E293B',
        fontSize: 14,
        fontWeight: '600',
    },
    reorderButton: {
        flex: 2,
        height: 48,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#38BDF8',
        flexDirection: 'row',
    },
    reorderButtonText: {
        color: '#38BDF8',
        fontSize: 14,
        fontWeight: '700',
    },
    rateButton: {
        flex: 1,
        height: 48,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        flexDirection: 'row',
    },
    rateButtonText: {
        color: '#64748B',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default OrdersScreen;
