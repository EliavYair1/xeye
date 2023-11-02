import { StyleSheet, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../utiles/ScreenWrapper";
import Constants from "expo-constants";
import colors from "../../styles/colors";
import ActivityBar from "./activityBar/ActivityBar";
import TargetThreat from "../home/eventList/TargetThreat/TargetThreat";
import Loader from "../../utiles/Loader";
import ActivityButton from "./ActivityButton/ActivityButton";
import { useAlert } from "../../Hooks/useAlert";

const statusBarHeight = Constants.statusBarHeight;
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;
const Activity = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { alerts } = useAlert();

  const toggleLoading = (loading) => {
    setIsLoading(loading);
  };

  useEffect(() => {
    if (alerts && alerts != []) {
      setIsLoading(false);
    }
  }, [alerts]);

  if (isLoading) {
    return (
      <>
        <ScreenWrapper
          isConnectedUser={false}
          wrapperStyle={styles.container}
          edges={[""]}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Loader visible={isLoading} size={50} color={colors.white} />
          </View>
        </ScreenWrapper>
      </>
    );
  }

  return (
    <ScreenWrapper
      isConnectedUser={false}
      wrapperStyle={styles.container}
      edges={[""]}
    >
      <ActivityBar
        statusColor={"red"}
        alertNumber={alerts[0]?.alertNumber}
        time={alerts[0]?.createdAt}
        type={alerts[0]?.type}
        status={alerts[0]?.status}
      />
      <View style={styles.imageWrapper}>
        <TargetThreat
          imageSource={{ uri: alerts[0]?.snapshot }}
          imageHeight={windowHeight >= 844 ? 626 : 600}
          imageWidth={windowWidth - 32}
          gunBgWidth={229}
          gunBgHeight={567}
        />
      </View>
      <ActivityButton agentId={alerts[0]?.id} toggleLoading={toggleLoading} />
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
