import PixelColor from 'react-native-pixel-color/index'
import * as React from 'react';
import { View } from 'react-native';
// import { GLView } from 'expo-gl';
import Canvas, { CanvasProps } from 'react-native-canvas';
var getPixels = require("get-pixels")

function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    const rgb = [r, g, b]

    return rgb;
}

function hexToRgbNew(hex) {
    var arrBuff = new ArrayBuffer(4);
    var vw = new DataView(arrBuff);
    vw.setUint32(0, parseInt(hex, 16), false);
    var arrByte = new Uint8Array(arrBuff);

    return arrByte[1] + "," + arrByte[2] + "," + arrByte[3];
}



async function ImageManipulation(imgSrc, width, height) {



    // Canvas.width = width;
    // Canvas.height = height;

    // const image = new Image(Canvas);
    // image.src = imgSrc;
    // image.addEventListener("load", () => {
    //     context.drawImage(image, 0, 0);
    //     context
    //         .getImageData(0, 0, Canvas.width, Canvas.height)
    //         .then((imageData) => {
    //             console.log(
    //                 "Image data:",
    //                 imageData,
    //                 Object.values(imageData.data).length
    //             );
    //         })
    //         .catch((e) => {
    //             console.error("Error with fetching image data:", e);
    //         });
    // });


    // try {
    //     // const context = await GLView.createContextAsync();
    //     // const app = new PIXI.Application({ context });
    //     // const sprite = await PIXI.Sprite.from(photo);
    //     // app.stage.addChild(sprite);
    //     // const [r, g, b, a] = app.renderer.extract.pixels(sprite).slice(0, 4);
    //     // setColor(`rgba(${r}, ${g}, ${b}, ${a})`)
    //     // console.log(color);


    // } catch {

    // }

    // PixelColor.getHex(photo, { 0, 0 })
    //     .then((color) => {
    //         console.log(color);

    //     }).catch((err) => {

    //     });

    // function listPhotos() {
    //     const arrayPhoto = String(photo[0]);
    //     if (arrayPhoto == "f") {
    //         setPic(String(photo))
    //     } else { setPicArray(photo) }
    // };

    // listPhotos();

    // if (pic) {

    // };

    // if (picArray) {

    // }

}

function wow(width: number, height: number) {
    const image = new Image(width, height);
    const data = CanvasRenderingContext2D;

}

const handleCanvas = (
    canvas: Canvas,
    width: number,
    height: number,
    imgSrc: string
) => {
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imgSrc;
    ctx.drawImage(image, 0, 0);
}

export default handleCanvas;