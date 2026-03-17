import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    StatusBar,
    SafeAreaView,
    Platform,
} from 'react-native';
import {
    ChevronLeft,
    Share2,
    Heart,
    Star,
    Leaf,
    Clock,
    Minus,
    Plus,
    ShoppingBasket,
    MapPin,
    ArrowLeft
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const ProductDetailScreen = ({ onBack, onAddToCart, onNavigateCheckout }) => {
    const [selectedWeight, setSelectedWeight] = useState('500g');
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    const weights = ['500g', '1kg', '2kg'];

    const handleAddToCart = () => {
        if (onAddToCart) onAddToCart();
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Product Image Header */}
                <View style={styles.imageHeader}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?q=80&w=800&auto=format&fit=crop' }}
                        style={styles.productImage}
                    />

                    {/* Toolbar Overlay */}
                    <SafeAreaView style={styles.toolbar}>
                        <TouchableOpacity style={styles.iconButton} onPress={onBack}>
                            <ArrowLeft size={22} color="#1E293B" />
                        </TouchableOpacity>

                        <View style={styles.toolbarRight}>
                            <TouchableOpacity style={styles.iconButton}>
                                <Share2 size={20} color="#1E293B" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.iconButton, { marginLeft: 12 }]}
                                onPress={onNavigateCheckout}
                            >
                                <Heart size={20} color="#EF4444" fill="#EF4444" />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </View>

                {/* Content Card */}
                <View style={styles.contentCard}>
                    <View style={styles.pullContainer}>
                        <View style={styles.pullBar} />
                    </View>

                    <View style={styles.headerInfo}>
                        <View style={styles.tagRow}>
                            <View style={styles.organicTag}>
                                <Text style={styles.organicTagText}>ORGANIC</Text>
                            </View>
                            <View style={styles.ratingContainer}>
                                <Star size={16} color="#FBBF24" fill="#FBBF24" />
                                <Text style={styles.ratingText}>4.9 <Text style={styles.reviewCount}>(124 reviews)</Text></Text>
                            </View>
                        </View>

                        <Text style={styles.productName}>Sun-Ripened Vine Tomatoes</Text>
                        <Text style={styles.productPrice}>$4.50 <Text style={styles.priceUnit}>/ kg</Text></Text>
                    </View>

                    {/* Weight Selection */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>SELECT WEIGHT</Text>
                        <View style={styles.weightRow}>
                            {weights.map((weight) => (
                                <TouchableOpacity
                                    key={weight}
                                    style={[
                                        styles.weightButton,
                                        selectedWeight === weight && styles.selectedWeightButton
                                    ]}
                                    onPress={() => setSelectedWeight(weight)}
                                >
                                    <Text style={[
                                        styles.weightButtonText,
                                        selectedWeight === weight && styles.selectedWeightButtonText
                                    ]}>{weight}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Farm Origin */}
                    <View style={styles.farmCard}>
                        <Text style={styles.farmLabel}>FARM ORIGIN</Text>
                        <View style={styles.farmContent}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop' }}
                                style={styles.farmerAvatar}
                            />
                            <View style={styles.farmInfo}>
                                <Text style={styles.farmName}>Green Valley Orchards</Text>
                                <View style={styles.locationRow}>
                                    <MapPin size={12} color="#94A3B8" />
                                    <Text style={styles.locationText}>Sonoma, California</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.viewFarmButton}>
                                <Text style={styles.viewFarmText}>View Farm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Freshness Notes */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>FRESHNESS NOTES</Text>
                        <Text style={styles.description}>
                            Harvested just 4 hours ago. These tomatoes are naturally ripened on the vine,
                            ensuring maximum lycopene levels and a sweet, tangy flavor profile.
                            Best consumed within 5 days for peak freshness.
                        </Text>
                    </View>

                    {/* Badges */}
                    <View style={styles.badgeRow}>
                        <View style={styles.badgeItem}>
                            <View style={styles.badgeIconBg}>
                                <Leaf size={20} color="#38BDF8" fill="#38BDF8" opacity={0.2} />
                                <Leaf size={20} color="#38BDF8" style={{ position: 'absolute' }} />
                            </View>
                            <View>
                                <Text style={styles.badgeLabel}>Pesticide</Text>
                                <Text style={styles.badgeValue}>Free</Text>
                            </View>
                        </View>
                        <View style={styles.badgeItem}>
                            <View style={styles.badgeIconBg}>
                                <Clock size={20} color="#38BDF8" />
                            </View>
                            <View>
                                <Text style={styles.badgeLabel}>Delivery</Text>
                                <Text style={styles.badgeValue}>Same Day</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ height: 120 }} />
                </View>
            </ScrollView>

            {/* Bottom Sticky Action Bar */}
            <View style={styles.bottomBar}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                        <Minus size={20} color="#64748B" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => setQuantity(quantity + 1)}
                    >
                        <Plus size={20} color="#64748B" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <ShoppingBasket size={22} color="#FFFFFF" strokeWidth={2.5} />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
    },
    imageHeader: {
        width: width,
        height: height * 0.45,
        backgroundColor: '#F1F5F9',
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    toolbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 10,
    },
    toolbarRight: {
        flexDirection: 'row',
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    contentCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: -40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 24,
        paddingTop: 10,
    },
    pullContainer: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    pullBar: {
        width: 40,
        height: 5,
        backgroundColor: '#E2E8F0',
        borderRadius: 3,
    },
    headerInfo: {
        marginBottom: 25,
    },
    tagRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    organicTag: {
        backgroundColor: '#BAE6FD',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    organicTagText: {
        color: '#0EA5E9',
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1E293B',
        marginLeft: 6,
    },
    reviewCount: {
        fontWeight: '500',
        color: '#94A3B8',
    },
    productName: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 8,
        lineHeight: 34,
    },
    productPrice: {
        fontSize: 24,
        fontWeight: '800',
        color: '#38BDF8',
    },
    priceUnit: {
        fontSize: 16,
        color: '#94A3B8',
        fontWeight: '500',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 1,
        marginBottom: 15,
    },
    weightRow: {
        flexDirection: 'row',
        gap: 12,
    },
    weightButton: {
        flex: 1,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedWeightButton: {
        borderColor: '#38BDF8',
        backgroundColor: '#F0F9FF',
    },
    weightButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#64748B',
    },
    selectedWeightButtonText: {
        color: '#38BDF8',
    },
    farmCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        borderWidth: 1.5,
        borderColor: '#F1F5F9',
        marginBottom: 25,
    },
    farmLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 1,
        marginBottom: 15,
    },
    farmContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    farmerAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F1F5F9',
    },
    farmInfo: {
        flex: 1,
        marginLeft: 15,
    },
    farmName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 13,
        color: '#94A3B8',
        marginLeft: 4,
        fontWeight: '500',
    },
    viewFarmButton: {
        backgroundColor: '#F0F9FF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    viewFarmText: {
        color: '#38BDF8',
        fontSize: 12,
        fontWeight: '700',
    },
    description: {
        fontSize: 15,
        color: '#64748B',
        lineHeight: 24,
        fontWeight: '500',
    },
    badgeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    badgeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 20,
        width: (width - 60) / 2,
    },
    badgeIconBg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    badgeLabel: {
        fontSize: 11,
        color: '#94A3B8',
        fontWeight: '600',
    },
    badgeValue: {
        fontSize: 13,
        color: '#1E293B',
        fontWeight: '700',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        padding: 5,
        borderRadius: 15,
    },
    quantityButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
        paddingHorizontal: 15,
    },
    addToCartButton: {
        flex: 1,
        marginLeft: 15,
        height: 55,
        backgroundColor: '#38BDF8',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    addToCartText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
});

export default ProductDetailScreen;
