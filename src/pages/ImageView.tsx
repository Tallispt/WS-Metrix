import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import Canvas from 'react-native-canvas';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import metrics from '../styles/metrics';

export default function ImageView() {
    const handleCanvas = (canvas: Canvas) => {
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = 'src/assets/Vector.png';
        ctx.drawImage(image, 0, 0);
    }


    return (
        <Canvas ref={handleCanvas} />
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },


});