import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics'

export function CameraTab({ snap }) {
    const navigation = useNavigation();

    return (
        <View style={{ position: 'absolute', left: 0, bottom: 0, width: metrics.screenWidth, zIndex: 0 }}>
            <View style={styles.containerTab}>

                <TouchableOpacity
                    onPress={() => { navigation.navigate("Main") }}
                >
                    <Icon name="clone" size={24} style={styles.iconTab} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => { snap() }}>
                    <Icon name="circle" size={80} style={styles.cameraIconTab} />
                    <Icon name="circle-thin" size={70} style={styles.innerCameraIconTab} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate("Data") }}
                >
                    <Icon name="bar-chart" size={24} style={styles.iconTab} />
                </TouchableOpacity>
            </View>
        </View>

    );
}


const styles = StyleSheet.create({
    containerTab: {
        backgroundColor: colors.darker,
        height: 110,
        opacity: 0.9,
        paddingHorizontal: metrics.doubleBaseMargin * 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },

    cameraIconTab: {
        color: colors.white,
        shadowColor: colors.light,
        shadowRadius: 2,
        shadowOpacity: 90,
        shadowOffset: { width: 0, height: 0 },
        elevation: -2,
        position: 'absolute',

    },

    innerCameraIconTab: {
        color: colors.darker,
        position: 'absolute',

    },

    iconTab: {
        color: colors.white,
    },
});