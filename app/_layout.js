import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import {
  Stack,
  router,
  SplashScreen as ExpoSplashScreen,
  useRootNavigationState,
} from "expo-router";
import React, { useState, useEffect } from "react";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import Constants from "expo-constants";
import ScreenWrapper from "../utiles/ScreenWrapper";
import colors from "../styles/colors";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { LogLevel, OneSignal } from "react-native-onesignal";
import { useToken } from "../Hooks/useToken";
import useUserLogin from "../Hooks/useUserLogin";
import { initializeSocket } from "../Services/socket";
import { useServerUrl } from "../Hooks/useServerUrl";
export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "splash",
};
const statusBarHeight = Constants.statusBarHeight;
export default function Layout() {
  const rootNavigationState = useRootNavigationState();
  const [routerIsReady, setRouterIsReady] = useState(false);
  const { token } = useToken();
  const { loginUserWithToken } = useUserLogin();
  const { ServerUrl } = useServerUrl();
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  useEffect(() => {
    async function prepare() {
      ExpoSplashScreen.hideAsync();
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);
      OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);
      if (routerIsReady) {
        if (!token) {
          // router.replace("/login");
          setTimeout(() => router.replace("/login"), 10);
        } else {
          const loginSuccess = await loginUserWithToken(token);
          if (loginSuccess) {
            initializeSocket(`${ServerUrl}:5000/`);
            setTimeout(() => router.replace("/home"), 10);
          } else {
            setTimeout(() => router.replace("/login"), 10);
          }
        }
      }
    }
    if (ServerUrl) {
      prepare();
    }
  }, [routerIsReady, token, ServerUrl]);

  useEffect(() => {
    if (rootNavigationState) {
      setRouterIsReady(true);
    }
  }, [rootNavigationState]);

  return (
    <>
      <PaperProvider>
        <StatusBar style="light" backgroundColor={colors.navbar} />
        <ScreenWrapper wrapperStyle={styles.container} edges={[]}>
          <ActionSheetProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </ActionSheetProvider>
        </ScreenWrapper>
      </PaperProvider>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
