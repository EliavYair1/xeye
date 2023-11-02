import { StatusBar } from "expo-status-bar";
import { Provider, useDispatch } from "react-redux";
import store from "../store/redux";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import {
  Stack,
  router,
  SplashScreen as ExpoSplashScreen,
  Slot,
  useRootNavigationState,
} from "expo-router";
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
import { setAgentInfo } from "../store/redux/reducers/agentSlice";
import { useUser } from "../Hooks/useUser";
import { useToken } from "../Hooks/useToken";
import useUserLogin from "../Hooks/useUserLogin";
export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "splash",
};
const statusBarHeight = Constants.statusBarHeight;
export default function Layout() {
  const { user, setUser } = useUser();
  const rootNavigationState = useRootNavigationState();
  const [routerIsReady, setRouterIsReady] = useState(false);
  const { token } = useToken();
  const { loginUserWithToken } = useUserLogin();
  const [appIsReady, setAppIsReady] = useState(false);
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  // console.log("Layout :token ", token);
  useEffect(() => {
    async function prepare() {
      // console.log("innnn", routerIsReady, token);
      ExpoSplashScreen.hideAsync();
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);
      OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);
      if (routerIsReady) {
        if (!token) {
          setAppIsReady(true);
          // router.replace("/login");
          setTimeout(() => router.replace("/login"), 10);
        } else {
          const loginSuccess = await loginUserWithToken(token);
          if (loginSuccess) {
            setAppIsReady(true);
            setTimeout(() => router.replace("/home"), 10);
          } else {
            setAppIsReady(true);
            setTimeout(() => router.replace("/login"), 10);
          }
        }
        // await SplashScreen.preventAutoHideAsync();

        //
      }
    }

    prepare();
  }, [routerIsReady, token]);

  useEffect(() => {
    if (rootNavigationState) {
      setRouterIsReady(true);
    }
  }, [rootNavigationState]);
  const onAppLoaded = async () => {
    await SplashScreen.hideAsync();
    setTimeout(async () => {
      setAppIsReady(true);
      // console.log(`toekn #${loginToken}`);

      if (loginToken) {
        // OneSignal.login(loginToken);
        // await OneSignal.Notifications.requestPermission(true);
        try {
          // const data = await useFetch(
          //   `${process.env.API_BASE_URL}/front/data`,
          //   loginToken,
          //   "fetch data"
          // );
          // dispatch(setAgentInfo(data));
          // await storeData("agent", data);
          // router.replace("/home");
          // console.log("Fetched data:", data);
        } catch (error) {
          console.error("Fetch error:", error);
        }
        // console.log("home");
      } else {
        // router.replace("/login");
        // console.log("login");
      }
    }, 1000);
  };

  // if (!appIsReady || !fontsLoaded) {
  //   return (
  //     <SplashScreenComponent
  //       onLoaded={() => {
  //         console.log("loaded...");
  //       }}
  //     />
  //   );
  // }

  return (
    <>
      <Provider store={store}>
        <PaperProvider>
          <StatusBar style="light" backgroundColor={colors.navbar} />
          <ScreenWrapper wrapperStyle={styles.container} edges={[]}>
            <ActionSheetProvider>
              <Stack screenOptions={{ headerShown: false }} />
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
