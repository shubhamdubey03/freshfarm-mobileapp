import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Image,
    Dimensions
} from 'react-native';
import {
    Warehouse,
    TrendingUp,
    Package,
    Users,
    ArrowRight,
    Plus,
    Bell,
    Settings,
    Grid,
    BarChart2,
    LogOut
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const CollectionCenterDashboardScreen = ({ onLogout, onNavigateProfile }) => {
    // Mock data for stats
    const stats = [
        { id: 1, title: 'Total Collected', value: '450 kg', icon: Package, color: '#0EA5E9' },
        { id: 2, title: 'Active Farmers', value: '24', icon: Users, color: '#10B981' },
        { id: 3, title: 'Pending Pickup', value: '12', icon: TrendingUp, color: '#F59E0B' },
        { id: 4, title: 'Center Status', value: 'Open', icon: Warehouse, color: '#6366F1' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Welcome back,</Text>
                    <Text style={styles.centerName}>Green Valley Center</Text>
                </View>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Bell size={24} color="#64748B" />
                        <View style={styles.notificationBadge} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileToggle}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop' }}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    {stats.map((stat) => (
                        <View key={stat.id} style={styles.statCard}>
                            <View style={[styles.statIconContainer, { backgroundColor: stat.color + '15' }]}>
                                <stat.icon size={24} color={stat.color} />
                            </View>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statTitle}>{stat.title}</Text>
                        </View>
                    ))}
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionRow}>
                        <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#F0F9FF' }]}>
                            <View style={[styles.actionIcon, { backgroundColor: '#38BDF8' }]}>
                                <Plus size={24} color="#fff" />
                            </View>
                            <Text style={styles.actionLabel}>New Collection</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#F0FDF4' }]}>
                            <View style={[styles.actionIcon, { backgroundColor: '#10B981' }]}>
                                <BarChart2 size={24} color="#fff" />
                            </View>
                            <Text style={styles.actionLabel}>View Reports</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Recent Collections */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Collections</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {[1, 2, 3].map((item) => (
                        <TouchableOpacity key={item} style={styles.collectionItem}>
                            <View style={styles.collectionInfo}>
                                <View style={styles.farmerAvatar}>
                                    <Text style={styles.avatarText}>RK</Text>
                                </View>
                                <View>
                                    <Text style={styles.farmerName}>Ram Kumar</Text>
                                    <Text style={styles.collectionDate}>Today, 10:30 AM • Tomatoes</Text>
                                </View>
                            </View>
                            <View style={styles.collectionStatus}>
                                <Text style={styles.weightText}>45 kg</Text>
                                <ArrowRight size={16} color="#94A3B8" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                    <LogOut size={20} color="#EF4444" />
                    <Text style={styles.logoutText}>Logout Session</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    greeting: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    centerName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0F172A',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#EF4444',
        borderWidth: 2,
        borderColor: '#fff',
    },
    profileToggle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#F1F5F9',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        gap: 12,
    },
    statCard: {
        width: (width - 44) / 2,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 1,
    },
    statIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },
    statTitle: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
    },
    section: {
        paddingHorizontal: 24,
        marginTop: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 16,
    },
    seeAll: {
        fontSize: 14,
        color: '#38BDF8',
        fontWeight: '600',
    },
    actionRow: {
        flexDirection: 'row',
        gap: 16,
    },
    actionCard: {
        flex: 1,
        padding: 20,
        borderRadius: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    actionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
    },
    collectionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    collectionInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    farmerAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F0F9FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#38BDF8',
        fontWeight: '700',
        fontSize: 14,
    },
    farmerName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1E293B',
    },
    collectionDate: {
        fontSize: 12,
        color: '#64748B',
    },
    collectionStatus: {
        alignItems: 'flex-end',
        gap: 4,
    },
    weightText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0EA5E9',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 24,
        marginTop: 32,
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#FEF2F2',
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EF4444',
    },
});

export default CollectionCenterDashboardScreen;
