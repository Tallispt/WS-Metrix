import React, { useRef, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated
} from "react-native";
import colors from "../styles/colors";
import metrics from "../styles/metrics";

export const AdjustableModal = () => {

    const [handleOn, setHandleOn] = useState(false)

    const size = useRef(new Animated.ValueXY()).current;

    function changeSizeBig() {
        Animated.timing(size, { toValue: { x: 300, y: 200 }, duration: 200, useNativeDriver: false }).start();
        setHandleOn(true)
    }

    function changeSizeNull() {
        Animated.timing(size, { toValue: { x: 0, y: 0 }, duration: 200, useNativeDriver: false }).start();
        setHandleOn(false)
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    !handleOn ? changeSizeBig() : changeSizeNull()
                }}
                onPressOut={() => { setHandleOn(!handleOn) }}
                style={{ position: 'absolute', top: 100, zIndex: 20 }}
            >
                <Text style={{ color: colors.white }}>
                    Press Me
                </Text>

            </TouchableOpacity>

            <Animated.View
                style={{
                    height: size.x,
                    width: size.y,
                    backgroundColor: colors.shape,
                    borderRadius: 20,
                    position: 'absolute',
                    bottom: 115,
                    zIndex: 20,
                }}>


            </Animated.View>
            {handleOn &&
                <View style={{ width: metrics.screenWidth, height: metrics.screenHeight, position: 'absolute', bottom: 0, left: 0, backgroundColor: colors.darker, opacity: 0.8, zIndex: 10 }} />

            }

        </>
    )

}

const style = StyleSheet.create({

})

