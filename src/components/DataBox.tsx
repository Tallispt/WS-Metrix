import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Animated,
    Image
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { LocationGeocodedAddress, LocationObject } from "expo-location";

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics'

interface DataProps extends RectButtonProps {
    data: {
        id: String,
        title: string,
        description: string,
        fullDate: Date,
        date: string,
        time: string;
        location: LocationObject,
        geocode: LocationGeocodedAddress[],
        sample: string,
        uri: string | [],
        base64: string | [],
        width: number;
        height: number;
    };
    handleRemove: () => void;
}

export function DataBox({
    data,
    handleRemove,
    ...rest
}: DataProps) {

    const [photos, setPhotos] = useState<string>();

    function listPhotos() {
        if (data.sample == "Analytical Curve Mode") {
            const arrayPhoto = String(data.uri[0][0]);
            setPhotos(arrayPhoto)
        } else setPhotos(String(data.uri))

    }

    useEffect(() => {
        listPhotos()
    }, [])

    return (

        <Swipeable
            overshootRight={false}
            friction={1}
            renderRightActions={() => (
                <Animated.View>
                    <View style={styles.buttonRemoveContainer}>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={
                                handleRemove
                            }
                        >
                            <Feather name='trash' size={28} color={colors.white} />
                        </RectButton>
                    </View>
                </Animated.View>

            )}
        >
            <RectButton
                style={styles.dataContainer}
                {...rest}
                onPress={() => {
                    console.log(data.uri);
                }}
            >
                <View>
                    <Text style={styles.dataTitle}>{data.title}</Text>
                    <Text style={styles.dataDescription}>{data.description}</Text>
                    <Text style={styles.dataDate}>{data.date}</Text>
                    <Text style={styles.dataDate}>{`${data.geocode[0].city} - ${data.geocode[0].region}`}</Text>
                </View>
                <View>
                    <Image
                        style={styles.dataImage}
                        source={{ uri: photos }}
                    />
                </View>
            </RectButton >
        </Swipeable>
    )
}

const styles = StyleSheet.create({

    buttonRemoveContainer: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        width: 70,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 16.5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 20,
    },

    buttonRemove: {
        width: 70,
        height: 85,
        justifyContent: 'center',
        alignItems: 'center',

    },

    dataContainer: {
        backgroundColor: colors.white,
        height: 100,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 20,
        paddingVertical: metrics.baseMargin,
        paddingHorizontal: metrics.doubleBaseMargin,
        borderWidth: 2,
        borderColor: colors.ligher,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',


    },

    dataTitle: {
        fontSize: fonts.big * 1.2,
        fontWeight: '500',
        paddingBottom: 7,


    },

    dataDate: {
        fontSize: fonts.small,

    },

    dataDescription: {
        fontSize: fonts.small,

    },

    dataImage: {
        width: 70,
        height: 70,
        right: 5,
        borderRadius: 5

    }


})