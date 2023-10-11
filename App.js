import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import store from "./store/redux";
import { Provider } from "react-redux";
import Login from "./Screens/Login/login";
import { PaperProvider } from "react-native-paper";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import XeyeNavigator from "./Navigation/XeyeNavigator";
export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Provider store={store}>
          <PaperProvider>
            <XeyeNavigator />
          </PaperProvider>
        </Provider>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
