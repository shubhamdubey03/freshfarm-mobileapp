import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
    ChevronLeft, 
    History, 
    ArrowUpRight, 
    Calendar, 
    CheckCircle2, 
    Clock, 
    AlertCircle,
    Download
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const PayoutItem = ({ amount, date, status, id }) => {
    const getStatusStyles = (status) => {
        switch (status) {
            case 'Processed':
                return { color: '#10B981', bg: '#D1FAE5', icon: CheckCircle2 };
            case 'Pending':
                return { color: '#F59E0B', bg: '#FEF3C7', icon: Clock };
            case 'Failed':
                return { color: '#EF4444', bg: '#FEE2E2', icon: AlertCircle };
            default:
                return { color: '#94A3B8', bg: '#F1F5F9', icon: Clock };
        }
    };

    const statusStyle = getStatusStyles(status);
    const StatusIcon = statusStyle.icon;

    return (
        <View style={styles.payoutCard}>
            <View style={styles.payoutTop}>
                <View>
                    <Text style={styles.payoutLabel}>AMOUNT</Text>
                    <Text style={styles.payoutAmount}>${amount}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                    <StatusIcon size={12} color={statusStyle.color} style={{ marginRight: 4 }} />
                    <Text style={[styles.statusText, { color: statusStyle.color }]}>{status}</Text>
                </View>
            </View>
            
            <View style={styles.payoutBottom}>
                <View style={styles.metaRow}>
                    <Calendar size={14} color="#94A3B8" />
                    <Text style={styles.metaText}>{date}</Text>
                </View>
                <View style={styles.metaRow}>
                    <Text style={styles.refLabel}>REF: </Text>
                    <Text style={styles.refText}>#{id}</Text>
                </View>
            </View>
        </View>
    );
};

const PayoutHistoryScreen = ({ onBack }) => {
    const payouts = [
        { id: 'PAY-88291', amount: '1,240.50', date: 'March 16, 2026', status: 'Processed' },
        { id: 'PAY-88245', amount: '840.15', date: 'March 09, 2026', status: 'Processed' },
        { id: 'PAY-88190', amount: '1,480.25', date: 'March 02, 2026', status: 'Pending' },
        { id: 'PAY-88012', amount: '920.00', date: 'Feb 23, 2026', status: 'Processed' },
        { id: 'PAY-87988', amount: '1,120.40', date: 'Feb 16, 2026', status: 'Failed' },
        { id: 'PAY-87945', amount: '780.00', date: 'Feb 09, 2026', status: 'Processed' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <ChevronLeft size={24} color="#1E293B" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Payout History</Text>
                    <TouchableOpacity style={styles.downloadButton}>
                        <Download size={20} color="#38BDF8" />
                    </TouchableOpacity>
                </View>

                <ScrollView 
                    style={styles.scrollView} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Summary Card */}
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryTop}>
                            <View>
                                <Text style={styles.summaryLabel}>Total Paid Out</Text>
                                <Text style={styles.summaryValue}>$12,480.30</Text>
                            </View>
                            <View style={styles.summaryIconBox}>
                                <ArrowUpRight size={24} color="#FFF" />
                            </View>
                        </View>
                        <View style={styles.summaryFooter}>
                            <Text style={styles.footerText}>Updated: Just Now</Text>
                        </View>
                    </View>

                    {/* Filter Tabs */}
                    <View style={styles.filterSection}>
                        <Text style={styles.sectionTitle}>Recent Payouts</Text>
                        <TouchableOpacity>
                            <Text style={styles.filterText}>Last 30 Days</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Payout List */}
                    <View style={styles.listContainer}>
                        {payouts.map((item) => (
                            <PayoutItem 
                                key={item.id}
                                id={item.id}
                                amount={item.amount}
                                date={item.date}
                                status={item.status}
                            />
                        ))}
                    </View>

                    {/* Load More */}
                    <TouchableOpacity style={styles.loadMoreButton}>
                        <Text style={styles.loadMoreText}>View Older Payouts</Text>
                    </TouchableOpacity>
                </ScrollView>
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
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    downloadButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F0F9FF',
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
        paddingBottom: 40,
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    summaryCard: {
        backgroundColor: '#38BDF8',
        borderRadius: 28,
        padding: 24,
        marginBottom: 30,
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    summaryTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    summaryValue: {
        fontSize: 32,
        color: '#FFF',
        fontWeight: '900',
        marginTop: 4,
    },
    summaryIconBox: {
        width: 52,
        height: 52,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    summaryFooter: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    footerText: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: '600',
    },
    filterSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#38BDF8',
    },
    listContainer: {
        gap: 16,
    },
    payoutCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 5,
        elevation: 1,
    },
    payoutTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    payoutLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    payoutAmount: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1E293B',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '800',
    },
    payoutBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F8FAFC',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 13,
        color: '#94A3B8',
        fontWeight: '600',
    },
    refLabel: {
        fontSize: 13,
        color: '#CBD5E1',
        fontWeight: '600',
    },
    refText: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '700',
    },
    loadMoreButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        marginTop: 10,
    },
    loadMoreText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#94A3B8',
    },
});

export default PayoutHistoryScreen;
