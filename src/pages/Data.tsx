import React, { useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    FlatList,
    StyleSheet,
    Alert,
    Dimensions
} from 'react-native';

import { SampleDataProps, CurveDataProps, loadSampleData, loadCurveData, removeSampleData, removeCurveData, loadWSSampleData, WSSampleDataProps } from '../libs/storage';
import { DataBox } from '../components/DataBox';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics'
import { Load } from '../components/Load';

export default function Data() {
    const [mySampleData, setMySampleData] = useState<SampleDataProps[]>([]);
    const [myCurveData, setMyCurveData] = useState<CurveDataProps[]>([]);
    const [myWSSampleData, setMyWSSampleData] = useState<WSSampleDataProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [noSampleData, setNoSampleData] = useState(null);
    const [noCurveData, setNoCurveData] = useState(null);
    const [noWSSampleData, setNoWSSampleData] = useState(null);

    const Tab = createMaterialTopTabNavigator();

    function handleRemove(data: SampleDataProps | CurveDataProps) {
        Alert.alert("Remover", `Deseja remover ${data.title}?`, [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        if (data.sample == "Sample Mode") {
                            await removeSampleData(data.id);

                            setMySampleData((oldData) =>
                                oldData.filter((item) => item.id != data.id)
                            );
                        }
                        if (data.sample == "Analytical Curve Mode") {
                            await removeCurveData(data.id);

                            setMyCurveData((oldData) =>
                                oldData.filter((item) => item.id != data.id)
                            );
                        }

                    } catch (error) {
                        Alert.alert('It was not possible to Remove')
                    }
                }
            }
        ])
    }

    useFocusEffect(
        React.useCallback(() => {
            async function loadStoredData() {
                setLoading(true)
                const dataSample = await loadSampleData();
                setMySampleData(dataSample);
                setNoSampleData(dataSample.length == 0 ? true : false)
                // console.log(noSampleData);

                const dataCurve = await loadCurveData();
                setMyCurveData(dataCurve);
                setNoCurveData(dataCurve.length == 0 ? true : false)

                const dataWS = await loadWSSampleData();
                setMyWSSampleData(dataWS);
                setNoWSSampleData(dataWS.length == 0 ? true : false)


                setLoading(false);
            }

            loadStoredData();
        }, [])
    );

    const resultsMode = () => {
        return (
            <View style={{ flex: 1 }}>

                {
                    loading &&

                    <Load />
                }

                {
                    !loading && noSampleData &&

                    <View style={{ alignItems: 'center', top: metrics.screenHeight / 3 }}>
                        <Text style={{ fontFamily: fonts.complement, color: colors.light }}>
                            No data
                        </Text>
                    </View>
                }


                {
                    !loading && !noSampleData &&

                    <FlatList
                        data={mySampleData}
                        keyExtractor={item => String(item.id)}
                        style={styles.flatListView}
                        renderItem={({ item }) => (
                            <DataBox
                                data={item}
                                handleRemove={() => handleRemove(item)}
                            />

                        )}
                    >
                    </FlatList>
                }


            </View>

        )
    }

    const calibrationMode = () => {
        return (
            <View style={{ flex: 1 }}>

                {
                    loading &&

                    <Load />
                }

                {
                    !loading && noCurveData &&

                    <View style={{ alignItems: 'center', top: metrics.screenHeight / 3 }}>
                        <Text style={{ fontFamily: fonts.complement, color: colors.light }}>
                            No data
                        </Text>
                    </View>
                }


                {
                    !loading && !noCurveData &&

                    <FlatList
                        data={myCurveData}
                        keyExtractor={item => String(item.id)}
                        style={styles.flatListView}
                        renderItem={({ item }) => (
                            <DataBox
                                data={item}
                                handleRemove={() => handleRemove(item)}
                            />

                        )}

                    >
                    </FlatList>
                }

            </View>

        )
    }

    const WSMode = () => {
        return (
            <View style={{ flex: 1 }}>

                {
                    loading &&

                    <Load />
                }

                {
                    !loading && noWSSampleData &&

                    <View style={{ alignItems: 'center', top: metrics.screenHeight / 3 }}>
                        <Text style={{ fontFamily: fonts.complement, color: colors.light }}>
                            No data
                        </Text>
                    </View>
                }


                {
                    !loading && !noWSSampleData &&

                    <FlatList
                        data={myWSSampleData}
                        keyExtractor={item => String(item.id)}
                        style={styles.flatListView}
                        renderItem={({ item }) => (
                            <DataBox
                                data={item}
                                handleRemove={() => handleRemove(item)}
                            />

                        )}

                    >
                    </FlatList>
                }


            </View>

        )
    }


    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    Data
                </Text>
            </View>
            <Tab.Navigator
                initialRouteName="Results"
                swipeEnabled={false}
                // removeClippedSubviews
                // lazy
                // lazyPreloadDistance={0.2}
                tabBarOptions={{
                    activeTintColor: colors.primary,
                    inactiveTintColor: colors.light,
                    indicatorStyle: { backgroundColor: colors.primary },
                    // indicatorContainerStyle: { borderBottomColor: colors.primary, borderBottomWidth: 2 },
                    labelStyle: { textTransform: 'capitalize', fontSize: fonts.regular }
                }}
            >
                <Tab.Screen name="Results" component={resultsMode} options={{ title: "Results" }} />
                <Tab.Screen name="Calibration" component={calibrationMode} options={{ title: "Calibration Curves" }} />
                <Tab.Screen name="WS" component={WSMode} options={{ title: "WS Results" }} />
            </Tab.Navigator>
        </>
    )
}


const styles = StyleSheet.create({

    headerContainer: {
        height: 90,
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

    flatListView: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height - (180)

    },

    headerText: {
        fontFamily: fonts.complement,
        // color: colors.body_dark,
        fontSize: fonts.bigger

    },

    dataContainer: {
        backgroundColor: colors.white,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
        padding: metrics.baseMargin,

    },

    dataTitle: {
        fontSize: fonts.big,
        fontWeight: '500',
        paddingBottom: 7,
        fontFamily: fonts.title


    },

    dataDate: {
        fontSize: fonts.small,
        fontFamily: fonts.text

    },

    dataDescription: {
        fontSize: fonts.small,
        fontFamily: fonts.text

    },

    dataImage: {

    }

});