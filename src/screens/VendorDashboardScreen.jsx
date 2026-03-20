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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
    Bell, 
    ShoppingBasket, 
    DollarSign, 
    TrendingUp, 
    LayoutDashboard, 
    ClipboardList, 
    Package, 
    User, 
    Plus 
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const StatCard = ({ title, value, percentage, icon: Icon, color }) => (
    <View style={styles.statCard}>
        <View style={styles.statHeader}>
            <Text style={styles.statTitle}>{title}</Text>
            <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
                <Icon size={20} color={color} />
            </View>
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <View style={styles.statFooter}>
            <TrendingUp size={16} color="#10B981" />
            <Text style={styles.statPercentage}>{percentage}</Text>
        </View>
    </View>
);

const ProductItem = ({ name, category, sales, image }) => (
    <View style={styles.productItem}>
        <Image source={{ uri: image }} style={styles.productImage} />
        <View style={styles.productInfo}>
            <Text style={styles.productName}>{name}</Text>
            <Text style={styles.productCategory}>{category}</Text>
        </View>
        <View style={styles.productSales}>
            <Text style={styles.salesCount}>{sales}</Text>
            <Text style={styles.salesLabel}>SALES</Text>
        </View>
    </View>
);

const VendorDashboardScreen = ({ onNavigateOrders, onNavigateStock, onNavigateProfile, onAddProduct, onLogout }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            {/* Header Section */}
            <LinearGradient
                colors={['#38BDF8', '#0EA5E9']}
                style={styles.header}
            >
                <SafeAreaView edges={['top']}>
                    <View style={styles.headerContent}>
                        <View style={styles.userInfo}>
                            <Image 
                                source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400' }} 
                                style={styles.avatar} 
                            />
                            <View>
                                <Text style={styles.welcomeText}>Welcome back,</Text>
                                <Text style={styles.userName}>Green Valley Farm</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.notificationButton}>
                            <Bell size={24} color="#FFF" />
                            <View style={styles.notificationDot} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView 
                style={styles.scrollView} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <StatCard 
                        title="TODAY'S ORDERS" 
                        value="24" 
                        percentage="+12%" 
                        icon={ShoppingBasket} 
                        color="#38BDF8"
                    />
                    <StatCard 
                        title="REVENUE" 
                        value="$1,240" 
                        percentage="+5%" 
                        icon={DollarSign} 
                        color="#10B981"
                    />
                </View>

                {/* Performance Chart Placeholder */}
                <View style={styles.performanceCard}>
                    <View style={styles.performanceHeader}>
                        <Text style={styles.performanceTitle}>Weekly Performance</Text>
                        <TouchableOpacity>
                            <Text style={styles.detailsLink}>Details</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.chartPlaceholder}>
                        {/* Mock Chart using SVG */}
                        <Svg height="120" width={width - 80}>
                            <Path
                                d="M0,80 Q40,60 80,100 T160,40 T240,60 T320,20"
                                fill="none"
                                stroke="#38BDF8"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </Svg>
                        <View style={styles.chartLabels}>
                            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                                <Text key={day} style={styles.dayLabel}>{day}</Text>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Top Products */}
                <View style={styles.productsSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Top Selling Products</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllLink}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <ProductItem 
                        name="Organic Tomatoes" 
                        category="Fresh Harvest" 
                        sales="482" 
                        image="https://images.unsplash.com/photo-1546473427-e1e6666ba379?w=200"
                    />
                    <ProductItem 
                        name="Fresh Eggs" 
                        category="Free Range" 
                        sales="356" 
                        image="https://images.unsplash.com/photo-1582722872445-44dc5f7e3cdd?w=200"
                    />
                    <ProductItem 
                        name="Organic Kale" 
                        category="Superfood" 
                        sales="214" 
                        image="https://images.unsplash.com/photo-1524179524662-13c2859b416e?w=200"
                    />
                </View>
            </ScrollView>

            {/* Fab Button */}
            <TouchableOpacity style={styles.fab} onPress={onAddProduct}>
                <Plus size={32} color="#FFF" />
            </TouchableOpacity>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <LayoutDashboard size={24} color="#38BDF8" />
                    <Text style={[styles.navText, styles.activeNavText]}>DASHBOARD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateOrders}>
                    <ClipboardList size={24} color="#94A3B8" />
                    <Text style={styles.navText}>ORDERS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateStock}>
                    <Package size={24} color="#94A3B8" />
                    <Text style={styles.navText}>STOCK</Text>
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
    header: {
        paddingBottom: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    welcomeText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        fontWeight: '500',
    },
    userName: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '800',
    },
    notificationButton: {
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationDot: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 8,
        height: 8,
        backgroundColor: '#FF4B4B',
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#38BDF8',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 100,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 20,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    statHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    statTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: '#94A3B8',
        maxWidth: '70%',
    },
    iconBox: {
        padding: 8,
        borderRadius: 12,
    },
    statValue: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 4,
    },
    statFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statPercentage: {
        fontSize: 14,
        fontWeight: '700',
        color: '#10B981',
    },
    performanceCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    performanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    performanceTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
    },
    detailsLink: {
        fontSize: 14,
        fontWeight: '700',
        color: '#38BDF8',
    },
    chartPlaceholder: {
        alignItems: 'center',
    },
    chartLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    dayLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94A3B8',
    },
    productsSection: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
    },
    viewAllLink: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    productImage: {
        width: 56,
        height: 56,
        borderRadius: 16,
    },
    productInfo: {
        flex: 1,
        marginLeft: 16,
    },
    productName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
    },
    productCategory: {
        fontSize: 13,
        color: '#94A3B8',
        fontWeight: '500',
    },
    productSales: {
        alignItems: 'flex-end',
        paddingRight: 8,
    },
    salesCount: {
        fontSize: 16,
        fontWeight: '800',
        color: '#38BDF8',
    },
    salesLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94A3B8',
    },
    fab: {
        position: 'absolute',
        right: 24,
        bottom: 84,
        width: 64,
        height: 64,
        backgroundColor: '#38BDF8',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingTop: 12,
        paddingBottom: 24,
        paddingHorizontal: 12,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 20,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    navText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94A3B8',
        marginTop: 4,
    },
    activeNavText: {
        color: '#38BDF8',
    },
});

export default VendorDashboardScreen;
