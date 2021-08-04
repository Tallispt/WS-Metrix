import PixelColor from 'react-native-pixel-color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageDataProps } from './storage';

export async function Teste() {

    const data = await AsyncStorage.getItem('@data')
    const StorageData = data ? JSON.parse(data) as StorageDataProps : {};

    const image = StorageData[1].data.base64;

    console.log(StorageData[1].data.geocode);



    // PixelColor.getHex(image, { x: 50, y: 40 })
    //     .then((color) => {
    //         console.log(color);

    //     }).catch((err) => {
    //         throw err
    //     })

}