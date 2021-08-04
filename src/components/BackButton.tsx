import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics'

function BackButton(buttonColor: string) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <Icon
                name="chevron-left"
                size={24}
                style={{
                    color: buttonColor,
                }}
            />
        </TouchableOpacity>
    );
}

export default BackButton;