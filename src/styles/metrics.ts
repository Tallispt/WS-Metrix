import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('screen');
const minimunHeight = height / 100;

export default {
    smallMargin: 5,
    baseMargin: 10,
    doubleBaseMargin: 20,
    screenWidth: width,
    screenHeight: height,
    tabBarHeight: 54,
    navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
    statusBarHeight: (Platform.OS === 'ios') ? 20 : 0,
    headerHeight: (Platform.OS === 'ios') ? minimunHeight * 13 : minimunHeight * 8,
    baseRadius: 3,
};