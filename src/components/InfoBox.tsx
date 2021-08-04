import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics';

interface InfoBoxProps {
    id: string,
    title: string,
    text: string,
}

export default function InfoBox({
    id,
    title,
    text
}: InfoBoxProps) {

    return (
        <View style={styles.box}>
            <Text style={styles.boxTitle}>{title}</Text>
            <View style={styles.boxInfo}>
                <Text style={styles.boxInfoText}>{text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        margin: metrics.doubleBaseMargin,
        backgroundColor: colors.primary,
        width: metrics.screenWidth - metrics.doubleBaseMargin * 2,
        borderRadius: 30,
        shadowColor: colors.regular,
        shadowRadius: 2,
        shadowOpacity: 90,
        shadowOffset: { width: 0, height: 0 },
        elevation: -2,

    },

    boxTitle: {
        paddingHorizontal: metrics.doubleBaseMargin * (7 / 5),
        paddingTop: metrics.doubleBaseMargin * (7 / 5),
        fontSize: fonts.bigger,
        color: colors.white,
        fontWeight: 'bold',


    },

    boxInfo: {
        padding: metrics.doubleBaseMargin,

    },

    boxInfoText: {
        fontSize: fonts.big,
        color: colors.white,

    },

    boxImage: {
        paddingTop: 40,
        alignSelf: 'center',
        borderRadius: 10,
        width: 200,
        height: 200,

    },
})