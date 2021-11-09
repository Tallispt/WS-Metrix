import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Switch,
    TouchableOpacity,
    Animated,
    Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
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

    const [handleNSPicker, setHandleNSPicker] = useState(null);
    const [handleNRPicker, setHandleNRPicker] = useState(null);
    const [handleSDPicker, setHandleSDPicker] = useState(null);
    const [handleSDCPicker, setHandleSDCPicker] = useState(null);

    const [imageSizeVector, setImageSizeVector] = useState<number>(null);
    const [imageSizeBigVector, setImageSizeBigVector] = useState<number>(null);
    const [handleAllowImageClickable, setHandleAllowImageClickable] = useState(null);

    const navigation = useNavigation();

    const animateHeightNS = useRef(new Animated.Value(50)).current;
    const animateNumberNS = useRef(new Animated.Value(0)).current;
    const animateHeightNR = useRef(new Animated.Value(50)).current;
    const animateNumberNR = useRef(new Animated.Value(0)).current;

    const animateHeightSD = useRef(new Animated.Value(50)).current;
    const animateNumberSD = useRef(new Animated.Value(0)).current;
    const animateHeightSDC = useRef(new Animated.Value(50)).current;
    const animateNumberSDC = useRef(new Animated.Value(0)).current;

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
        setImageSizeVector(settingsData.imageSizeVector);
        setImageSizeBigVector(settingsData.imageSizeBigVector);
        setHandleAllowImageClickable(settingsData.handleAllowImageClickable);
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

            imageSizeVector: imageSizeVector,
            imageSizeBigVector: imageSizeBigVector,
            handleAllowImageClickable: handleAllowImageClickable

        }

        await AsyncStorage.setItem("@settingsData", JSON.stringify(data));

    }

    const handleReturnDefault = () => {

        Alert.alert("Default", 'Are you sure to return to default settings?', [
            {
                text: 'No',
                style: 'cancel'
            },
            {
                text: 'Default settings',
                style: 'default',
                onPress: () => {
                    setRGB(true);
                    setRGBTriple(true);
                    setCMYK(true);
                    setHSV(true);
                    setNumSamples(6);
                    setNumReplicates(3);
                    setReplicatesFirst(true);
                    setImageSizeVector(125);
                    setImageSizeBigVector(200);
                    setHandleAllowImageClickable(false)
                }
            }
        ])

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

            <View style={{ height: metrics.screenHeight - (metrics.navBarHeight + metrics.statusBarHeight * 2) }}>
                <ScrollView
                    // style={{ height: metrics.screenHeight }}
                    indicatorStyle={'default'}
                    showsVerticalScrollIndicator
                >
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
                        <View style={[styles.settingsIndividualContainer, { borderBottomWidth: 0 }]}>
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
                                    onValueChange={(itemValue) => {
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



                        <View style={[styles.settingsIndividualContainer, { borderBottomWidth: 0 }]}>
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

                    <View style={{ height: 50 }}>
                        <Text style={styles.outerContainerText}>
                            Capture dimentions
                        </Text>
                    </View>
                    <View style={{ borderTopWidth: 2, borderTopColor: colors.ligher, borderBottomWidth: 2, borderBottomColor: colors.ligher }}>

                        <Animated.View style={{ height: animateHeightSD }}>
                            <TouchableOpacity
                                onPress={() => {
                                    goAway(animateHeightSD, 140, 50, 200);
                                    setHandleSDPicker(!handleSDPicker);
                                    goAway(animateNumberSD, 100, 0, 300)
                                }}
                                style={styles.settingsIndividualContainer}>
                                <Text style={styles.innerContainerText}>
                                    Sample dimention
                                </Text>
                                <Animated.View
                                    style={{
                                        backgroundColor: colors.ligher,
                                        paddingHorizontal: 8,
                                        paddingVertical: 5,
                                        borderRadius: 3,
                                        left: animateNumberSD
                                    }}>
                                    <Text style={{ fontSize: fonts.big }}>
                                        {imageSizeVector}
                                    </Text>
                                </Animated.View>
                            </TouchableOpacity>

                            {
                                handleSDPicker &&
                                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                                    <Slider
                                        style={{ width: 300, height: 30, marginHorizontal: 20 }}
                                        step={1}
                                        value={imageSizeVector}
                                        onSlidingStart={(value: number) => { value }}
                                        minimumValue={50}
                                        maximumValue={200}
                                        thumbTintColor={colors.primary}
                                        minimumTrackTintColor={colors.primary_light}
                                        maximumTrackTintColor={colors.ligher}
                                        onValueChange={(value: number) => { setImageSizeVector(value) }}
                                    />
                                    <View style={{
                                        backgroundColor: colors.ligher,
                                        paddingHorizontal: 8,
                                        paddingVertical: 5,
                                        borderRadius: 3,
                                    }}>
                                        <Text style={{ color: colors.dark }}>{imageSizeVector}</Text>
                                    </View>
                                </View>
                            }
                        </Animated.View>

                        <Animated.View style={{ height: animateHeightSDC }}>
                            <TouchableOpacity
                                onPress={() => {
                                    goAway(animateHeightSDC, 140, 50, 200);
                                    setHandleSDCPicker(!handleSDCPicker);
                                    goAway(animateNumberSDC, 100, 0, 300)
                                }}
                                style={styles.settingsIndividualContainer}>
                                <Text style={styles.innerContainerText}>
                                    WS Mode dimention
                                </Text>
                                <Animated.View
                                    style={{
                                        backgroundColor: colors.ligher,
                                        paddingHorizontal: 8,
                                        paddingVertical: 5,
                                        borderRadius: 3,
                                        left: animateNumberSDC
                                    }}>
                                    <Text style={{ fontSize: fonts.big }}>
                                        {imageSizeBigVector}
                                    </Text>
                                </Animated.View>
                            </TouchableOpacity>

                            {
                                handleSDCPicker &&
                                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                                    <Slider
                                        style={{ width: 300, height: 30, marginHorizontal: 20 }}
                                        step={1}
                                        value={imageSizeBigVector}
                                        onSlidingStart={(value: number) => { value }}
                                        minimumValue={150}
                                        maximumValue={250}
                                        thumbTintColor={colors.primary}
                                        minimumTrackTintColor={colors.primary_light}
                                        maximumTrackTintColor={colors.ligher}
                                        onValueChange={(value: number) => { setImageSizeBigVector(value) }}
                                    />
                                    <View style={{
                                        backgroundColor: colors.ligher,
                                        paddingHorizontal: 8,
                                        paddingVertical: 5,
                                        borderRadius: 3,
                                    }}>
                                        <Text style={{ color: colors.dark }}>{imageSizeBigVector}</Text>
                                    </View>
                                </View>
                            }

                        </Animated.View>

                        <View style={[styles.settingsIndividualContainer, { borderBottomWidth: 0 }]}>
                            <Text style={styles.innerContainerText}>
                                Allow click on vector to change
                            </Text>
                            <Switch
                                trackColor={{ false: colors.background, true: colors.primary }}
                                value={handleAllowImageClickable}
                                onValueChange={(value) => {
                                    setHandleAllowImageClickable(value);
                                }}
                            />
                        </View>
                    </View>


                    <View style={{ height: 20 }} />


                    <View style={{ borderTopWidth: 2, borderTopColor: colors.ligher, borderBottomWidth: 2, borderBottomColor: colors.ligher }}>
                        <TouchableOpacity style={[styles.settingsIndividualContainer, { borderBottomWidth: 0 }]} onPress={handleReturnDefault}>
                            <Text
                                style={[styles.innerContainerText, { color: colors.primary, fontSize: fonts.big }]}

                            >
                                Return to default
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 40 }} />

                </ScrollView>
            </View>

        </View>
    )
}

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