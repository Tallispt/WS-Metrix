import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
// import { LineChart } from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics';
import { ScrollView } from "react-native-gesture-handler";
import Graph from "../components/Graph";

export const Results = () => {

    const navigation = useNavigation();

    const pHData = [1, 2, 3, 4, 5]
    const RValues = [96.7, 95.3, 82.1, 73.4, 61.2]
    const RDesvio = [1.5, 2.3, 0.4, 0.7, 8.0]

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

            <ScrollView style={{ height: metrics.screenHeight - metrics.headerHeight }}>

                <Text>
                    Title
                </Text>

                <Text>
                    Description
                </Text>

                <View>
                    <Text>
                        R Value
                    </Text>
                    <Text>
                        `Y = ${''}X + ${''}`
                    </Text>
                </View>

                <Graph />


            </ScrollView>


        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background

    },

    headerContainer: {
        height: metrics.headerHeight,
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