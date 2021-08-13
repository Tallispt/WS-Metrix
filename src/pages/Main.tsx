import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Header from '../components/Header';


import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics';
import { Teste } from '../libs/GetHex_2';

export default function Main() {

    const navigation = useNavigation();

    const clearAsyncStorage = async () => {
        Alert.alert("Remover", 'Tem certeza que deseja remover todos os dados?', [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        AsyncStorage.clear();
                    } catch (error) {
                        Alert.alert('Não foi possível apagar os dados')
                    }
                }
            }
        ])
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <Header />

            <View style={styles.innerContainer}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { navigation.navigate('Settings') }}
                >
                    <Text style={styles.buttonText}>Configurações</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { navigation.navigate('Welcome') }}
                >
                    <Text style={styles.buttonText}>Tutorial</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={clearAsyncStorage}
                >
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { navigation.navigate("Results") }}
                >
                    <Text style={styles.buttonText}>Teste</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    innerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'

    },


    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
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

    buttonText: {
        fontWeight: '400',
        fontSize: 24,
        color: colors.white,

    },


});