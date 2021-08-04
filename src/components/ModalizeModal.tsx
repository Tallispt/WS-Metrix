import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Modalize } from 'react-native-modalize';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics'

export default function ModalizeModal({ modalizeRef }) {

    return (

        <Modalize
            ref={modalizeRef}
            snapPoint={180}
        >
            <View style={styles.modals}>
                <Text>Modal</Text>
            </View>
        </Modalize>

    );
};


const styles = StyleSheet.create({
    modals: {
        // height: metrics.screenHeight,
        // paddingTop: metrics.doubleBaseMargin,
        // paddingHorizontal: metrics.doubleBaseMargin,
        // backgroundColor: colors.white,
        // borderBottomWidth: 1,
        // borderColor: colors.ligher,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

});