import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics';

const Graph = () => {


    const pHData = [1.0, 2.0, 3.0, 4.0, 5.0]
    const RValues = [96.7, 95.3, 82.1, 73.4, 61.2]
    const RDesvio = [1.5, 2.3, 0.4, 0.7, 8.0]

    function YRow() {
        return RValues.map((value, index) => <Text key={index}>{value}</Text>)
    }

    function XRow() {
        return pHData.map((value, index) => <Text key={index}>{value}</Text>)
    }




    return (
        <View style={style.container}>
            <Text style={style.title}>Title</Text>
            <View style={{ height: 190, flexDirection: 'row' }}>
                <View style={{ justifyContent: 'space-evenly', padding: 5, bottom: 12 }}>
                    {YRow()}
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ borderLeftWidth: 2, borderBottomWidth: 2, flex: 1 }}>
                        <View style={{ height: 10, width: 10, backgroundColor: 'red', borderRadius: 5, top: (156 / 5) * (0 + (1 / 2)), left: (294 / 5) * (0 + (1 / 2)) }} />
                        <View style={{ height: 10, width: 10, backgroundColor: 'red', borderRadius: 5, top: (156 / 5) * (1 + (1 / 2)), left: (294 / 5) * (1 + (1 / 2)) }} />
                        <View style={{ height: 10, width: 10, backgroundColor: 'red', borderRadius: 5, top: (156 / 5) * (2 + (1 / 2)), left: (294 / 5) * (2 + (1 / 2)) }} />
                        <View style={{ height: 10, width: 10, backgroundColor: 'red', borderRadius: 5, top: (156 / 5) * (3 + (1 / 2)), left: (294 / 5) * (3 + (1 / 2)) }} />
                        <View style={{ height: 10, width: 10, backgroundColor: 'red', borderRadius: 5, top: (156 / 5) * (4 + (1 / 2)), left: (294 / 5) * (4 + (1 / 2)) }} />

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 5 }}>
                        {XRow()}
                    </View>

                </View>

            </View>
        </View>
    )

}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary_light,
        opacity: 0.7,
        height: 220,
        marginHorizontal: 10,
        marginVertical: 20,
        borderRadius: 20,
        padding: 5
    },

    title: {
        alignSelf: 'center',
        fontSize: fonts.regular,
        fontFamily: fonts.complement,
    }
})

export default Graph;