import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics';

export const Replicates = (
    numReplicates: any,
    numReplicataAtual: any
) => {

    if (numReplicates.numReplicates == 1) {
        return (
            <View style={styles.innerContainer}>
                <View style={[numReplicates.numReplicataAtual == 1 ? styles.blueCircleSelected : styles.blueCircle]} />
            </View>
        )
    }

    if (numReplicates.numReplicates == 2) {
        return (
            <View style={styles.innerContainer}>
                <View style={[numReplicates.numReplicataAtual == 1 ? styles.blueCircleSelected : styles.blueCircle]} />
                <View style={[numReplicates.numReplicataAtual == 2 ? styles.blueCircleSelected : styles.blueCircle]} />
            </View>
        )
    }

    if (numReplicates.numReplicates == 3) {
        return (
            <View style={styles.innerContainer}>
                <View style={[numReplicates.numReplicataAtual == 1 ? styles.blueCircleSelected : styles.blueCircle]} />
                <View style={[numReplicates.numReplicataAtual == 2 ? styles.blueCircleSelected : styles.blueCircle]} />
                <View style={[numReplicates.numReplicataAtual == 3 ? styles.blueCircleSelected : styles.blueCircle]} />
            </View>
        )
    }

    if (numReplicates.numReplicates == 4) {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'baseline' }}>
                    <View style={styles.innerContainer}>
                        <View style={[numReplicates.numReplicataAtual == 1 ? styles.blueCircleSelected : styles.blueCircle]} />
                        <View style={[numReplicates.numReplicataAtual == 2 ? styles.blueCircleSelected : styles.blueCircle]} />
                        <View style={[numReplicates.numReplicataAtual == 3 ? styles.blueCircleSelected : styles.blueCircle]} />
                    </View>
                    <View style={[numReplicates.numReplicataAtual == 4 ? styles.blueCircle : styles.blueCircle]} />
                </View>
            </View>
        )
    }

    if (numReplicates.numReplicates == 5) {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'baseline' }}>
                    <View style={styles.innerContainer}>
                        <View style={[numReplicates.numReplicataAtual == 1 ? styles.blueCircleSelected : styles.blueCircle]} />
                        <View style={[numReplicates.numReplicataAtual == 2 ? styles.blueCircleSelected : styles.blueCircle]} />
                        <View style={[numReplicates.numReplicataAtual == 3 ? styles.blueCircleSelected : styles.blueCircle]} />
                    </View>
                    <View style={styles.innerContainer}>
                        <View style={[numReplicates.numReplicataAtual == 4 ? styles.blueCircleSelected : styles.blueCircle]} />
                        <View style={[numReplicates.numReplicataAtual == 5 ? styles.blueCircleSelected : styles.blueCircle]} />
                    </View>
                </View>
            </View>
        )
    }

    if (numReplicates.numReplicates == 6) {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'baseline' }}>
                    <View style={styles.innerContainer}>
                        <View style={[numReplicates.numReplicataAtual == 1 ? styles.blueCircleSelected : styles.blueCircle]} />
                        <View style={[numReplicates.numReplicataAtual == 2 ? styles.blueCircleSelected : styles.blueCircle]} />
                        <View style={[numReplicates.numReplicataAtual == 3 ? styles.blueCircleSelected : styles.blueCircle]} />
                    </View>
                    <View style={styles.innerContainer}>
                        <View style={[numReplicates.numReplicataAtual == 4 ? styles.blueCircleSelected : styles.blueCircle]} />
                        <View style={[numReplicates.numReplicataAtual == 5 ? styles.blueCircleSelected : styles.blueCircle]} />
                        <View style={[numReplicates.numReplicataAtual == 6 ? styles.blueCircleSelected : styles.blueCircle]} />
                    </View>
                </View>
            </View>
        )
    } else return null

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },

    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    blueCircle: {
        backgroundColor: colors.primary,
        height: 15,
        width: 15,
        borderRadius: 15 / 2,
        margin: 2
    },

    blueCircleSelected: {
        backgroundColor: colors.primary,
        height: 15,
        width: 15,
        borderRadius: 15 / 2,
        margin: 2,
        borderWidth: 1,
        borderColor: colors.white
    }

})