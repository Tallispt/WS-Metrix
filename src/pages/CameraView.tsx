import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    Platform,
    StyleSheet,
    Animated,
    Pressable
} from 'react-native';
import { Camera } from 'expo-camera';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MiniModal from 'react-native-modal';
import Slider from '@react-native-community/slider';

import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import { SettingsProps } from '../libs/storage';

import Vector from '../assets/Union.png';
import ExcludeVector from '../assets/Exclude.png';
import { CameraHeader } from '../components/CameraHeader';
import { CameraTab } from '../components/CameraTab';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics';

export default function CameraView() {

    function FocusAwareStatusBar(props: any) {
        const isFocused = useIsFocused();
        // if (isFocused) {
        //     loadSettings();
        // }

        return isFocused ? <StatusBar {...props} /> : null;
    }

    const cameraRef = useRef(null);

    const navigation = useNavigation();

    const size = useRef(new Animated.ValueXY()).current;

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasLibraryPermission, setHasLibraryPermission] = useState(null);

    const [flashOn, setFlashOn] = useState(Camera.Constants.FlashMode.off);

    const [handleOn, setHandleOn] = useState<boolean>(false);

    const [modeSample, setModeSample] = useState<String>("Sample Mode");
    const [numPhotos, setNumPhotos] = useState<Number>();
    const [numReplicatas, setNumReplicatas] = useState<Number>();
    const [numPhotoAtual, setNumPhotoAtual] = useState(1);
    const [restart, setRestart] = useState(false);

    const [image, setImage] = useState<string>();
    const [arrayImage, setArrayImage] = useState([]);
    const [arrayBase, setArrayBase] = useState([]);

    const [bottomSetUpVisibility, setBottomSetUpVisibility] = useState(true);
    const [isModalSliderVisible, setModalSliderVisible] = useState(false);
    const [imageSizeVector, setImageSizeVector] = useState<number>(125)
    const [imageSizeBigVector, setImageSizeBigVector] = useState<number>(200)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();

        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }
        })();

    }, []);

    useFocusEffect(
        React.useCallback(() => {
            loadSettings();
            reset()

        }, [])
    );

    if (hasCameraPermission === null) {
        return <View />;
    }
    if (hasCameraPermission === false) {
        return <Text>No access to camera.</Text>;
    }

    const requestLibraryAccess = () => {
        (async () => {
            const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
            setHasLibraryPermission(status === 'granted');
        })();

        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }

    async function loadSettings() {
        const data = await AsyncStorage.getItem("@settingsData");
        const settingsData = JSON.parse(data) as SettingsProps;

        setNumPhotos(settingsData.SampleNumber);
        setNumReplicatas(settingsData.ReplicatesNumber)
    }

    function reset() {
        setNumPhotoAtual(1);
        setArrayImage([]);
        setArrayBase([]);
    }

    async function sharePartialInfo(image: string, base: string, height: number, width: number) {
        const partialInfo = {
            mode: modeSample,
            image: image,
            arrayImage: arrayImage,
            base: base,
            arrayBase: arrayBase,
            imageHeight: height,
            imageWidth: width,
        }

        await AsyncStorage.setItem('@partialInfo', JSON.stringify(partialInfo))
    }

    function changeSizeBig() {
        Animated.timing(size, { toValue: { x: 180, y: 200 }, duration: 200, useNativeDriver: false }).start();
        setHandleOn(true)
    }

    function changeSizeNull() {
        Animated.timing(size, { toValue: { x: 0, y: 0 }, duration: 200, useNativeDriver: false }).start();
        setHandleOn(false)
    }

    async function snap() {
        // setInputName(undefined);
        // setInputDescription('No description');
        if (cameraRef) {
            const data = await cameraRef.current.takePictureAsync({
                base64: true,
            });
            if (modeSample == "Analytical Curve Mode") {
                arrayImage.push(data.uri);
                arrayBase.push(data.base64);
                setNumPhotoAtual(numPhotoAtual + 1);
                !restart ? setRestart(true) : null
                if (numPhotoAtual == numPhotos) {
                    arrayImage.slice(1, arrayImage.length),
                        arrayBase.slice(1, arrayBase.length)
                    sharePartialInfo(data.uri, data.base64, data.height, data.width)
                    navigation.navigate("Preview")
                }
            } else {
                // setArrayImage(['none']);
                // setArrayBase(['none']);
                sharePartialInfo(data.uri, data.base64, data.height, data.width)
                navigation.navigate("Preview")
            }
        }
    };

    async function pickImage() {
        requestLibraryAccess()

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0,
            base64: false,
        })

        if (!result.cancelled) {
            const { uri } = result as ImageInfo;
            setImage(uri);
            // const asset = await MediaLibrary.getAssetInfoAsync(result);
        }
    };

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle={'light-content'} />
            <Camera
                ref={cameraRef}
                style={{ flex: 1 }}
                type={Camera.Constants.Type.back}
                flashMode={flashOn}
            >
                <CameraHeader
                    pickImage={pickImage}
                    setFlashOn={setFlashOn}
                    flashOn={flashOn}
                    Camera={Camera}
                />

                <View
                    style={styles.innerCameraView}
                >
                    <TouchableOpacity
                        onPress={() => { setModalSliderVisible(!isModalSliderVisible) }}
                    >
                        <Image
                            style={
                                modeSample == "WS Mode"
                                    ? {
                                        height: imageSizeBigVector,
                                        width: imageSizeBigVector,
                                        opacity: 0.2,
                                        bottom: 60
                                    } : {
                                        height: imageSizeVector,
                                        width: imageSizeVector,
                                        opacity: 0.2,
                                        bottom: 80
                                    }}
                            source={modeSample == "WS Mode" ? Vector : ExcludeVector}
                        />
                    </TouchableOpacity>

                    <CameraTab snap={snap} />

                    <Animated.View
                        style={{
                            height: size.x,
                            width: size.y,
                            backgroundColor: colors.regular,
                            borderRadius: 20,
                            position: 'absolute',
                            bottom: 115,
                            opacity: 0.9,
                            shadowColor: colors.dark,
                            shadowRadius: 2,
                            shadowOpacity: 90,
                            shadowOffset: { width: 0, height: 0 },
                            elevation: -2,
                            zIndex: 20,
                        }}>
                        {handleOn &&
                            <>
                                <TouchableOpacity
                                    style={{ height: 60, justifyContent: 'center', alignItems: 'center', borderBottomColor: colors.light, borderBottomWidth: 1 }}
                                    onPress={() => {
                                        setModeSample("Sample Mode")
                                        changeSizeNull()
                                    }}
                                >
                                    <Text style={{ color: colors.white }}>
                                        Sample Mode
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ height: 60, justifyContent: 'center', alignItems: 'center', borderBottomColor: colors.light, borderBottomWidth: 1 }}
                                    onPress={() => {
                                        setModeSample("Analytical Curve Mode")
                                        changeSizeNull()
                                        reset()
                                        loadSettings();
                                        restart ? setRestart(false) : null
                                    }}
                                >
                                    <Text style={{ color: colors.white }}>
                                        Analytical Curve Mode
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => {
                                        setModeSample("WS Mode")
                                        changeSizeNull()
                                    }}
                                >
                                    <Text style={{ color: colors.white }}>
                                        WS Mode
                                    </Text>
                                </TouchableOpacity>
                            </>
                        }


                    </Animated.View>

                    {handleOn &&
                        <View
                            style={{
                                width: metrics.screenWidth,
                                height: metrics.screenHeight,
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                backgroundColor: colors.darker,
                                opacity: 0.8,
                                zIndex: 10
                            }} >
                            <Pressable
                                style={{ width: metrics.screenWidth, height: metrics.screenHeight }}
                                onPressOut={() => { changeSizeNull() }}
                            />
                        </View>
                    }

                    {
                        modeSample == "Analytical Curve Mode" && bottomSetUpVisibility &&
                        <>
                            <View
                                style={styles.modeButtonCounter}
                            >
                                <Text style={styles.modeText}>
                                    {`${numPhotoAtual}/${numPhotos}`}
                                </Text>

                            </View>
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 115,
                                    left: 10
                                }}
                            >
                                <Text style={styles.modeText}>
                                    {`${numReplicatas} replicatas`}
                                </Text>

                            </View>

                        </>
                    }

                    {
                        restart && bottomSetUpVisibility &&

                        <TouchableOpacity
                            style={{ position: 'absolute', right: 20, width: 58, bottom: 115 }}
                            onPress={() => {
                                reset()
                                setRestart(false)
                            }}
                        >
                            <Text
                                style={styles.modeText}
                            >
                                Restart
                            </Text>
                        </TouchableOpacity>
                    }

                    {
                        bottomSetUpVisibility &&

                        <TouchableOpacity
                            style={styles.modeButton}
                            onPress={() => {
                                changeSizeBig()

                            }}
                        >
                            <Text
                                style={styles.modeText}
                            >
                                {modeSample}
                            </Text>
                        </TouchableOpacity>}


                </View>

                <MiniModal
                    isVisible={isModalSliderVisible}
                    onBackdropPress={() => setModalSliderVisible(false)}
                    onSwipeComplete={() => setModalSliderVisible(false)}
                    onModalWillShow={() => setBottomSetUpVisibility(!bottomSetUpVisibility)}
                    onModalWillHide={() => setBottomSetUpVisibility(!bottomSetUpVisibility)}
                    swipeDirection={'down'}
                    coverScreen={false}
                    backdropOpacity={0}
                >

                    <View style={{
                        height: metrics.screenHeight / 8.1,
                        position: 'absolute',
                        bottom: 85,
                        backgroundColor: colors.darker,
                        opacity: 0.85,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <Slider
                            style={{ width: 300, height: 40, marginHorizontal: 20 }}
                            step={1}
                            value={modeSample == "WS Mode" ? imageSizeBigVector : imageSizeVector}
                            onSlidingStart={(value: number) => { value }}
                            minimumValue={modeSample == "WS Mode" ? 150 : 50}
                            maximumValue={modeSample == "WS Mode" ? 250 : 200}
                            thumbTintColor={colors.primary}
                            minimumTrackTintColor={colors.primary_light}
                            maximumTrackTintColor={colors.ligher}
                            onValueChange={(value: number) => { modeSample == "WS Mode" ? setImageSizeBigVector(value) : setImageSizeVector(value) }}
                        />
                        <Text style={{ color: colors.white }}>{modeSample == "WS Mode" ? imageSizeBigVector : imageSizeVector}</Text>
                    </View>
                </MiniModal>

            </Camera>

            {/* {image &&

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={open}
                    presentationStyle={'overFullScreen'}
                    style={{ backgroundColor: colors.background }}
                >
                    <CameraModal
                        image={image}
                        height={height}
                        width={width}
                        setOpen={setOpen}
                        setArrayImage={setArrayImage}
                        setNumPhotoAtual={setNumPhotoAtual}
                        numSampleMode={numSampleMode}
                        numCurveMode={numCurveMode}
                        numWSMode={numWSMode}
                        setInputName={setInputName}
                        setInputDescription={setInputDescription}
                        handleResults={handleResults}
                        loading={loading}
                        modeSample={modeSample}

                    />
                </Modal>
            } */}

        </View>


    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    arrowIcon: {
        color: colors.darker,
    },

    camera: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },

    cameraButton: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },

    cameraIcon: {
        color: colors.white,
    },

    innerCameraView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    // vector: {
    //     height: imageSize,
    //     width: 200,
    //     opacity: 0.2,
    // },

    modeButtonCounter: {
        backgroundColor: colors.darker,
        borderRadius: 10,
        opacity: 0.7,
        position: 'absolute',
        bottom: 143
    },

    modeButton: {
        backgroundColor: colors.darker,
        borderRadius: 10,
        opacity: 0.7,
        position: 'absolute',
        bottom: 115
    },

    modeText: {
        paddingHorizontal: 8,
        color: colors.white,
        paddingVertical: 4,
        fontFamily: fonts.text,
        fontSize: 13
    },

});

