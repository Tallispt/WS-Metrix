import React, { useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import { Feather } from '@expo/vector-icons';
// import { Modalize } from 'react-native-modalize';
// import { useRoute } from '@react-navigation/native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics'

export default function Header() {

    // const route = useRoute();


    return (
        <View style={styles.container}>

            <Text style={styles.title}> WS Metrix</Text>
            <TouchableOpacity
            // onPress={onOpen}
            >
                <Feather name="more-horizontal" size={24} style={styles.icon} />
            </TouchableOpacity>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: metrics.navBarHeight + metrics.statusBarHeight * 2,
        paddingTop: metrics.doubleBaseMargin,
        paddingBottom: 10,
        paddingHorizontal: metrics.doubleBaseMargin,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderColor: colors.ligher,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',

        // shadowColor: colors.regular,
        // shadowRadius: 2,
        // shadowOpacity: 90,
        // shadowOffset: { width: 0, height:0},
        // elevation: -2,
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

});