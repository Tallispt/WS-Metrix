import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Welcome } from './src/pages/Welcome';
import Routes from './src/routes';

export default function App() {

  const [isFirstUse, setIsFirstUse] = useState(false);

  useEffect(() => {
    checkForFirstTimeLoaded();
  }, [])

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  const settingsData = {
    RGB: true,
    RGBTriple: true,
    CMYK: true,
    HSV: true,

    SampleNumber: 6,
    ReplicatesNumber: 3,
    ReplicatesFirst: true,

    imageSizeVector: 125,
    imageSizeBigVector: 200,
    handleAllowImageClickable: false
  }

  const checkForFirstTimeLoaded = async () => {
    const value = await AsyncStorage.getItem("@firstTimeUse");
    if (value === null) setIsFirstUse(true);
  }

  async function handleContinue() {
    await AsyncStorage.setItem('@firstTimeUse', 'false');
    setIsFirstUse(false);
    await AsyncStorage.setItem('@settingsData', JSON.stringify(settingsData))
  }

  if (!fontsLoaded)
    return (
      <AppLoading />
    )

  if (isFirstUse)
    return (
      <Welcome handleContinue={handleContinue} />
    )
  if (!isFirstUse) {
    return (
      <Routes />
    )
  }
}