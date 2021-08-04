import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    StyleSheet,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';
import LottieView from 'lottie-react-native';
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
    const [width, setWidth] = useState<Number>();
    const [height, setHeight] = useState<Number>();

    const [inputName, setInputName] = useState<string>();
    const [inputDescription, setInputDescription] = useState<string>();

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

    const placeholder = () => {
        if (modeSample == "Sample Mode") return `Sample ${numSampleMode}`
        if (modeSample == "Analytical Curve Mode") return `Analytical Curve ${numCurveMode}`
        if (modeSample == "WS Mode") return `WS Sample ${numWSMode}`
    }

    const placeholderValue = placeholder();

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

    async function handleResults() {
        try {
            if (modeSample == "Sample Mode") {

                const data = await AsyncStorage.getItem("@dataSample");
                const oldData = data ? (JSON.parse(data) as StorageDataProps) : {};

                const now = new Date()
                const time = now.toLocaleTimeString();
                const date = now.toLocaleDateString();

                const local = await Location.getCurrentPositionAsync({});
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

                console.log(newData.geocode);


            }

            if (modeSample == "Analytical Curve Mode") {

                const data = await AsyncStorage.getItem("@dataCurve");
                const oldData = data ? (JSON.parse(data) as StorageDataProps) : {};

                const now = new Date()
                const time = now.toLocaleTimeString();
                const date = now.toLocaleDateString();

                const local = await Location.getCurrentPositionAsync({});
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

                const local = await Location.getCurrentPositionAsync({});
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
        <>
            {/* <FocusAwareStatusBar barStyle={'dark-content'} /> */}
            <View style={styles.container}>
                <View style={styles.modalButtonsContainer}>

                    <TouchableOpacity
                        style={{ margin: 10 }}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Icon name="chevron-left" style={styles.arrowIcon} size={24} />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>
                        Preview
                    </Text>

                    {/* <TouchableOpacity
                        onPress={() => { }}
                    >
                        <Text>
                            Teste
                        </Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity style={{ margin: 10 }}
                        onPress={() => savePic()}
                    >
                        <FontAwesome5 name="file-download" style={styles.arrowIcon} size={24} />
                    </TouchableOpacity>

                </View>

                <TextInput
                    style={styles.modalInput}
                    placeholder={placeholderValue}
                    placeholderTextColor={colors.darker}
                    onChangeText={(value: string) => {
                        setInputName(value)
                    }}
                />

                <TextInput
                    style={styles.modalInputDescription}
                    placeholder={'Description'}
                    placeholderTextColor={colors.heading}
                    onChangeText={(value: string) => {
                        setInputDescription(value)
                    }}
                />


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
            </View>



        </>


    );
}


const styles = StyleSheet.create({

    container: {
        backgroundColor: colors.background,
        flex: 1,
        height: metrics.screenHeight
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
        height: metrics.navBarHeight + metrics.statusBarHeight * 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: metrics.doubleBaseMargin * 2,
        paddingBottom: metrics.baseMargin,
        borderBottomWidth: 1,
        borderBottomColor: colors.ligher
    },

    modalInput: {
        // color: colors.dark,
        fontSize: 24,
        textAlign: 'center',
        marginTop: 10,
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: colors.light
    },

    modalInputDescription: {
        // color: colors.dark,
        fontSize: 20,
        textAlign: 'center',
        marginTop: 5,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.ligher
    },

    modalImageContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 10,
        shadowColor: colors.regular,
        shadowRadius: 2,
        shadowOpacity: 90,
        shadowOffset: { width: 0, height: 0 },
        elevation: -2,
        justifyContent: 'center',


    },

    modalImage: {
        width: '100%',
        height: metrics.screenHeight / 1.6,
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