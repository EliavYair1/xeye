import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import React from "react";
import { View, StyleSheet, Image, Dimensions, Text } from "react-native";
import colors from "../styles/colors";
const SplashScreenComponent = ({ onLoaded }) => {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  const onLoad = () => {
    onLoaded();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/imgs/xeyeLogo.png")}
        style={styles.image}
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
  image: {},
});

export default SplashScreenComponent;
