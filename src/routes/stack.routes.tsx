import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MyTabs from './tab.routes';
import { Welcome_2 } from '../pages/Welcome_2';
import { Settings } from '../pages/Settings';
import { Results } from '../pages/Results';
import { Preview } from '../pages/Preview';
// import ImageView from '../pages/ImageView';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => (
    <Stack.Navigator
        initialRouteName="Tabs"
        headerMode='none'
    // screenOptions={{ gestureEnabled: false }}
    >
        <Stack.Screen
            name='Tabs'
            component={MyTabs}
        />
        <Stack.Screen
            name='Welcome'
            component={Welcome_2}
        />
        <Stack.Screen
            name='Settings'
            component={Settings}
            options={{}}
        />
        <Stack.Screen
            name='Preview'
            component={Preview}
        />
        <Stack.Screen
            name='Results'
            component={Results}
        />
    </Stack.Navigator>
);

export default AppRoutes;
