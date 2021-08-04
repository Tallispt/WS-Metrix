import GetPixelColor from 'react-native-get-pixel-color';
import { Platform } from 'react-native';

export function ImageColor(data, x, y, dx, dy) {
    if (Platform.OS == 'ios') {

        // upload image
        GetPixelColor.init(image)
            .then(() => {
                console.log('Deu!');
            })
            .catch(err => {
                // Handle errors
            });

        // pick a color at X, Y
        GetPixelColor.pickColorAt(x, y)
            .then((color) => {
                console.log(color);
            })
            .catch(err => {
                // Handle errors
            });
    }
}