import { StyleSheet, View, Dimensions } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../../utiles/ScreenWrapper";
import Constants from "expo-constants";
import colors from "../../styles/colors";
import TargetThreat from "../home/AlertThumbnail/TargetThreat/TargetThreat";

import AlertButton from "./AlertButton/AlertButton";
import { useAlert } from "../../Hooks/useAlert";
import AlertNavBar from "./AlertNavBar/AlertNavBar";
import { router } from "expo-router";
import { useUser } from "../../Hooks/useUser";
import { subscribeToChangeAlert } from "../../Services/socket";

const statusBarHeight = Constants.statusBarHeight;
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const AlertScreen = () => {
  const { alert, setAlert } = useAlert();
  const { user } = useUser();

  // * temp
  useEffect(() => {
    if (user) {
      // * subscribe to changeAlert event with currentUser
      subscribeToChangeAlert(user, (alert) => {
        if (alert) {
          setAlert(alert);
        } else {
          console.log("Alert false!");
          setAlert(false);
          router.replace("/home");
        }
      });
    }
  }, [user]);

  const toggleLoading = (loading) => {
    // setIsLoading(loading);
  };

  const updateAlertNavbar = () => {
    setAlert((prev) => ({ ...prev, status: "Accepted" }));
  };
  // console.log("[Home]AlertScreen", alert?.status);

  return (
    <ScreenWrapper
      isConnectedUser={false}
      wrapperStyle={styles.container}
      edges={[""]}
    >
      <AlertNavBar statusColor={"#992D30"} alert={alert} />
      <View style={styles.imageWrapper}>
        <TargetThreat
          imageHeight={windowHeight - 200}
          imageWidth={windowWidth - 32}
          gunBgWidth={229}
          gunBgHeight={567}
          alert={alert}
        />
      </View>
      <AlertButton
        agentId={alert?._id}
        toggleLoading={toggleLoading}
        callback={updateAlertNavbar}
        alert={alert}
      />
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
