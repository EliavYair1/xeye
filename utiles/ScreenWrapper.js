import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React from "react";
import newReportBackground from "../assets/background/background.png";
const ScreenWrapper = ({
  children,
  isForm = false,
  edges = ["top", "right", "bottom", "left"],
  wrapperStyle,
  isConnectedUser = false,
  // newReportBackGroundImg,
}) => {
  const renderBackground = () => {
    if (isConnectedUser) {
      return (
        <ImageBackground
          style={styles.backgroundImage}
          source={newReportBackground}
        >
          {children}
        </ImageBackground>
      );
    }

    return children;
  };
  const WrapperComponent = isForm ? KeyboardAwareScrollView : View;

  return (
    <>
      <SafeAreaView edges={edges} style={styles.container}>
        <WrapperComponent
          contentContainerStyle={styles.contentWrapper}
          style={wrapperStyle}
        >
          {renderBackground()}
        </WrapperComponent>
      </SafeAreaView>
    </>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
