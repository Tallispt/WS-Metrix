import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';

import loadAnimation from '../assets/Loading-white.json';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics';
import { CurveDataProps, PartialInfoProps, SampleDataProps, StorageDataProps, WSSampleDataProps } from '../libs/storage';
import { color } from 'react-native-reanimated';

// import ImageManipulation from '../libs/imageManipulation';

export const Preview = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [loading, setLoading] = useState();

    const [modeSample, setModeSample] = useState<String>();

    const [numSampleMode, setNumSampleMode] = useState<Number>();
    const [numCurveMode, setNumCurveMode] = useState<Number>();
    const [numWSMode, setNumWSMode] = useState<Number>();

    const [image, setImage] = useState<string>();
    const [base, setBase] = useState<string>();
    const [arrayImage, setArrayImage] = useState([]);
    const [arrayBase, setArrayBase] = useState([]);
    const [width, setWidth] = useState<number>();
    const [height, setHeight] = useState<number>();

    const [inputName, setInputName] = useState<string>();
    const [inputDescription, setInputDescription] = useState<string>("No description");

    useEffect(() => {
        sampleStorage();
        getPartialInfo();

        if (!isFocused) { }
    }, [isFocused])

    async function getPartialInfo() {
        const partialInfo = await AsyncStorage.getItem("@partialInfo")
        const data = JSON.parse(partialInfo) as PartialInfoProps

        setModeSample(data.mode)
        setImage(data.image);
        setBase(data.base);
        setArrayImage(data.arrayImage);
        setArrayBase(data.arrayBase);
        setHeight(data.imageHeight);
        setWidth(data.imageWidth);
    }

    async function savePic() {
        const asset = await MediaLibrary.createAssetAsync(image)
            .then(() => {
                alert('Photo saved!')

            })
            .catch(error => {
                console.log('err', error)

            })
    };

    async function sampleStorage() {
        var numSample = await AsyncStorage.getItem('@numSampleMode');
        var numCurve = await AsyncStorage.getItem('@numCurveMode');
        var numWS = await AsyncStorage.getItem('@numWSSampleMode')
        if (!numSample) {
            numSample = "1";
            await AsyncStorage.setItem("@numSampleMode", numSample);
        }
        if (!numCurve) {
            numCurve = "1";
            await AsyncStorage.setItem("@numCurveMode", numCurve);
        }
        if (!numWS) {
            numWS = "1";
            await AsyncStorage.setItem("@numWSSampleMode", numWS);
        }
        setNumSampleMode(Number(numSample));
        setNumCurveMode(Number(numCurve));
        setNumWSMode(Number(numWS));
    };

    async function sampleSoma() {
        if (modeSample == "Sample Mode") {
            const num = await AsyncStorage.getItem("@numSampleMode");
            var n = Number(num) + 1
            setNumSampleMode(n);
            await AsyncStorage.setItem("@numSampleMode", String(n));
        }
        if (modeSample == "Analytical Curve Mode") {
            const num = await AsyncStorage.getItem("@numCurveMode");
            var n = Number(num) + 1
            setNumCurveMode(n);
            await AsyncStorage.setItem("@numCurveMode", String(n));
        } if (modeSample == "WS Mode") {
            const num = await AsyncStorage.getItem("@numWSSampleMode");
            var n = Number(num) + 1
            setNumWSMode(n);
            await AsyncStorage.setItem("@numWSSampleMode", String(n));
        }
    };

    const placeholder = () => {
        if (modeSample == "Sample Mode") return `Sample ${numSampleMode}`
        if (modeSample == "Analytical Curve Mode") return `Analytical Curve ${numCurveMode}`
        if (modeSample == "WS Mode") return `WS Sample ${numWSMode}`
    };
    const placeholderValue = String(placeholder());

    async function handleResults() {
        try {
            if (modeSample == "Sample Mode") {

                const data = await AsyncStorage.getItem("@dataSample");
                const oldData = data ? (JSON.parse(data) as StorageDataProps) : {};

                const now = new Date()
                const time = now.toLocaleTimeString();
                const date = now.toLocaleDateString();

                const local = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
                const locationInfo = await Location.reverseGeocodeAsync(local.coords);

                const title = !inputName ? `Sample ${numSampleMode}` : inputName;

                const newData = {
                    id: String(numSampleMode),
                    title: title,
                    description: inputDescription,
                    fullDate: now,
                    date: date,
                    time: time,
                    location: local,
                    geocode: locationInfo,
                    sample: "Sample Mode",
                    uri: image,
                    base64: base,
                    height: height,
                    width: width
                } as SampleDataProps

                const zipData = {
                    [newData.id]: {
                        data: newData
                    }
                }

                await AsyncStorage.setItem(
                    "@dataSample",
                    JSON.stringify({
                        ...oldData,
                        ...zipData
                    })
                )
            }

            if (modeSample == "Analytical Curve Mode") {

                const data = await AsyncStorage.getItem("@dataCurve");
                const oldData = data ? (JSON.parse(data) as StorageDataProps) : {};

                const now = new Date()
                const time = now.toLocaleTimeString();
                const date = now.toLocaleDateString();

                const local = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
                const locationInfo = await Location.reverseGeocodeAsync(local.coords);

                const title = !inputName ? `Analytical Curve ${numCurveMode}` : inputName;

                const newData = {
                    id: String(numCurveMode),
                    title: title,
                    description: inputDescription,
                    fullDate: now,
                    date: date,
                    time: time,
                    location: local,
                    geocode: locationInfo,
                    sample: "Analytical Curve Mode",
                    uri: arrayImage,
                    base64: arrayBase,
                    height: height,
                    width: width
                } as CurveDataProps

                const zipData = {
                    [newData.id]: {
                        data: newData
                    }
                }

                await AsyncStorage.setItem(
                    "@dataCurve",
                    JSON.stringify({
                        ...oldData,
                        ...zipData
                    })
                )
            }
            if (modeSample == "WS Mode") {

                const data = await AsyncStorage.getItem("@dataWS");
                const oldData = data ? (JSON.parse(data) as StorageDataProps) : {};

                const now = new Date()
                const time = now.toLocaleTimeString();
                const date = now.toLocaleDateString();

                const local = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
                const locationInfo = await Location.reverseGeocodeAsync(local.coords);

                const title = !inputName ? `WS Sample ${numWSMode}` : inputName;

                const newData = {
                    id: String(numSampleMode),
                    title: title,
                    description: inputDescription,
                    fullDate: now,
                    date: date,
                    time: time,
                    location: local,
                    geocode: locationInfo,
                    sample: "WS Mode",
                    uri: image,
                    base64: base,
                    height: height,
                    width: width
                } as WSSampleDataProps

                const zipData = {
                    [newData.id]: {
                        data: newData
                    }
                }

                await AsyncStorage.setItem(
                    "@dataWS",
                    JSON.stringify({
                        ...oldData,
                        ...zipData
                    })
                )

            }

            sampleSoma();

        } catch (error) {
            throw new Error(error);
        }
    }


    return (
        <View style={styles.container}>
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <View style={styles.modalButtonsContainer}>

                <View style={{ position: 'absolute', top: 68, left: 25 }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Icon name="chevron-left" size={24} style={{ color: colors.dark }} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerText}>
                    Preview
                </Text>

                <View style={{ position: 'absolute', top: 55, right: 25 }}>
                    <TouchableOpacity style={{ margin: 10 }} onPress={() => savePic()}>
                        <FontAwesome5 name="file-download" style={styles.arrowIcon} size={24} />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{ alignItems: 'center', margin: 10 }}>

                <TextInput
                    style={
                        [
                            styles.modalInput
                            , { width: !inputName ? placeholderValue.length * 16 : inputName.length * 13 + 20 }]
                    }
                    placeholder={placeholderValue}
                    placeholderTextColor={colors.darker}
                    onChangeText={(value: string) => {
                        setInputName(value)
                    }}
                    keyboardType={'default'}
                />

                <TextInput
                    style={[styles.modalInputDescription, { width: !inputDescription ? 70 : inputDescription.length * 8 + 20 }]}
                    placeholder={'Description'}
                    placeholderTextColor={colors.heading}
                    onChangeText={(value: string) => {
                        setInputDescription(value)
                    }}
                    keyboardType={'default'}
                />

            </View>

            <View style={styles.modalImageContainer}>
                <Image
                    style={styles.modalImage}
                    source={{ uri: image }}
                />
            </View>

            <TouchableOpacity
                style={styles.modalResultsButton}
                onPress={() => {
                    handleResults()
                    navigation.navigate("Results")
                }}
            >
                <Text style={styles.modalText}>Results</Text>

            </TouchableOpacity>
            {/* </TouchableWithoutFeedback> */}
        </View>

    );
}


