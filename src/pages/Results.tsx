import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics';

export const Results = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={{ position: 'absolute', top: 68, left: 25 }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Icon name="chevron-left" size={24} style={{ color: colors.dark }} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerText}>
                    Results
                </Text>

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background

    },

    headerContainer: {
        height: metrics.navBarHeight + metrics.statusBarHeight * 2,
        paddingTop: metrics.doubleBaseMargin,
        paddingBottom: 10,
        paddingHorizontal: metrics.doubleBaseMargin,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderColor: colors.ligher,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    headerText: {
        fontFamily: fonts.complement,
        // color: colors.body_dark,
        fontSize: fonts.bigger

    },

})