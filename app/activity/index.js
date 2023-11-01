import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../utiles/ScreenWrapper";
import Constants from "expo-constants";
import colors from "../../styles/colors";
import ActivityBar from "./activityBar/ActivityBar";
import TargetThreat from "../home/eventList/TargetThreat/TargetThreat";
import Button from "../../UI/Button";
import Fonts from "../../utiles/Fonts";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as Progress from "react-native-progress";
import LoadingScreen from "../../utiles/LoadingScreen";
const statusBarHeight = Constants.statusBarHeight;
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;
const Activity = () => {
  const { showActionSheetWithOptions } = useActionSheet();

  const onPress = () => {
    const options = [
      "False alert",
      "Innocent",
      "Cleared",
      "Real suspect",
      "Cancel",
    ];
    const destructiveButtonIndex = 4;
    const cancelButtonIndex = 4;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            // False alert
            console.log("False alert");
            break;

          case 1:
            // Naive
            console.log("Naive");
            break;

          case 2:
            // Authorized
            console.log("Authorized");
            break;

          case 3:
            // Real suspect
            console.log("Real suspect");
            break;

          case cancelButtonIndex:
            // Canceled
            console.log("Cancel");
            break;

          default:
            // Handle additional options here
            console.log("Selected option:", options[selectedIndex]);
        }
      }
    );
  };

  return (
    <ScreenWrapper
      isConnectedUser={false}
      wrapperStyle={styles.container}
      edges={[""]}
    >
      <ActivityBar statusColor={"green"} />
      <View style={styles.imageWrapper}>
        <TargetThreat
          imageSource={require("../../assets/imgs/threat2.png")}
          imageHeight={windowHeight >= 844 ? 626 : 600}
          imageWidth={windowWidth - 32}
          gunBgWidth={229}
          gunBgHeight={567}
        />
      </View>
      <Button
        buttonFunction={() => {
          onPress();
        }}
        buttonText={"Accept"}
        buttonWidth={windowWidth - 32}
        disableLogic={false}
        buttonTextStyle={{
          color: colors.white,
          fontSize: 16,
          fontFamily: Fonts.SemiBold,
        }}
        buttonStyle={{
          backgroundColor: "#1D69C5",
          padding: 8,
          borderRadius: 4,
        }}
      />
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
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
