import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Main from '../pages/Main';
import CameraView from '../pages/CameraView';
import Data from '../pages/Data';

import colors from '../styles/colors';

const Tab = createBottomTabNavigator();

export default function MyTabs() {

    return (
        <Tab.Navigator
            initialRouteName="CameraView"
            tabBarOptions={{
                activeTintColor: colors.primary,
                showLabel: false,
            }}
        >
            <Tab.Screen
                name="Main"
                component={Main}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="clone" color={color} size={size} style={{ marginTop: 12 }} />
                    ),
                }}
            />

            <Tab.Screen
                name="CameraView"
                component={CameraView}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View style={styles.cameraContainer}>
                            <Icon name="camera" style={styles.cameraIcon} size={size} />
                        </View>
                    ),
                    tabBarVisible: false,
                    unmountOnBlur: true,
                }}
            />

            <Tab.Screen
                name="Data"
                component={Data}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="bar-chart" color={color} size={size} style={{ marginTop: 12 }} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    cameraContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        marginTop: 12,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",

    },

    cameraIcon: {
        color: colors.white,
        shadowColor: colors.dark,
        shadowRadius: 2,
        shadowOpacity: 90,
        shadowOffset: { width: 0, height: 0 },
        elevation: -2,


    },

});