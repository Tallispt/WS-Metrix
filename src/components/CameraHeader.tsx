import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import Torch from 'react-native-torch';

import colors from '../styles/colors';
import metrics from '../styles/metrics';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function CameraHeader({ pickImage, setFlashOn, flashOn, Camera }) {
    // const [torchOn, setTorchOn] = useState(false);
    const [isIconName, setIsIconName] = useState(false);
    const [isIconNameTorch, setIsIconNameTorch] = useState(false);

    const navigation = useNavigation();

    return (
        <View style={styles.headerContainer}>

            <TouchableOpacity onPress={() => { navigation.navigate("Settings") }}>
                <Ionicons name="settings-sharp" size={24} style={styles.headerCamIcon} />
            </TouchableOpacity>



            {/* <TouchableOpacity
                onPress={() => {
                    setIsIconNameTorch(isIconNameTorch
                        ? false
                        : true
                    );
                    // setTorchOn(
                    //     torchOn === false
                    //         ? true
                    //         : false
                    // );
                    // Torch.switchState(torchOn);
                }}
            >
                <MaterialCommunityIcons
                    name={isIconNameTorch ? "flashlight" : "flashlight-off"}
                    size={24}
                    color="white"
                />
            </TouchableOpacity> */}

            <TouchableOpacity
                onPress={() => {
                    setFlashOn(
                        flashOn === Camera.Constants.FlashMode.off
                            ? Camera.Constants.FlashMode.on
                            : Camera.Constants.FlashMode.off
                    );
                    setIsIconName(
                        isIconName
                            ? false
                            : true
                    );
                }}>
                <Ionicons
                    name={isIconName ? "ios-flash" : "ios-flash-off"}
                    style={styles.headerCamIcon}
                    size={24}
                />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { pickImage() }}>
                <FontAwesome name="picture-o" size={24} style={styles.headerCamIcon} />
            </TouchableOpacity>

        </View>
    )
};



const styles = StyleSheet.create({
    headerContainer: {
        height: metrics.navBarHeight + metrics.statusBarHeight * 2,
        backgroundColor: colors.darker,
        opacity: 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: metrics.doubleBaseMargin * 2,
        paddingBottom: metrics.doubleBaseMargin,
    },

    headerCamIcon: {
        color: colors.ligher,
    },
});