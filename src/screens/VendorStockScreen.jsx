import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    StatusBar,
    TextInput,
    Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
    Search, 
    Plus, 
    LayoutDashboard, 
    ClipboardList, 
    Package, 
    User, 
    Edit3, 
    RefreshCcw 
} from 'lucide-react-native';

const ProductCard = ({ name, category, price, unit, stock, status, image }) => {
    const [isActive, setIsActive] = useState(status === 'Active');

    return (
        <View style={styles.productCard}>
            <Image source={{ uri: image }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <View style={styles.cardHeader}>
                    <Text style={styles.categoryText}>{category}</Text>
                    <View style={styles.statusRow}>
                        <Text style={[styles.statusLabel, !isActive && styles.statusLabelInactive]}>
                            {isActive ? 'Active' : 'Inactive'}
                        </Text>
                        <Switch
                            value={isActive}
                            onValueChange={setIsActive}
                            trackColor={{ false: '#E2E8F0', true: '#38BDF8' }}
                            thumbColor="#FFF"
                            ios_backgroundColor="#E2E8F0"
                            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                        />
                    </View>
                </View>

                <Text style={styles.productName}>{name}</Text>
                <Text style={styles.priceText}>
                    <Text style={styles.priceSymbol}>$</Text>{price} <Text style={styles.unitText}>/ {unit}</Text>
                </Text>

                <View style={styles.cardFooter}>
                    <View>
                        {stock > 0 ? (
                            <Text style={styles.stockText}>In Stock: <Text style={styles.stockBold}>{stock} {unit}</Text></Text>
                        ) : (
                            <Text style={styles.outOfStockText}>Out of Stock</Text>
                        )}
                    </View>
                    <TouchableOpacity style={[styles.actionButton, stock === 0 && styles.restockButton]}>
                        {stock > 0 ? (
                            <>
                                <Edit3 size={14} color="#38BDF8" style={styles.actionIcon} />
                                <Text style={styles.actionButtonText}>Edit Stock</Text>
                            </>
                        ) : (
                            <>
                                <RefreshCcw size={14} color="#38BDF8" style={styles.actionIcon} />
                                <Text style={styles.actionButtonText}>Restock</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const VendorStockScreen = ({ onNavigateDashboard, onNavigateOrders, onNavigateProfile, onAddProduct, onLogout }) => {
    const [activeTab, setActiveTab] = useState('active');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.title}>My Products</Text>
                    <TouchableOpacity style={styles.searchButton}>
                        <Search size={22} color="#1E293B" />
                    </TouchableOpacity>
                </View>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'active' && styles.activeTab]}
                        onPress={() => setActiveTab('active')}
                    >
                        <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
                            Active Listings
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'out' && styles.activeTab]}
                        onPress={() => setActiveTab('out')}
                    >
                        <Text style={[styles.tabText, activeTab === 'out' && styles.activeTabText]}>
                            Out of Stock
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView 
                    style={styles.scrollView} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <ProductCard 
                        name="Fresh Red Tomatoes" 
                        category="VEGETABLES" 
                        price="4.50" 
                        unit="kg" 
                        stock={24} 
                        status="Active" 
                        image="https://images.unsplash.com/photo-1546473427-e1e6666ba379?w=200"
                    />
                    <ProductCard 
                        name="Organic Curly Kale" 
                        category="GREENS" 
                        price="3.20" 
                        unit="bunch" 
                        stock={12} 
                        status="Active" 
                        image="https://images.unsplash.com/photo-1524179524662-13c2859b416e?w=200"
                    />
                    <ProductCard 
                        name="Large Brown Eggs" 
                        category="DAIRY & POULTRY" 
                        price="5.00" 
                        unit="dozen" 
                        stock={0} 
                        status="Inactive" 
                        image="https://images.unsplash.com/photo-1582722872445-44dc5f7e3cdd?w=200"
                    />
                    <ProductCard 
                        name="Green Bell Peppers" 
                        category="VEGETABLES" 
                        price="2.80" 
                        unit="kg" 
                        stock={45} 
                        status="Active" 
                        image="https://images.unsplash.com/photo-1566385101042-1a000c1268c4?w=200"
                    />
                </ScrollView>
            </SafeAreaView>

            {/* Fab Button */}
            <TouchableOpacity style={styles.fab} onPress={onAddProduct}>
                <Plus size={32} color="#FFF" />
            </TouchableOpacity>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateDashboard}>
                    <LayoutDashboard size={24} color="#94A3B8" />
                    <Text style={styles.navText}>DASHBOARD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateOrders}>
                    <ClipboardList size={24} color="#94A3B8" />
                    <Text style={styles.navText}>ORDERS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Package size={24} color="#38BDF8" />
                    <Text style={[styles.navText, styles.activeNavText]}>STOCK</Text>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 24,
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1E293B',
    },
    searchButton: {
        width: 44,
        height: 44,
        backgroundColor: '#F1F5F9',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        marginHorizontal: 24,
        padding: 6,
        borderRadius: 20,
        marginBottom: 24,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 16,
    },
    activeTab: {
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
    },
    activeTabText: {
        color: '#38BDF8',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    productCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 16,
        flexDirection: 'row',
        marginBottom: 16,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    productImage: {
        width: 90,
        height: 90,
        borderRadius: 20,
    },
    productDetails: {
        flex: 1,
        marginLeft: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    categoryText: {
        fontSize: 11,
        fontWeight: '800',
        color: '#38BDF8',
        letterSpacing: 0.5,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statusLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#10B981',
    },
    statusLabelInactive: {
        color: '#94A3B8',
    },
    productName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 6,
    },
    priceText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#38BDF8',
        marginBottom: 12,
    },
    priceSymbol: {
        fontSize: 14,
    },
    unitText: {
        fontSize: 14,
        color: '#94A3B8',
        fontWeight: '600',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stockText: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
    },
    stockBold: {
        fontWeight: '800',
        color: '#1E293B',
    },
    outOfStockText: {
        fontSize: 13,
        color: '#EF4444',
        fontWeight: '800',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F9FF',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        gap: 6,
    },
    restockButton: {
        backgroundColor: '#F1F5F9',
    },
    actionIcon: {
        marginTop: 1,
    },
    actionButtonText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#38BDF8',
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

export default VendorStockScreen;
