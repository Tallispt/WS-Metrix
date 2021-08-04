import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics'

export default function Settings({ setModalVisible }) {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}> WS Metrix</Text>
                <TouchableOpacity
                    onPress={() => setModalVisible(false)}>
                    <Icon name="ios-more" size={24} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.modals}>
                <Text>Modal</Text>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        height: metrics.navBarHeight,
        paddingTop: metrics.doubleBaseMargin,
        paddingHorizontal: metrics.doubleBaseMargin,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderColor: colors.ligher,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    title: {
        fontSize: fonts.bigger,
        color: colors.primary,
        fontWeight: 'bold',
    },

    icon: {
        color: colors.primary,
        paddingRight: metrics.smallMargin,
    },

    modals: {
        height: metrics.screenHeight,
        paddingTop: metrics.doubleBaseMargin,
        paddingHorizontal: metrics.doubleBaseMargin,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderColor: colors.ligher,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

});