import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronDown, Camera, CheckCircle2 } from 'lucide-react-native';

const AddProductScreen = ({ onBack, onSave }) => {
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [unit, setUnit] = useState('per kg');
    const [stock, setStock] = useState('');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <ChevronLeft size={24} color="#1E293B" />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.title}>Add New Product</Text>
                        <Text style={styles.subtitle}>STEP 1 OF 2: BASIC INFO</Text>
                    </View>
                </View>

                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <ScrollView 
                        style={styles.scrollView} 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {/* Product Name */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Product Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Organic Red Tomatoes"
                                placeholderTextColor="#94A3B8"
                                value={productName}
                                onChangeText={setProductName}
                            />
                        </View>

                        {/* Category */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Category</Text>
                            <TouchableOpacity style={styles.dropdownButton}>
                                <Text style={styles.dropdownText}>
                                    {category || 'Select Category'}
                                </Text>
                                <ChevronDown size={20} color="#64748B" />
                            </TouchableOpacity>
                        </View>

                        {/* Description */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Describe the freshness, farm origin, or growing method..."
                                placeholderTextColor="#94A3B8"
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>

                        {/* Price & Stock Row */}
                        <View style={styles.row}>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                                <Text style={styles.label}>Price per unit</Text>
                                <View style={styles.priceInputContainer}>
                                    <View style={styles.priceField}>
                                        <Text style={styles.currency}>$</Text>
                                        <TextInput
                                            style={styles.priceInput}
                                            placeholder="0.00"
                                            placeholderTextColor="#94A3B8"
                                            keyboardType="decimal-pad"
                                            value={price}
                                            onChangeText={setPrice}
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.unitDropdown}>
                                        <Text style={styles.unitText}>{unit}</Text>
                                        <ChevronDown size={16} color="#64748B" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>Current Stock</Text>
                                <View style={styles.stockInputContainer}>
                                    <TextInput
                                        style={styles.stockInput}
                                        placeholder="0"
                                        placeholderTextColor="#94A3B8"
                                        keyboardType="numeric"
                                        value={stock}
                                        onChangeText={setStock}
                                    />
                                    <Text style={styles.unitsLabel}>UNITS</Text>
                                </View>
                            </View>
                        </View>

                        {/* Photo Upload */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Upload Product Photos</Text>
                            <TouchableOpacity style={styles.uploadArea} activeOpacity={0.6}>
                                <View style={styles.cameraIconContainer}>
                                    <Camera size={32} color="#38BDF8" />
                                    <View style={styles.plusOverlay}>
                                        <Text style={styles.plusText}>+</Text>
                                    </View>
                                </View>
                                <Text style={styles.uploadTitle}>Tap to upload photos</Text>
                                <Text style={styles.uploadSubtitle}>Up to 5 clear photos of your harvest</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

                {/* Footer Button */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.listButton} onPress={onSave}>
                        <Text style={styles.listButtonText}>List Product</Text>
                        <CheckCircle2 size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
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
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
        backgroundColor: '#FFF',
    },
    backButton: {
        width: 44,
        height: 44,
        backgroundColor: '#F1F5F9',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleContainer: {
        marginLeft: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1E293B',
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 0.5,
    },
    keyboardView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: '#475569',
        marginBottom: 10,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#FFF',
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
        fontSize: 16,
        color: '#1E293B',
        fontWeight: '600',
    },
    textArea: {
        height: 120,
        paddingTop: 16,
        paddingBottom: 16,
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
    },
    dropdownText: {
        fontSize: 16,
        color: '#1E293B',
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priceInputContainer: {
        flexDirection: 'column',
        gap: 8,
    },
    priceField: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
    },
    currency: {
        fontSize: 18,
        color: '#94A3B8',
        fontWeight: '700',
        marginRight: 8,
    },
    priceInput: {
        flex: 1,
        fontSize: 18,
        color: '#1E293B',
        fontWeight: '800',
    },
    unitDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 6,
        alignSelf: 'flex-start',
    },
    unitText: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '700',
    },
    stockInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
    },
    stockInput: {
        flex: 1,
        fontSize: 18,
        color: '#1E293B',
        fontWeight: '800',
    },
    unitsLabel: {
        fontSize: 12,
        fontWeight: '800',
        color: '#94A3B8',
    },
    uploadArea: {
        backgroundColor: '#F0F9FF',
        borderWidth: 2,
        borderColor: '#BAE6FD',
        borderStyle: 'dashed',
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
        gap: 8,
    },
    cameraIconContainer: {
        width: 64,
        height: 64,
        backgroundColor: '#FFF',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    plusOverlay: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: '#38BDF8',
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '800',
        lineHeight: 14,
    },
    uploadTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1E293B',
    },
    uploadSubtitle: {
        fontSize: 13,
        color: '#94A3B8',
        fontWeight: '500',
    },
    footer: {
        padding: 24,
        paddingBottom: Platform.OS === 'ios' ? 0 : 24,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    listButton: {
        backgroundColor: '#38BDF8',
        height: 64,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 6,
    },
    listButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '800',
    },
});

export default AddProductScreen;
