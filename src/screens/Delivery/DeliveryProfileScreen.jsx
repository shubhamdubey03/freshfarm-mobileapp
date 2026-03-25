import React from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ChevronLeft,
    ChevronRight,
    User,
    Truck,
    FileText,
    LifeBuoy,
    Settings,
    LogOut,
    Star,
    ShieldCheck,
    Home,
    CircleDollarSign
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const ProfileItem = ({ icon: Icon, title, iconBg, color, onPress }) => (
    <TouchableOpacity style={styles.profileItem} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.itemLeft}>
            <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
                <Icon size={20} color={color} />
            </View>
            <Text style={styles.itemTitle}>{title}</Text>
        </View>
        <ChevronRight size={18} color="#CBD5E1" />
    </TouchableOpacity>
);

const DeliveryProfileScreen = ({ onBack, onLogout, onNavigateHome, onNavigateTrips, onNavigateEarnings }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerButton} onPress={onBack}>
                        <ChevronLeft size={24} color="#1E293B" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <View style={styles.headerButton} />
                </View>

                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Profile Header Section */}
                    <View style={styles.profileSection}>
                        <View style={styles.avatarWrapper}>
                            <View style={styles.avatarContainer}>
                                <View style={styles.avatarPlaceholder}>
                                    <User size={60} color="#FDBA74" />
                                </View>
                            </View>
                            <View style={styles.badgeContainer}>
                                <ShieldCheck size={16} color="#FFF" fill="#38BDF8" />
                            </View>
                        </View>

                        <Text style={styles.profileName}>Alex Thompson</Text>
                        <Text style={styles.partnerId}>Partner ID: DP-99210</Text>

                        <View style={styles.ratingBadge}>
                            <Star size={14} color="#EAB308" fill="#EAB308" />
                            <Text style={styles.ratingText}>
                                4.9 <Text style={styles.reviewsText}>(1.2k Reviews)</Text>
                            </Text>
                        </View>
                    </View>

                    {/* Account Information Section */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionLabel}>ACCOUNT INFORMATION</Text>
                    </View>

                    <View style={styles.listContainer}>
                        <ProfileItem
                            icon={User}
                            title="Personal Information"
                            iconBg="#F0F9FF"
                            color="#38BDF8"
                        />
                        <ProfileItem
                            icon={Truck}
                            title="Vehicle Details"
                            iconBg="#F0F9FF"
                            color="#38BDF8"
                        />
                        <ProfileItem
                            icon={FileText}
                            title="Documents (ID & License)"
                            iconBg="#F5F3FF"
                            color="#8B5CF6"
                        />
                    </View>

                    {/* Support & Settings Section */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionLabel}>SUPPORT & SETTINGS</Text>
                    </View>

                    <View style={styles.listContainer}>
                        <ProfileItem
                            icon={LifeBuoy}
                            title="Support Center"
                            iconBg="#F0FDF4"
                            color="#22C55E"
                        />
                        <ProfileItem
                            icon={Settings}
                            title="App Settings"
                            iconBg="#F8FAFC"
                            color="#64748B"
                        />
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity style={styles.logoutButton} onPress={onLogout} activeOpacity={0.8}>
                        <LogOut size={20} color="#64748B" />
                        <Text style={styles.logoutText}>Logout Account</Text>
                    </TouchableOpacity>

                    {/* Version Info */}
                    <Text style={styles.versionText}>VERSION 2.4.1 (BUILD 449)</Text>
                </ScrollView>
            </SafeAreaView>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateHome}>
                    <Home size={24} color="#94A3B8" />
                    <Text style={styles.navText}>HOME</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateTrips}>
                    <Truck size={24} color="#94A3B8" />
                    <Text style={styles.navText}>MY TRIPS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateEarnings}>
                    <CircleDollarSign size={24} color="#94A3B8" />
                    <Text style={styles.navText}>EARNINGS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <User size={24} color="#38BDF8" />
                    <Text style={[styles.navText, styles.activeNavText]}>PROFILE</Text>
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
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 120,
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 32,
        backgroundColor: '#FFF',
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    avatarContainer: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#FFEDD5',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFEDD5',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    badgeContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 2,
    },
    profileName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 4,
    },
    partnerId: {
        fontSize: 14,
        fontWeight: '600',
        color: '#94A3B8',
        marginBottom: 16,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFBEB',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
        borderWidth: 1,
        borderColor: '#FEF3C7',
    },
    ratingText: {
        fontSize: 13,
        fontWeight: '800',
        color: '#D97706',
    },
    reviewsText: {
        fontWeight: '500',
        color: '#F59E0B',
        opacity: 0.6,
    },
    sectionHeader: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 12,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 1,
    },
    listContainer: {
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F1F5F9',
    },
    profileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F8FAFC',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#334155',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F1F5F9',
        marginHorizontal: 20,
        marginTop: 32,
        height: 56,
        borderRadius: 16,
        gap: 10,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#64748B',
    },
    versionText: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '600',
        color: '#CBD5E1',
        marginTop: 24,
        letterSpacing: 0.5,
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

export default DeliveryProfileScreen;
