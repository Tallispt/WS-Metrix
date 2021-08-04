import React, { useState, useRef } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Animated,
    StatusBar,
    ScrollView
} from 'react-native';
import { ScalingDot } from "react-native-animated-pagination-dots";

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics';

const InfoBoxContent = [
    {
        id: '1',
        title: "Welcome!",
        text: '',
    },
    {
        id: '2',
        title: "Overview",
        text: '',
    },
    {
        id: '3',
        title: "How to use",
        text: '',
    },
    {
        id: '4',
        title: "Exemples",
        text: '',
    },
    {
        id: '5',
        title: "More about",
        text: '',
    },
]

export function Welcome({ handleContinue }) {

    const scrollX = useRef(new Animated.Value(0)).current;
    const [valueScroll, setValueScroll] = useState(0);
    const [index, setIndex] = useState(0);

    const scrollRef = useRef<ScrollView>(null);

    const handleNext = () => {
        scrollRef.current?.scrollTo({
            x: valueScroll + metrics.screenWidth,
            y: 0,
            animated: true,
        });
    }

    const handleSkip = () => {
        scrollRef.current.scrollToEnd({ animated: true });
    }

    const getIndex = (event) => {
        const positionX = event.nativeEvent.contentOffset.x;
        setValueScroll(positionX);
        setIndex(Math.trunc(positionX / metrics.screenWidth))
    }

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar barStyle={'dark-content'} />

            <Text style={styles.title}>
                WS Metrix
            </Text>

            <ScrollView
                ref={scrollRef}
                horizontal
                onScroll={Animated.event([{
                    nativeEvent: {
                        contentOffset: {
                            x:
                                scrollX
                        }
                    }
                }], { useNativeDriver: false, listener: (event) => getIndex(event) })
                }
                snapToAlignment={'center'}
                snapToInterval={metrics.screenWidth}
                decelerationRate={0}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                pagingEnabled
            >
                <View style={styles.box}>
                    <Text style={styles.boxTitle}>{'Welcome'}</Text>
                    <View style={styles.boxInfo}>
                        <Text style={styles.boxInfoText}>{'loren fjaijfoaijfad'}</Text>
                    </View>
                </View>

                <View style={styles.box}>
                    <Text style={styles.boxTitle}>{'Overview'}</Text>
                    <View style={styles.boxInfo}>
                        <Text style={styles.boxInfoText}>{'loren fjaijfoaijfad'}</Text>
                    </View>
                </View>

                <View style={styles.box}>
                    <Text style={styles.boxTitle}>{'How to use'}</Text>
                    <View style={styles.boxInfo}>
                        <Text style={styles.boxInfoText}>{'loren fjaijfoaijfad'}</Text>
                    </View>
                </View>

                <View style={styles.box}>
                    <Text style={styles.boxTitle}>{'Exemples'}</Text>
                    <View style={styles.boxInfo}>
                        <Text style={styles.boxInfoText}>{'loren fjaijfoaijfad'}</Text>
                    </View>
                </View>

                <View style={styles.box}>
                    <Text style={styles.boxTitle}>{'More about'}</Text>
                    <View style={styles.boxInfo}>
                        <Text style={styles.boxInfoText}>{'loren fjaijfoaijfad'}</Text>
                    </View>

                </View>

            </ScrollView>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: metrics.tabBarHeight }}>

                <TouchableOpacity
                    onPress={handleSkip}
                    style={{ paddingHorizontal: 20, paddingVertical: 5, position: 'absolute', left: 20 }}
                >
                    <Text style={{ color: colors.primary }}>
                        Skip
                    </Text>

                </TouchableOpacity>

                <ScalingDot
                    data={InfoBoxContent}
                    scrollX={scrollX}
                    activeDotScale={1.4}
                    inActiveDotColor={colors.regular}
                    activeDotColor={colors.primary}
                    inActiveDotOpacity={0.3}
                    dotStyle={styles.paginationDot}
                    containerStyle={styles.paginationDotContainer}
                />

                {index < 3.1 ? (
                    <TouchableOpacity
                        onPress={handleNext}
                        style={{ paddingHorizontal: 20, paddingVertical: 5, position: 'absolute', right: 20 }}
                    >
                        <Text style={{ color: colors.primary }}>
                            Next
                        </Text>

                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleContinue}
                        style={{ paddingHorizontal: 20, paddingVertical: 5, position: 'absolute', right: 20 }}
                    >
                        <Text style={{ color: colors.primary }}>
                            Done
                        </Text>

                    </TouchableOpacity>
                )}

            </View>

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,

    },

    title: {
        fontFamily: fonts.title,
        fontSize: fonts.bigger * 1.5,
        color: colors.primary,
        alignSelf: 'center',
        paddingTop: 10

    },


    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 3,
    },

    paginationDotContainer: {
        position: 'relative',
        bottom: 5,
        flexDirection: "row",
    },

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
        alignItems: 'center'

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

    boxButton: {
        backgroundColor: colors.shape,
        alignItems: 'center',
        width: 160,
        borderRadius: 5,
        shadowColor: colors.regular,
        shadowRadius: 2,
        shadowOpacity: 90,
        shadowOffset: { width: 0, height: 0 },
        elevation: -2,


    },

    boxButtonText: {
        fontFamily: fonts.title,
        color: colors.heading,
        fontSize: fonts.bigger,
        padding: 5

    }

})
