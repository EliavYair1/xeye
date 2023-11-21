import { StyleSheet, View, Dimensions } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import ScreenWrapper from "../../utiles/ScreenWrapper";
import Constants from "expo-constants";
import colors from "../../styles/colors";
import TargetThreat from "../home/AlertThumbnail/TargetThreat/TargetThreat";

import Loader from "../../utiles/Loader";
import AlertButton from "./AlertButton/AlertButton";
import { useAlert } from "../../Hooks/useAlert";
import AlertNavBar from "./AlertNavBar/AlertNavBar";
import { router } from "expo-router";
import { useServerUrl } from "../../Hooks/useServerUrl";
import { useUser } from "../../Hooks/useUser";
import {
  initializeSocket,
  subscribeToChangeAlert,
} from "../../Services/socket";

const statusBarHeight = Constants.statusBarHeight;
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const AlertScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { alert, setAlert } = useAlert();
  const { ServerUrl } = useServerUrl();
  const { user } = useUser();

  // * temp
  useEffect(() => {
    if (ServerUrl) {
      initializeSocket(`${ServerUrl}:5000/`);
      if (user) {
        // * subscribe to changeAlert event with currentUser
        subscribeToChangeAlert(user, (alert) => {
          if (alert) {
            setAlert(alert);
          } else {
            console.log("Alert false!");
            // setAlert(false);

            // if (!alert) {
            //   router.back();
            // }
          }
        });
      }
    }
  }, [user, ServerUrl, alert]);

  const toggleLoading = (loading) => {
    setIsLoading(loading);
  };

  // console.log("[Home]AlertScreen", alert?.status);

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
      <AlertButton agentId={alert?._id} toggleLoading={toggleLoading} />
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
