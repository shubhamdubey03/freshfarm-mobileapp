import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Dimensions,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
    ChevronLeft, 
    Calendar,
    Home,
    Truck,
    CircleDollarSign,
    User,
    Wallet,
    Package,
    Gift,
    TrendingUp
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const TransactionItem = ({ icon: Icon, title, date, amount, iconBg }) => (
    <View style={styles.transactionItem}>
        <View style={styles.transactionLeft}>
            <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
                <Icon size={20} color={iconBg === '#F0FDF4' ? '#22C55E' : '#EAB308'} />
            </View>
            <View>
                <Text style={styles.transactionTitle}>{title}</Text>
                <Text style={styles.transactionDate}>{date}</Text>
            </View>
        </View>
        <Text style={styles.transactionAmount}>+${amount}</Text>
    </View>
);

const WeeklyBar = ({ day, height, active }) => (
    <View style={styles.barContainer}>
        <View style={[styles.bar, { height: height }, active && styles.activeBar]} />
        <Text style={[styles.dayText, active && styles.activeDayText]}>{day}</Text>
    </View>
);

const EarningsScreen = ({ onBack, onNavigateHome, onNavigateTrips, onNavigateProfile }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerButton} onPress={onBack}>
                        <ChevronLeft size={24} color="#1E293B" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Earnings</Text>
                    <TouchableOpacity style={[styles.headerButton, styles.calendarButton]}>
                        <Calendar size={20} color="#64748B" />
                    </TouchableOpacity>
                </View>

                <ScrollView 
                    style={styles.scrollView} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Earnings Card */}
                    <LinearGradient
                        colors={['#38BDF8', '#0EA5E9']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.earningsCard}
                    >
                        <View>
                            <Text style={styles.earningsLabel}>Today's Earnings</Text>
                            <Text style={styles.earningsValue}>$142.50</Text>
                        </View>
                        
                        <View style={styles.divider} />
                        
                        <View style={styles.weeklyRow}>
                            <View>
                                <Text style={styles.weeklyLabel}>TOTAL WEEKLY BALANCE</Text>
                                <Text style={styles.weeklyValue}>$854.20</Text>
                            </View>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>+12% vs last week</Text>
                            </View>
                        </View>
                    </LinearGradient>

                    {/* Weekly Activity */}
                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Weekly Activity</Text>
                            <Text style={styles.sectionSubtitle}>Last 7 Days</Text>
                        </View>
                        
                        <View style={styles.chartContainer}>
                            <WeeklyBar day="MON" height={40} />
                            <WeeklyBar day="TUE" height={60} />
                            <WeeklyBar day="WED" height={50} />
                            <WeeklyBar day="THU" height={70} />
                            <WeeklyBar day="FRI" height={45} />
                            <WeeklyBar day="SAT" height={0} />
                            <WeeklyBar day="SUN" height={90} active />
                        </View>
                    </View>

                    {/* Transaction History */}
                    <View style={styles.transactionHeader}>
                        <Text style={styles.sectionTitle}>Transaction History</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <TransactionItem 
                        icon={Package} 
                        title="Delivery Payout"
                        date="Oct 24, 2023 • 2:30 PM"
                        amount="12.40"
                        iconBg="#F0FDF4"
                    />
                    <TransactionItem 
                        icon={Gift} 
                        title="Weekly Bonus"
                        date="Oct 23, 2023 • 9:00 AM"
                        amount="50.00"
                        iconBg="#FEF9C3"
                    />
                    <TransactionItem 
                        icon={Package} 
                        title="Delivery Payout"
                        date="Oct 23, 2023 • 4:15 PM"
                        amount="18.20"
                        iconBg="#F0FDF4"
                    />
                    <TransactionItem 
                        icon={Package} 
                        title="Delivery Payout"
                        date="Oct 22, 2023 • 11:45 AM"
                        amount="14.50"
                        iconBg="#F0FDF4"
                    />

                    {/* Withdraw Button */}
                    <TouchableOpacity style={styles.withdrawButton} activeOpacity={0.8}>
                        <Wallet size={20} color="#FFF" />
                        <Text style={styles.withdrawButtonText}>Withdraw Funds</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>

            {/* Bottom Nav */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateHome}>
                    <Home size={24} color="#94A3B8" />
                    <Text style={styles.navText}>HOME</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateTrips}>
                    <Truck size={24} color="#94A3B8" />
                    <Text style={styles.navText}>MY TRIPS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <CircleDollarSign size={24} color="#38BDF8" />
                    <Text style={[styles.navText, styles.activeNavText]}>EARNINGS</Text>
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
        backgroundColor: '#FFF',
    },
    headerButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarButton: {
        backgroundColor: '#F1F5F9',
        borderRadius: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 120,
    },
    earningsCard: {
        padding: 24,
        borderRadius: 28,
        marginBottom: 20,
        shadowColor: '#0EA5E9',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 8,
    },
    earningsLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 4,
    },
    earningsValue: {
        fontSize: 36,
        fontWeight: '800',
        color: '#FFF',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginVertical: 20,
    },
    weeklyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    weeklyLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: 'rgba(255, 255, 255, 0.7)',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    weeklyValue: {
        fontSize: 22,
        fontWeight: '800',
        color: '#FFF',
    },
    badge: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#FFF',
    },
    sectionCard: {
        backgroundColor: '#FFF',
        borderRadius: 28,
        padding: 24,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: '#1E293B',
    },
    sectionSubtitle: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '600',
    },
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 120,
        paddingBottom: 20,
    },
    barContainer: {
        alignItems: 'center',
        flex: 1,
    },
    bar: {
        width: 28,
        backgroundColor: '#E0F2FE',
        borderRadius: 14,
        marginBottom: 8,
    },
    activeBar: {
        backgroundColor: '#38BDF8',
    },
    dayText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94A3B8',
    },
    activeDayText: {
        color: '#38BDF8',
    },
    transactionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    viewAllText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#38BDF8',
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 24,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transactionTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 2,
    },
    transactionDate: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1E293B',
    },
    withdrawButton: {
        backgroundColor: '#38BDF8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        borderRadius: 16,
        gap: 8,
        marginTop: 12,
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    withdrawButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '800',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 32 : 16,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
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

export default EarningsScreen;