const styles = StyleSheet.create({

    container: {
        backgroundColor: colors.background,
        flex: 1,
    },

    arrowIcon: {
        color: colors.darker,
    },

    headerText: {
        fontFamily: fonts.complement,
        // color: colors.body_dark,
        fontSize: fonts.bigger

    },

    modalButtonsContainer: {
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

    modalInput: {
        fontSize: 24,
        textAlign: 'center',
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: colors.ligher,
        borderRadius: 5,
        backgroundColor: colors.white
    },

    modalInputDescription: {
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: colors.ligher,
        borderRadius: 5,
        backgroundColor: colors.white,
        marginTop: 5
    },

    modalImageContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
        shadowColor: colors.regular,
        shadowRadius: 2,
        shadowOpacity: 90,
        shadowOffset: { width: 0, height: 0 },
        elevation: -2,
        justifyContent: 'center',


    },

    modalImage: {
        width: '100%',
        height: metrics.screenHeight / 1.7,
        borderRadius: 10,
        padding: 20,

    },

    modalResultsButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: colors.primary,
        padding: 20,
        height: 70,
        marginHorizontal: 80,
        shadowColor: colors.regular,
        shadowRadius: 2,
        shadowOpacity: 90,
        shadowOffset: { width: 0, height: 0 },
        elevation: -2,
    },

    modalText: {
        fontWeight: '400',
        fontSize: 24,
        color: colors.white,

    },

});