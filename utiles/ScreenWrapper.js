import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React from "react";
import newReportBackground from "../assets/background/background.png";
import colors from "../styles/colors";
import { StatusBar } from "expo-status-bar";
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
          <StatusBar style="light" backgroundColor={colors.navbar} />
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
    // paddingVertical: 16,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    // backgroundColor: colors.background,
  },

  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
