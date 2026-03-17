import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
} from 'react-native';
import {
    Search,
    SlidersHorizontal,
    Bell,
    MapPin,
    ChevronDown,
    Heart,
    Plus,
    Home,
    LayoutGrid,
    ShoppingBag,
    User,
    ShoppingBasket
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const Categories = [
    { id: 1, name: 'Fruits', icon: '🍊', color: '#FFF7ED' },
    { id: 2, name: 'Vegetables', icon: '🌿', color: '#F0FDF4' },
    { id: 3, name: 'Grains', icon: '🌾', color: '#FEFCE8' },
    { id: 4, name: 'Dairy', icon: '💧', color: '#EFF6FF' },
];

const PopularProducts = [
    {
        id: 1,
        name: 'Fresh Strawberries',
        farm: 'Local Organic Farm',
        price: '4.50',
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=400&auto=format&fit=crop',
    },
    {
        id: 2,
        name: 'Organic Broccoli',
        farm: 'Green Valley Co.',
        price: '2.80',
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?q=80&w=400&auto=format&fit=crop',
    },
    {
        id: 3,
        name: 'Premium Wheat',
        farm: 'Heritage Mills',
        price: '1.95',
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=400&auto=format&fit=crop',
    },
    {
        id: 4,
        name: 'Red Tomatoes',
        farm: 'Sunny Farm Acres',
        price: '3.20',
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?q=80&w=400&auto=format&fit=crop',
    },
];

const HomeScreen = () => {
    const { user } = useAuth();

    // Extract first name for a friendlier greeting
    const getFirstName = () => {
        if (!user) return 'User';
        const name = user.full_name || user.username || 'User';
        return name.split(' ')[0];
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View>
                            <TouchableOpacity style={styles.locationSelector}>
                                <MapPin size={16} color="#38BDF8" fill="#38BDF8" />
                                <Text style={styles.locationText}>San Francisco, CA</Text>
                                <ChevronDown size={14} color="#64748B" />
                            </TouchableOpacity>
                            <Text style={styles.greetingHeader}>Good Morning,</Text>
                            <Text style={styles.userName}>{getFirstName()}</Text>
                        </View>
                        <TouchableOpacity style={styles.notificationButton}>
                            <Bell size={24} color="#1E293B" />
                            <View style={styles.notificationDot} />
                        </TouchableOpacity>
                    </View>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <View style={styles.searchInputWrapper}>
                            <Search size={20} color="#94A3B8" />
                            <TextInput
                                placeholder="Search fresh produce..."
                                style={styles.searchInput}
                                placeholderTextColor="#94A3B8"
                            />
                            <TouchableOpacity style={styles.filterButton}>
                                <SlidersHorizontal size={20} color="#38BDF8" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Banner */}
                    <View style={styles.bannerContainer}>
                        <View style={styles.bannerBackground}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop' }}
                                style={styles.bannerImage}
                            />
                            <View style={styles.bannerOverlay}>
                                <View style={styles.offerTag}>
                                    <Text style={styles.offerTagText}>SEASONAL OFFER</Text>
                                </View>
                                <Text style={styles.bannerTitle}>Organic Summer{'\n'}Fruits</Text>
                                <Text style={styles.bannerSubtitle}>Up to 30% OFF</Text>
                                <TouchableOpacity style={styles.shopNowButton}>
                                    <Text style={styles.shopNowText}>Shop Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Categories Section */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categoriesContainer}>
                        {Categories.map((category) => (
                            <TouchableOpacity key={category.id} style={styles.categoryCard}>
                                <View style={[styles.categoryIconContainer, { backgroundColor: category.color }]}>
                                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                                </View>
                                <Text style={styles.categoryName}>{category.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Popular Products Header */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Popular Products</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Products Grid */}
                    <View style={styles.productsGrid}>
                        {PopularProducts.map((product) => (
                            <TouchableOpacity key={product.id} style={styles.productCard}>
                                <View style={styles.productImageContainer}>
                                    <Image source={{ uri: product.image }} style={styles.productImage} />
                                    <TouchableOpacity style={styles.wishlistButton}>
                                        <Heart size={18} color="#64748B" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.productInfo}>
                                    <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                                    <Text style={styles.productFarm} numberOfLines={1}>{product.farm}</Text>
                                    <View style={styles.productFooter}>
                                        <Text style={styles.productPrice}>
                                            ${product.price}<Text style={styles.priceUnit}>/{product.unit}</Text>
                                        </Text>
                                        <TouchableOpacity style={styles.addToCartButton}>
                                            <Plus size={20} color="#FFFFFF" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Extra space for bottom tab */}
                    <View style={{ height: 100 }} />
                </ScrollView>
            </SafeAreaView>

            {/* Custom Bottom Tab Bar */}
            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItem}>
                    <Home size={24} color="#38BDF8" fill="#38BDF8" />
                    <Text style={[styles.tabText, { color: '#38BDF8' }]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <LayoutGrid size={24} color="#94A3B8" />
                    <Text style={styles.tabText}>Categories</Text>
                </TouchableOpacity>
                <View style={styles.cartButtonWrapper}>
                    <TouchableOpacity style={styles.floatingCartButton}>
                        <ShoppingBasket size={28} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.tabItem}>
                    <ShoppingBag size={24} color="#94A3B8" />
                    <Text style={styles.tabText}>Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <User size={24} color="#94A3B8" />
                    <Text style={styles.tabText}>Profile</Text>
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
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 20,
    },
    locationSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 4,
    },
    locationText: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    greetingHeader: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1E293B',
    },
    userName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1E293B',
    },
    notificationButton: {
        width: 44,
        height: 44,
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    notificationDot: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 8,
        height: 8,
        backgroundColor: '#F87171',
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 55,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: '#1E293B',
    },
    filterButton: {
        padding: 5,
    },
    bannerContainer: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    bannerBackground: {
        height: 180,
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#1E293B',
    },
    bannerImage: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.7,
    },
    bannerOverlay: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    offerTag: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    offerTagText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#38BDF8',
    },
    bannerTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#FFFFFF',
        lineHeight: 28,
        marginBottom: 5,
    },
    bannerSubtitle: {
        fontSize: 16,
        color: '#E2E8F0',
        marginBottom: 15,
    },
    shopNowButton: {
        backgroundColor: '#38BDF8',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    shopNowText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
    },
    seeAllText: {
        color: '#38BDF8',
        fontWeight: '600',
        fontSize: 14,
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    categoryCard: {
        alignItems: 'center',
        width: width * 0.2,
    },
    categoryIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryIcon: {
        fontSize: 24,
    },
    categoryName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#64748B',
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 13,
        justifyContent: 'space-between',
    },
    productCard: {
        width: (width - 50) / 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
        marginHorizontal: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    productImageContainer: {
        width: '100%',
        height: 120,
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 10,
        backgroundColor: '#F1F5F9',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    wishlistButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 32,
        height: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productInfo: {
        paddingHorizontal: 2,
    },
    productName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 2,
    },
    productFarm: {
        fontSize: 12,
        color: '#94A3B8',
        marginBottom: 8,
    },
    productFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '800',
        color: '#38BDF8',
    },
    priceUnit: {
        fontSize: 12,
        fontWeight: '500',
        color: '#94A3B8',
    },
    addToCartButton: {
        width: 34,
        height: 34,
        backgroundColor: '#38BDF8',
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#94A3B8',
        marginTop: 4,
    },
    cartButtonWrapper: {
        marginTop: -40,
    },
    floatingCartButton: {
        width: 60,
        height: 60,
        backgroundColor: '#38BDF8',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: '#F8FAFC',
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
});

export default HomeScreen;
