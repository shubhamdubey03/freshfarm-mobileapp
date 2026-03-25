import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    StatusBar,
    Dimensions,
    Platform,
    Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Menu,
    Bell,
    Navigation,
    Home,
    Truck,
    CircleDollarSign,
    User,
    Play,
    Leaf,
    Egg
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const AssignedDeliveryCard = ({ id, item, price, pickup, dropoff, distance, isActive, onStartTrip }) => (
    <View style={styles.deliveryCard}>
        <View style={styles.deliveryHeader}>
            <View style={styles.itemInfo}>
                <View style={[styles.itemIconContainer, { backgroundColor: isActive ? '#F0F9FF' : '#F8FAFC' }]}>
                    {id.includes('8291') ? (
                        <Leaf size={20} color={isActive ? '#38BDF8' : '#94A3B8'} />
                    ) : (
                        <Egg size={20} color={isActive ? '#38BDF8' : '#94A3B8'} />
                    )}
                </View>
                <View>
                    <Text style={styles.orderIdText}>Order #{id}</Text>
                    <Text style={styles.itemText}>{item}</Text>
                </View>
            </View>
            <Text style={[styles.priceText, { color: isActive ? '#38BDF8' : '#1E293B' }]}>${price}</Text>
        </View>

        <View style={styles.routeContainer}>
            {/* Timeline Line */}
            <View style={styles.timelineLine} />

            {/* Pickup */}
            <View style={styles.routePoint}>
                <View style={[styles.pointDot, { backgroundColor: isActive ? '#38BDF8' : '#CBD5E1' }]} />
                <View>
                    <Text style={styles.pointLabel}>PICKUP FROM</Text>
                    <Text style={styles.pointName}>{pickup}</Text>
                    {distance && <Text style={styles.distanceText}>{distance} from your location</Text>}
                </View>
            </View>

            {/* Dropdown */}
            <View style={[styles.routePoint, { marginTop: 24 }]}>
                <View style={[styles.pointDotHollow, { borderColor: isActive ? '#38BDF8' : '#CBD5E1' }]} />
                <View>
                    <Text style={styles.pointLabel}>DROP-OFF TO</Text>
                    <Text style={styles.pointName}>{dropoff}</Text>
                    {id.includes('8291') && <Text style={styles.addressText}>452 Maple Ave, Oak Ridge</Text>}
                </View>
            </View>
        </View>

        {isActive && (
            <TouchableOpacity style={styles.startTripButton} activeOpacity={0.8} onPress={onStartTrip}>
                <Play size={20} color="#FFF" fill="#FFF" />
                <Text style={styles.startTripText}>Start Trip</Text>
            </TouchableOpacity>
        )}
    </View>
);

const DeliveryDashboardScreen = ({ onLogout, onNavigateProfile, onStartTrip, onNavigateTrips, onNavigateEarnings }) => {
    const [isOnline, setIsOnline] = useState(true);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                {/* Custom Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerIconButton}>
                        <Menu size={24} color="#1E293B" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Delivery Partner</Text>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Bell size={24} color="#38BDF8" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Duty Status Card */}
                    <View style={styles.statusCard}>
                        <View>
                            <Text style={styles.statusTitle}>Duty Status</Text>
                            <Text style={styles.statusSubtitle}>
                                You are currently {isOnline ? 'online' : 'offline'}
                            </Text>
                        </View>
                        <Switch
                            trackColor={{ false: '#E2E8F0', true: '#BAE6FD' }}
                            thumbColor={isOnline ? '#38BDF8' : '#94A3B8'}
                            ios_backgroundColor="#E2E8F0"
                            onValueChange={() => setIsOnline(!isOnline)}
                            value={isOnline}
                        />
                    </View>

                    {/* Map Section */}
                    <View style={styles.mapCard}>
                        <Image
                            style={styles.mapImage}
                        />
                        <View style={styles.mapOverlay}>
                            <View style={styles.locationChip}>
                                <Navigation size={14} color="#38BDF8" fill="#38BDF8" />
                                <Text style={styles.locationText}>Near Green Valley Farm</Text>
                            </View>
                        </View>
                    </View>

                    {/* Assigned Deliveries Header */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Assigned Deliveries</Text>
                        <View style={styles.activeBadge}>
                            <Text style={styles.activeBadgeText}>2 ACTIVE</Text>
                        </View>
                    </View>

                    {/* Delivery Cards */}
                    <AssignedDeliveryCard
                        id="FARM-8291"
                        item="Organic Veggie Box"
                        price="12.50"
                        pickup="Sunshine Organics Farm"
                        dropoff="James Anderson"
                        distance="2.4 km"
                        isActive={true}
                        onStartTrip={onStartTrip}
                    />

                    <AssignedDeliveryCard
                        id="FARM-8302"
                        item="Fresh Poultry Pack"
                        price="8.20"
                        pickup="Meadow Brook Poultry"
                        dropoff="Sarah Jenkins"
                        isActive={false}
                    />
                </ScrollView>
            </SafeAreaView>

            {/* Bottom Tab Bar */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Home size={24} color="#38BDF8" />
                    <Text style={[styles.navText, styles.activeNavText]}>HOME</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateTrips}>
                    <Truck size={24} color="#94A3B8" />
                    <Text style={styles.navText}>MY TRIPS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateEarnings}>
                    <CircleDollarSign size={24} color="#94A3B8" />
                    <Text style={styles.navText}>EARNINGS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateProfile}>
                    <User size={24} color="#94A3B8" />
                    <Text style={styles.navText}>PROFILE</Text>
                </TouchableOpacity>
            </View>
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
        height: 60,
    },
    headerIconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
    },
    notificationButton: {
        width: 40,
        height: 40,
        backgroundColor: '#F0F9FF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 100,
    },
    statusCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    statusTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 4,
    },
    statusSubtitle: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
    },
    mapCard: {
        height: 180,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 24,
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
    mapOverlay: {
        position: 'absolute',
        bottom: 12,
        left: 12,
    },
    locationChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    locationText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#38BDF8',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
    },
    activeBadge: {
        backgroundColor: '#F0F9FF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    activeBadgeText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#38BDF8',
    },
    deliveryCard: {
        backgroundColor: '#FFF',
        borderRadius: 28,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    deliveryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    itemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    itemIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderIdText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#94A3B8',
    },
    itemText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#1E293B',
    },
    priceText: {
        fontSize: 16,
        fontWeight: '800',
    },
    routeContainer: {
        marginBottom: 24,
        paddingLeft: 4,
    },
    timelineLine: {
        position: 'absolute',
        left: 7.5,
        top: 20,
        bottom: 20,
        width: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    routePoint: {
        flexDirection: 'row',
        gap: 16,
    },
    pointDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginTop: 4,
        borderWidth: 3,
        borderColor: '#FFF',
        elevation: 1,
    },
    pointDotHollow: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginTop: 4,
        borderWidth: 2,
        backgroundColor: '#FFF',
    },
    pointLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    pointName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
    },
    distanceText: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
        marginTop: 2,
    },
    addressText: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
        marginTop: 2,
    },
    startTripButton: {
        backgroundColor: '#38BDF8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        borderRadius: 28,
        gap: 8,
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    startTripText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '800',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 32 : 16,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
    },
    navText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94A3B8',
        marginTop: 6,
    },
    activeNavText: {
        color: '#38BDF8',
    },
});

export default DeliveryDashboardScreen;
