import { StyleSheet, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../utiles/ScreenWrapper";
import Constants from "expo-constants";
import colors from "../../styles/colors";
import TargetThreat from "../home/AlertThumbnail/TargetThreat/TargetThreat";

import Loader from "../../utiles/Loader";
import AlertButton from "./AlertButton/AlertButton";
import { useAlert } from "../../Hooks/useAlert";
import AlertNavBar from "./AlertNavBar/AlertNavBar";
import { router } from "expo-router";
const statusBarHeight = Constants.statusBarHeight;
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const AlertScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { alert } = useAlert();

  // console.log("alert", alert);

  // useEffect(() => {
  //   if (!alert) {
  //     router.back();
  //   }
  // }, [alert]);

  const toggleLoading = (loading) => {
    setIsLoading(loading);
  };
  // todo if alert != false  navigate to alert component navigate to /home

  return (
    <ScreenWrapper
      isConnectedUser={false}
      wrapperStyle={styles.container}
      edges={[""]}
    >
      <AlertNavBar
        statusColor={"red"}
        alertNumber={alert?.alertNumber}
        alert={alert}
        time={alert?.createdAt}
        type={alert?.type}
        status={alert?.status}
      />
      <View style={styles.imageWrapper}>
        <TargetThreat
          imageHeight={windowHeight >= 844 ? 626 : 600}
          imageWidth={windowWidth - 32}
          gunBgWidth={229}
          gunBgHeight={567}
          alert={alert}
        />
      </View>
      <AlertButton agentId={alert?.id} toggleLoading={toggleLoading} />
    </ScreenWrapper>
  );
};

export default AlertScreen;

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
