import { getPixelRGBA } from 'react-native-get-pixel';
import exclude from '../assets/Exclude.png'

getPixelRGBA(exclude, 2, 2)
    .then(color => console.log(color)) // [243, 123, 0]
    .catch(err => { });

// import React, { useState } from 'react';
// import getPixels from 'get-pixels';
// import util from 'util';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import metrics from '../styles/metrics';
// import { StorageDataProps } from '../libs/storage';

// import exclude from '../assets/Exclude.png'

// const [base, setBase] = useState<string>()

// getPixels(exclude, function (err, pixels) {
//     if (err) {
//         console.log("Bad image path")
//         return
//     }
//     console.log("got pixels", pixels.shape.slice())
// })

// // const string =
// //   "data:image/png;base64, --- data ---";

// // const base64toBuffer = Buffer.from(string.substring(22), "base64");

// async function getUri() {
//     const data = await AsyncStorage.getItem("@dataSample");
//     const parseData = JSON.parse(data) as StorageDataProps;
//     const uri = String(parseData[1].data.base64);
//     const src = "data:image/jpeg;base64," + uri;

//     setBase(src)
// }

// export async function getPixelAt(x: number, y: number, buffer: string, format: string) {
//     getUri();

//     const getPixelsPromisse = util.promisify(getPixels);

//     const pixels = await getPixelsPromisse(buffer, `image/${format}`);
//     const pixelAt = [];

//     for (let i = 0; i <= 3; i++) {
//         pixelAt.push(pixels.get(x, y, i));
//     }

//     return pixelAt;
// }

// // getPixelAt(0, 0, base, "png").then((pixel) => console.log(pixel));