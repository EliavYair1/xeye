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
import { retrieveData, storeData } from "../Auth/StorageService";
import Constants from "expo-constants";
import ScreenWrapper from "../utiles/ScreenWrapper";
import colors from "../styles/colors";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { LogLevel, OneSignal } from "react-native-onesignal";
import useFetch from "../Hooks/useFetch";
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
      // console.log(`toekn #${loginToken}`);
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);
      OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);

      if (loginToken) {
        OneSignal.login(loginToken);
        await OneSignal.Notifications.requestPermission(true);
        try {
          const data = await useFetch(
            `${process.env.API_BASE_URL}/front/data`,
            loginToken,
            "fetch data"
          );
          // await storeData("agent", data);
          router.replace("/home");

          console.log("Fetched data:", data);
        } catch (error) {
          console.error("Fetch error:", error);
        }
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
            <ActionSheetProvider>
              <Stack
                screenOptions={{ headerShown: false }}
                initialRouteName=""
              />
            </ActionSheetProvider>
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
