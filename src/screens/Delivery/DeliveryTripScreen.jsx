import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    Dimensions,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Navigation,
    Home,
    Truck,
    CircleDollarSign,
    User,
    Key,
    Phone,
    MessageSquare,
    Plus,
    Minus,
    FileText
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const DeliveryTripScreen = ({ onBack, onConfirmOtp, onNavigateProfile, onNavigateTrips, onNavigateEarnings }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            {/* Map Placeholder */}
            <Image
                style={styles.mapBackground}
            />

            {/* Simulated Route Line (SVG/Image Overlay could be used but here we use a placeholder) */}
            <View style={styles.mapControls}>
                <View style={styles.zoomControls}>
                    <TouchableOpacity style={styles.controlButton}>
                        <Plus size={20} color="#64748B" />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.controlButton}>
                        <Minus size={20} color="#64748B" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={[styles.controlButton, { marginTop: 12 }]}>
                    <Navigation size={20} color="#38BDF8" />
                </TouchableOpacity>
            </View>

            {/* Destination Card Container */}
            <View style={styles.bottomCardContainer}>
                <View style={styles.destinationCard}>
                    {/* Header Info */}
                    <View style={styles.cardHeader}>
                        <View style={styles.customerIconContainer}>
                            <FileText size={32} color="#94A3B8" />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.destinationLabel}>CURRENT DESTINATION</Text>
                            <Text style={styles.customerName}>Johnathan Doe</Text>
                            <Text style={styles.addressText}>123 Green Valley Road, Farmville</Text>
                        </View>
                        <View style={styles.statsContent}>
                            <Text style={styles.distanceValue}>4.2</Text>
                            <Text style={styles.distanceUnit}>mi</Text>
                            <Text style={styles.timeValue}>~12 mins</Text>
                        </View>
                    </View>

                    {/* Main Action Button */}
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={onConfirmOtp}
                        activeOpacity={0.8}
                    >
                        <Key size={20} color="#FFF" />
                        <Text style={styles.confirmButtonText}>Confirm Delivery via OTP</Text>
                    </TouchableOpacity>

                    {/* Secondary Actions */}
                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.actionButton}>
                            <Phone size={18} color="#64748B" fill="#64748B" />
                            <Text style={styles.actionButtonText}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <MessageSquare size={18} color="#64748B" fill="#64748B" />
                            <Text style={styles.actionButtonText}>Message</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Bottom Tab Bar */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={onBack}>
                    <Home size={24} color="#94A3B8" />
                    <Text style={styles.navText}>HOME</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateTrips}>
                    <Truck size={24} color="#38BDF8" />
                    <Text style={[styles.navText, styles.activeNavText]}>DELIVERIES</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateEarnings}>
                    <CircleDollarSign size={24} color="#94A3B8" />
                    <Text style={styles.navText}>EARNINGS</Text>
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
    mapBackground: {
        ...StyleSheet.absoluteFillObject,
        width: width,
        height: height,
    },
    mapControls: {
        position: 'absolute',
        right: 20,
        top: 200,
        alignItems: 'center',
    },
    zoomControls: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    controlButton: {
        width: 48,
        height: 48,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginHorizontal: 8,
    },
    bottomCardContainer: {
        position: 'absolute',
        bottom: 100,
        width: '100%',
        paddingHorizontal: 16,
    },
    destinationCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    customerIconContainer: {
        width: 64,
        height: 64,
        backgroundColor: '#F1F5F9',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContent: {
        flex: 1,
        marginLeft: 16,
    },
    destinationLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#38BDF8',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    customerName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 4,
    },
    addressText: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
        lineHeight: 18,
    },
    statsContent: {
        alignItems: 'flex-end',
    },
    distanceValue: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1E293B',
    },
    distanceUnit: {
        fontSize: 12,
        fontWeight: '700',
        color: '#94A3B8',
        marginTop: -4,
    },
    timeValue: {
        fontSize: 12,
        fontWeight: '700',
        color: '#38BDF8',
        marginTop: 4,
    },
    confirmButton: {
        backgroundColor: '#38BDF8',
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 16,
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
    actionRow: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F1F5F9',
        height: 48,
        borderRadius: 16,
        gap: 8,
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1E293B',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 32 : 16,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
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

export default DeliveryTripScreen;
