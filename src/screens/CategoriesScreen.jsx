import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StatusBar,
} from 'react-native';
import {
    Search,
    Home,
    LayoutGrid,
    ShoppingBag,
    User,
    ShoppingBasket,
    Leaf,
    Droplet,
    Sprout,
    Wheat,
    Citrus,
    Soup,
    Beef,
    Croissant
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const categories = [
    { id: 1, name: 'Fruits', count: '120+ Items', color: '#FFF7ED', icon: Citrus, iconColor: '#FB923C' },
    { id: 2, name: 'Vegetables', count: '85+ Items', color: '#F0FDF4', icon: Leaf, iconColor: '#4ADE80' },
    { id: 3, name: 'Grains', count: '40+ Items', color: '#FEFCE8', icon: Wheat, iconColor: '#FACC15' },
    { id: 4, name: 'Dairy', count: '25+ Items', color: '#EFF6FF', icon: Droplet, iconColor: '#60A5FA' },
    { id: 5, name: 'Organic Herbs', count: '32 Items', color: '#F0FDF9', icon: Sprout, iconColor: '#2DD4BF' },
    { id: 6, name: 'Spices', count: '50+ Items', color: '#FEF2F2', icon: Soup, iconColor: '#F87171' },
    { id: 7, name: 'Meat & Poultry', count: '45+ Items', color: '#FFF1F2', icon: Beef, iconColor: '#FB7185' },
    { id: 8, name: 'Bakery', count: '15+ Items', color: '#FFFBEB', icon: Croissant, iconColor: '#F59E0B' },
];

const CategoriesScreen = ({ onNavigateHome, onNavigateProduct }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <View style={styles.searchInputWrapper}>
                            <Search size={20} color="#94A3B8" />
                            <TextInput
                                placeholder="Search categories..."
                                style={styles.searchInput}
                                placeholderTextColor="#94A3B8"
                            />
                        </View>
                    </View>

                    {/* Categories Grid */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.gridContainer}
                    >
                        {categories.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <TouchableOpacity key={item.id} style={[styles.categoryCard, { backgroundColor: item.color }]}>
                                    <View style={styles.iconWrapper}>
                                        <IconComponent size={28} color={item.iconColor} />
                                    </View>
                                    <Text style={styles.categoryName}>{item.name}</Text>
                                    <Text style={styles.itemCount}>{item.count}</Text>
                                </TouchableOpacity>
                            );
                        })}
                        {/* Space for bottom tab */}
                        <View style={{ height: 100 }} />
                    </ScrollView>
                </View>
            </SafeAreaView>

            {/* Bottom Tab Bar */}
            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItem} onPress={onNavigateHome}>
                    <Home size={24} color="#94A3B8" />
                    <Text style={styles.tabText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <LayoutGrid size={24} color="#38BDF8" fill="#38BDF8" />
                    <Text style={[styles.tabText, { color: '#38BDF8' }]}>Categories</Text>
                </TouchableOpacity>
                <View style={styles.cartButtonWrapper}>
                    <TouchableOpacity style={styles.floatingCartButton}>
                        <ShoppingBasket size={28} color="#FFFFFF" />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>2</Text>
                        </View>
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
    content: {
        flex: 1,
        paddingTop: 10,
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingHorizontal: 15,
        height: 50,
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
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: (width - 50) / 2,
        height: 180,
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 4,
        textAlign: 'center',
    },
    itemCount: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
    },
    tabBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 85,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 25,
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
        marginTop: -45,
    },
    floatingCartButton: {
        width: 64,
        height: 64,
        backgroundColor: '#38BDF8',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#F8FAFC',
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    badge: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#F87171',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '800',
    },
});

export default CategoriesScreen;
