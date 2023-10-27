import { StatusBar } from "expo-status-bar";
import { Provider, useDispatch } from "react-redux";
import store from "../store/redux";
import { StyleSheet, View } from "react-native";
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
import Constants from "expo-constants";
import ScreenWrapper from "../utiles/ScreenWrapper";
import colors from "../styles/colors";
const statusBarHeight = Constants.statusBarHeight;
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
    prepare();
  }, []);

  const onAppLoaded = async () => {
    await SplashScreen.hideAsync();
    setTimeout(async () => {
      setAppIsReady(true);
      const loginToken = await retrieveData("userToken");
      console.log(`toekn #${loginToken}`);
      if (loginToken) {
        router.replace("/home");
        // console.log("home");
      } else {
        router.replace("/login");
        // console.log("login");
      }
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
      <Provider store={store}>
        <PaperProvider>
          <StatusBar style="light" backgroundColor={colors.navbar} />
          <ScreenWrapper wrapperStyle={styles.container} edges={[]}>
            <Stack screenOptions={{ headerShown: false }} initialRouteName="" />
          </ScreenWrapper>
        </PaperProvider>
      </Provider>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
