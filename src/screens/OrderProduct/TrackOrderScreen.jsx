import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar,
    Dimensions,
} from 'react-native';
import {
    ArrowLeft,
    MoreVertical,
    CheckCircle2,
    Package,
    Truck,
    Home,
    MessageSquare,
    PhoneCall,
    Star
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabs from '../../components/BottomTabs';

const { width } = Dimensions.get('window');

const TrackOrderScreen = ({ onBack, onNavigateHome, onNavigateCategories, onNavigateCheckout, onNavigateOrders, onNavigateProfile }) => {
    const trackingSteps = [
        {
            id: 1,
            title: 'Order Placed',
            time: '08:30 AM, Oct 24',
            description: 'Received by Farmer',
            status: 'completed'
        },
        {
            id: 2,
            title: 'Picked Up',
            time: '10:15 AM, Oct 24',
            description: 'Fresh produce collected',
            status: 'completed'
        },
        {
            id: 3,
            title: 'Out for Delivery',
            time: 'Currently 2.4 miles away',
            description: 'Your courier is on the way',
            status: 'active'
        },
        {
            id: 4,
            title: 'Delivered',
            time: 'Estimated by 2:45 PM',
            description: 'Waiting to reach your doorstep',
            status: 'pending'
        }
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={onBack}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <ArrowLeft size={24} color="#1E293B" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Track Order</Text>
                    <TouchableOpacity style={styles.moreButton}>
                        <MoreVertical size={24} color="#1E293B" />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Map Section */}
                    <View style={styles.mapContainer}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop' }}
                            style={styles.mapImage}
                        />
                        <View style={styles.mapOverlay}>
                            {/* Visual representation of a rider on map would go here */}
                        </View>
                    </View>

                    {/* Order Info Card */}
                    <View style={styles.infoCard}>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>ORDER ID</Text>
                            <Text style={styles.infoValue}>#FARM-99283-X</Text>
                        </View>
                        <View style={[styles.infoBox, { alignItems: 'flex-end' }]}>
                            <Text style={styles.infoLabel}>ESTIMATED DELIVERY</Text>
                            <Text style={styles.infoValue}>Today, 2:45 PM</Text>
                        </View>
                    </View>

                    {/* Tracking Stepper */}
                    <View style={styles.stepperContainer}>
                        {trackingSteps.map((step, index) => (
                            <View key={step.id} style={styles.stepItem}>
                                <View style={styles.stepLeft}>
                                    <View style={[
                                        styles.stepIconContainer,
                                        step.status === 'completed' && styles.stepIconCompleted,
                                        step.status === 'active' && styles.stepIconActive,
                                        step.status === 'pending' && styles.stepIconPending
                                    ]}>
                                        {step.id === 1 && <CheckCircle2 size={20} color={step.status === 'pending' ? '#94A3B8' : '#fff'} />}
                                        {step.id === 2 && <Package size={20} color={step.status === 'pending' ? '#94A3B8' : '#fff'} />}
                                        {step.id === 3 && <Truck size={20} color={step.status === 'pending' ? '#94A3B8' : '#fff'} />}
                                        {step.id === 4 && <Home size={20} color={step.status === 'pending' ? '#94A3B8' : '#fff'} />}
                                    </View>
                                    {index !== trackingSteps.length - 1 && (
                                        <View style={[
                                            styles.stepLine,
                                            step.status === 'completed' && styles.stepLineCompleted
                                        ]} />
                                    )}
                                </View>
                                <View style={styles.stepRight}>
                                    <Text style={[
                                        styles.stepTitle,
                                        step.status === 'pending' && styles.stepTitlePending,
                                        step.status === 'active' && styles.stepTitleActive
                                    ]}>
                                        {step.title}
                                    </Text>
                                    <View style={styles.stepMeta}>
                                        <Text style={styles.stepTime}>{step.time}</Text>
                                        <Text style={styles.stepDot}>•</Text>
                                        <Text style={styles.stepDesc}>{step.description}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Delivery Partner */}
                    <Text style={styles.sectionTitle}>Delivery Partner</Text>
                    <View style={styles.partnerCard}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1540560085459-0aea9b4b8c5e?q=80&w=200&auto=format&fit=crop' }}
                            style={styles.avatar}
                        />
                        <View style={styles.partnerInfo}>
                            <Text style={styles.partnerName}>Robert Green</Text>
                            <View style={styles.ratingRow}>
                                <Star size={14} color="#FBBF24" fill="#FBBF24" />
                                <Text style={styles.ratingText}>4.9 <Text style={styles.ratingCount}>(120+ deliveries)</Text></Text>
                            </View>
                        </View>
                        <View style={styles.actionButtons}>
                            <TouchableOpacity style={styles.actionButton}>
                                <MessageSquare size={20} color="#38BDF8" fill="#F0F9FF" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
                                <PhoneCall size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ height: 40 }} />
                </ScrollView>
            </SafeAreaView>

            <BottomTabs
                activeTab="orders"
                onNavigateHome={onNavigateHome}
                onNavigateCategories={onNavigateCategories}
                onNavigateCheckout={onNavigateCheckout}
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
        borderRadius: 15,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
    },
    moreButton: {
        width: 44,
        height: 44,
        borderRadius: 15,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        padding: 20,
    },
    mapContainer: {
        width: '100%',
        height: 180,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: '#E2E8F0',
    },
    mapImage: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    infoBox: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: '#38BDF8',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
    },
    stepperContainer: {
        paddingLeft: 10,
        marginBottom: 30,
    },
    stepItem: {
        flexDirection: 'row',
        minHeight: 70,
    },
    stepLeft: {
        alignItems: 'center',
        marginRight: 20,
    },
    stepIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    stepIconCompleted: {
        backgroundColor: '#38BDF8',
    },
    stepIconActive: {
        backgroundColor: '#38BDF8',
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    stepIconPending: {
        backgroundColor: '#F1F5F9',
    },
    stepLine: {
        width: 2,
        flex: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 4,
    },
    stepLineCompleted: {
        backgroundColor: '#38BDF8',
    },
    stepRight: {
        flex: 1,
        paddingBottom: 25,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 4,
    },
    stepTitleActive: {
        color: '#38BDF8',
    },
    stepTitlePending: {
        color: '#94A3B8',
    },
    stepMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stepTime: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
    },
    stepDot: {
        marginHorizontal: 8,
        color: '#CBD5E1',
    },
    stepDesc: {
        fontSize: 13,
        color: '#94A3B8',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 15,
    },
    partnerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 18,
        backgroundColor: '#F1F5F9',
    },
    partnerInfo: {
        flex: 1,
        marginLeft: 15,
    },
    partnerName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 4,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1E293B',
        marginLeft: 4,
    },
    ratingCount: {
        fontWeight: '500',
        color: '#94A3B8',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        width: 44,
        height: 44,
        borderRadius: 15,
        backgroundColor: '#F0F9FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    callButton: {
        backgroundColor: '#38BDF8',
    }
});

export default TrackOrderScreen;
