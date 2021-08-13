import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics';
import { color } from "react-native-reanimated";

export const Results = () => {

    const navigation = useNavigation();

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Rainy Days"] // optional
    };

    const chartConfig = {
        backgroundGradientFrom: colors.primary,
        backgroundGradientFromOpacity: 0.8,
        backgroundGradientTo: colors.primary_light,
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: colors.light
        }
    };

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


            <LineChart
                data={data}
                width={metrics.screenWidth - 20}
                height={200}
                withShadow
                chartConfig={chartConfig}
                style={{ marginTop: 20, borderRadius: 16, marginLeft: 10 }}
            />
            <LineChart
                data={{
                    labels: ["1", "2", "3", "4", "5", "6"],
                    datasets: [
                        {
                            data: [1, 2, 3, 4, 5]
                        }
                    ]
                }}
                width={metrics.screenWidth - 40} // from react-native
                height={220}

                // transparent
                // yAxisLabel="$"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        padding: 10
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                style={{
                    marginVertical: 10,
                    marginHorizontal: 20,
                    borderRadius: 16
                }}
            />


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