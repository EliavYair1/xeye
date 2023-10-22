import { StatusBar } from "expo-status-bar";
import { Provider, useDispatch } from "react-redux";
import store from "../store/redux";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Stack, router } from "expo-router";
import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import SplashScreenComponent from "../utiles/SplashScreen";
import { retrieveData } from "../Auth/StorageService";
export default function HomeLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    const checkLoginStatus = async () => {
      const user_id = await retrieveData("user_id");
      console.log(`user #${user_id}`);
      // if (user_id) {
      //   router.replace("/login");
      // }
      // setTimeout(() => router.replace("/login"), 0);
    };
    checkLoginStatus();
    prepare();
  }, []);

  const onAppLoaded = async () => {
    await SplashScreen.hideAsync();
    setTimeout(async () => {
      setAppIsReady(true);
      setTimeout(() => router.replace("/login"), 0);
    }, 1000);
  };

  if (!appIsReady) {
    return <SplashScreenComponent onLoaded={onAppLoaded} />;
  }
  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <PaperProvider>
          <View style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} initialRouteName="" />
          </View>
        </PaperProvider>
      </Provider>
    </>
  );
}
