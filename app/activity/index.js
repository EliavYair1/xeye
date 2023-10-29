import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../utiles/ScreenWrapper";
import Constants from "expo-constants";
import colors from "../../styles/colors";
import { BoldText } from "../../utiles/Fonts";
const statusBarHeight = Constants.statusBarHeight;
const Activity = () => {
  return (
    <ScreenWrapper isConnectedUser={false} wrapperStyle={styles.container}>
      <BoldText>Activity</BoldText>
    </ScreenWrapper>
  );
};

export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
    backgroundColor: colors.background,
  },
});
