import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  ImageBackground,
} from "react-native";
import colors from "../styles/colors";
import background from "../assets/spalshScreen/splashScreen.png";

const SplashScreenComponent = ({ onLoaded }) => {
  useEffect(() => {
    // SplashScreen.preventAutoHideAsync();
  }, []);

  const onLoad = () => {
    onLoaded();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={background}
        onLoad={onLoad}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    backgroundColor: "#05052F",
  },
  image: {
    width: 24,
    height: 24,
  },
  backgroundImage: {
    // flex: 1,r
    resizeMode: "cover",
    width: 369,
    height: 231,
  },
});

export default SplashScreenComponent;
