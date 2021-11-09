import React, { Component, useState, useRef, useEffect } from 'react';
import { View, Image } from "react-native"
import Canvas, { Image as CanvasImage } from 'react-native-canvas';
// import { Asset } from 'expo-asset';ya
import AsyncStorage from '@react-native-async-storage/async-storage';

import metrics from '../styles/metrics';
import { StorageDataProps } from '../libs/storage';

export default class CanvasView extends Component {

    handleCanvas = (canvas) => {

        if (canvas) {
            if (!(canvas instanceof Canvas)) {
                return;
            }

            async function getUri() {
                const data = await AsyncStorage.getItem("@dataSample");
                const parseData = JSON.parse(data) as StorageDataProps;

                const src = "https://avatarfiles.alphacoders.com/108/108917.png"

                // const uri = String(parseData[1].data.base64);
                // const src = "data:image/jpeg;base64," + uri;



                const width = 200;
                const height = 200;
                const image = new CanvasImage(canvas, width, height);
                const ctx = canvas.getContext('2d');

                image.addEventListener('error', (err) => {
                    console.log(err)
                })

                // image.src = Image.resolveAssetSource(require('./sample_img.jpg')).uri;
                image.src = src;
                image.width = width;
                image.height = height;


                // const asset = Asset.fromModule(require(src));
                // console.log(asset);

                canvas.width = metrics.screenWidth;
                canvas.height = metrics.screenHeight;

                // ctx.fillStyle = 'purple';
                // ctx.fillRect(0, 0, metrics.screenWidth, metrics.screenHeight);

                // image.src = src;
                ctx.drawImage(image, 0, 0, width, height);
                const imageData = ctx.getImageData(0, 0, width, height);
                console.log(imageData);

            }
            getUri()
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {/* <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <TouchableOpacity style={{ backgroundColor: 'red', width: 40, height: 40, borderRadius: 20 }}>

                    </TouchableOpacity>
                </View> */}
                <Canvas ref={this.handleCanvas} style={{
                    position: 'absolute',
                    // zIndex: -20
                    // borderWidth: 1,
                    // borderColor: "red"
                }} />
            </View>
        )
    }
}