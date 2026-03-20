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
import BottomTabs from '../../components/BottomTabs';

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

const CategoriesScreen = ({ onNavigateHome, onNavigateProduct, onNavigateCheckout, onNavigateOrders, onNavigateProfile }) => {
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

            <BottomTabs
                activeTab="categories"
                onNavigateHome={onNavigateHome}
                onNavigateCategories={() => { }}
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
});

export default CategoriesScreen;
