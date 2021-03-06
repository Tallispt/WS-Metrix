import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import LottieView from 'lottie-react-native';

import loadAnimation from '../assets/Loading.json';

export function Load() {
    return (
        <View style={style.container}>
            <LottieView
                source={loadAnimation}
                autoPlay
                duration={2000}
                loop
                style={style.animation}

            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    animation: {
        backgroundColor: 'transparent',
        width: 80,
        height: 80

    }
})