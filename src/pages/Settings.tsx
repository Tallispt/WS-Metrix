import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Switch,
    TouchableOpacity,
    Animated
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { SettingsProps } from '../libs/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics';



export function Settings() {
    const [RGB, setRGB] = useState(null);
    const [RGBTriple, setRGBTriple] = useState(null);
    const [CMYK, setCMYK] = useState(null);
    const [HSV, setHSV] = useState(null);
    const [numSamples, setNumSamples] = useState(null);
    const [numReplicates, setNumReplicates] = useState(null);
    const [ReplicatesFirst, setReplicatesFirst] = useState(null);

    const [handleNSPicker, setHandleNSPicker] = useState(false);
    const [handleNRPicker, setHandleNRPicker] = useState(false);

    const navigation = useNavigation();

    const animateHeightNS = useRef(new Animated.Value(50)).current;
    const animateHeightNR = useRef(new Animated.Value(50)).current;
    const animateNumberNS = useRef(new Animated.Value(0)).current;
    const animateNumberNR = useRef(new Animated.Value(0)).current;

    const turnBig = (value: Animated.Value) => {
        if (Number.parseInt(JSON.stringify(value)) == 50) {
            Animated.timing(value, { toValue: 250, duration: 200, useNativeDriver: false }).start();
        } else Animated.timing(value, { toValue: 50, duration: 200, useNativeDriver: false }).start();

    }

    const goAway = (value: Animated.Value, toValue: number, returnValue: number, duration: number) => {
        if (Number.parseInt(JSON.stringify(value)) == returnValue) {
            Animated.timing(value, { toValue: toValue, duration: duration, useNativeDriver: false }).start();
        } else Animated.timing(value, { toValue: returnValue, duration: duration, useNativeDriver: false }).start();
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        LoadSettings();

        if (!isFocused) onGoingBack()
    }, [isFocused])

    async function LoadSettings() {
        const data = await AsyncStorage.getItem("@settingsData");
        const settingsData = JSON.parse(data) as SettingsProps;

        setRGB(settingsData.RGB);
        setRGBTriple(settingsData.RGBTriple);
        setCMYK(settingsData.CMYK);
        setHSV(settingsData.HSV);
        setNumSamples(settingsData.SampleNumber);
        setNumReplicates(settingsData.ReplicatesNumber);
        setReplicatesFirst(settingsData.ReplicatesFirst);
    }

    async function onGoingBack() {
        const data = {
            RGB: RGB,
            RGBTriple: RGBTriple,
            CMYK: CMYK,
            HSV: HSV,

            SampleNumber: numSamples,
            ReplicatesNumber: numReplicates,
            ReplicatesFirst: ReplicatesFirst,
        }

        await AsyncStorage.setItem("@settingsData", JSON.stringify(data));
    }

    function handleReturnDefault() {
        setRGB(true);
        setRGBTriple(true);
        setCMYK(true);
        setHSV(true);
        setNumSamples(6);
        setNumReplicates(3);
        setReplicatesFirst(true);
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={{ position: 'absolute', top: 68, left: 25 }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Icon name="chevron-left" size={24} style={{ color: colors.dark }} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerText}>
                    Settings
                </Text>

            </View>

            <ScrollView style={{ height: metrics.screenHeight }}>
                <View style={{ height: 50 }}>
                    <Text style={styles.outerContainerText}>
                        Channels options
                    </Text>
                </View>
                <View style={{ borderTopWidth: 2, borderTopColor: colors.ligher, borderBottomWidth: 2, borderBottomColor: colors.ligher }}>
                    <View style={styles.settingsIndividualContainer}>
                        <Text style={styles.innerContainerText}>
                            RGB
                        </Text>
                        <Switch
                            trackColor={{ false: colors.background, true: colors.primary }}
                            value={RGB}
                            onValueChange={(value) => { setRGB(value) }}
                        />
                    </View>

                    <View style={styles.settingsIndividualContainer}>
                        <Text style={styles.innerContainerText}>
                            RGB Triple Point
                        </Text>
                        <Switch
                            trackColor={{ false: colors.background, true: colors.primary }}
                            value={RGBTriple}
                            onValueChange={(value) => { setRGBTriple(value) }}
                        />
                    </View>
                    <View style={styles.settingsIndividualContainer}>
                        <Text style={styles.innerContainerText}>
                            CMYK
                        </Text>
                        <Switch
                            trackColor={{ false: colors.background, true: colors.primary }}
                            value={CMYK}
                            onValueChange={(value) => { setCMYK(value) }}
                        />
                    </View>
                    <View style={styles.settingsIndividualContainer}>
                        <Text style={styles.innerContainerText}>
                            HSV
                        </Text>
                        <Switch
                            trackColor={{ false: colors.background, true: colors.primary }}
                            value={HSV}
                            onValueChange={(value) => { setHSV(value) }}
                        />
                    </View>
                </View>

                <View style={{ height: 50 }}>
                    <Text style={styles.outerContainerText}>
                        Analytical Curve Options
                    </Text>
                </View>

                <View style={{ borderTopWidth: 2, borderTopColor: colors.ligher, borderBottomWidth: 2, borderBottomColor: colors.ligher }}>

                    <Animated.View style={{ height: animateHeightNS }}>
                        <TouchableOpacity
                            onPress={() => {
                                turnBig(animateHeightNS),
                                    setHandleNSPicker(!handleNSPicker)
                                goAway(animateNumberNS, 50, 0, 200)
                            }}
                            style={styles.settingsIndividualContainer}>
                            <Text style={styles.innerContainerText}>
                                Number of samples
                            </Text>
                            <Animated.View
                                style={{
                                    backgroundColor: colors.ligher,
                                    paddingHorizontal: 8,
                                    paddingVertical: 5,
                                    borderRadius: 3,
                                    left: animateNumberNS
                                }}>
                                <Text style={{ fontSize: fonts.big }}>
                                    {numSamples}
                                </Text>
                            </Animated.View>
                        </TouchableOpacity>
                        {
                            handleNSPicker &&
                            <Picker
                                style={{ width: metrics.screenWidth, position: 'absolute', top: 40 }}
                                selectedValue={numSamples}
                                onValueChange={(itemValue) => {
                                    setNumSamples(itemValue)
                                }}
                            >
                                <Picker.Item label={"3"} value={3} />
                                <Picker.Item label={"4"} value={4} />
                                <Picker.Item label={"5"} value={5} />
                                <Picker.Item label={"6"} value={6} />
                                <Picker.Item label={"7"} value={7} />
                                <Picker.Item label={"8"} value={8} />
                                <Picker.Item label={"9"} value={9} />
                                <Picker.Item label={"10"} value={10} />
                                <Picker.Item label={"11"} value={11} />
                                <Picker.Item label={"12"} value={12} />
                            </Picker>
                        }
                    </Animated.View>


                    <Animated.View style={{ height: animateHeightNR }}>
                        <TouchableOpacity
                            onPress={() => {
                                turnBig(animateHeightNR),
                                    setHandleNRPicker(!handleNRPicker)
                                goAway(animateNumberNR, 50, 0, 200)
                            }}
                            style={styles.settingsIndividualContainer}>
                            <Text style={styles.innerContainerText}>
                                Number of replicates
                            </Text>
                            <Animated.View
                                style={{
                                    backgroundColor: colors.ligher,
                                    paddingHorizontal: 8,
                                    paddingVertical: 5,
                                    borderRadius: 3,
                                    left: animateNumberNR
                                }}>
                                <Text style={{ fontSize: fonts.big }}>
                                    {numReplicates}
                                </Text>
                            </Animated.View>
                        </TouchableOpacity>
                        {
                            handleNRPicker &&
                            <Picker
                                style={{ width: metrics.screenWidth, position: 'absolute', top: 40 }}

                                selectedValue={numReplicates}
                                mode={'dropdown'}
                                onValueChange={(itemValue, itemIndex) => {
                                    setNumReplicates(itemValue)
                                }}
                            >
                                <Picker.Item label={"1"} value={1} />
                                <Picker.Item label={"2"} value={2} />
                                <Picker.Item label={"3"} value={3} />
                                <Picker.Item label={"4"} value={4} />
                                <Picker.Item label={"5"} value={5} />
                                <Picker.Item label={"6"} value={6} />
                            </Picker>
                        }

                    </Animated.View>
                    <View >

                    </View>



                    <View style={styles.settingsIndividualContainer}>
                        <Text style={styles.innerContainerText}>
                            Replicates first
                        </Text>
                        <Switch
                            trackColor={{ false: colors.background, true: colors.primary }}
                            value={ReplicatesFirst}
                            onValueChange={(value) => { setReplicatesFirst(value) }}
                        />
                    </View>

                </View>
                <View style={{ height: 150 }}>

                </View>
                <View style={{ borderTopWidth: 2, borderTopColor: colors.ligher, borderBottomWidth: 2, borderBottomColor: colors.ligher }}>
                    <TouchableOpacity style={styles.settingsIndividualContainer} onPress={handleReturnDefault}>
                        <Text
                            style={[styles.innerContainerText, { color: colors.primary, fontSize: fonts.big }]}

                        >
                            Return to default
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </View>
    )
}

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

    settingsIndividualContainer: {
        height: 50,
        paddingLeft: 50,
        paddingRight: 20,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.ligher,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },

    settingsAnimatedContainer: {
        // marginRight: 50,
        paddingLeft: 50,
        paddingRight: 20,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.ligher,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },

    outerContainerText: {
        textTransform: 'uppercase',
        left: 40, bottom: 2,
        position: 'absolute',
        color: colors.heading,
        fontSize: fonts.small,
        fontFamily: fonts.complement
    },

    innerContainerText: {
        fontSize: fonts.big,
        fontFamily: fonts.text,
        color: colors.dark

    }


})