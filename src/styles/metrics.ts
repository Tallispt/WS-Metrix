import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default {
    smallMargin: 5,
    baseMargin: 10,
    doubleBaseMargin: 20,
    screenWidth: width,
    screenHeight: height,
    tabBarHeight: 54,
    navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
    statusBarHeight: (Platform.OS === 'ios') ? 20 : 0,
    baseRadius: 3,
};