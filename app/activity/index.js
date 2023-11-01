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
import { retrieveData } from "../../Auth/StorageService";
import Loader from "../../utiles/Loader";
import ActivityButton from "./ActivityButton/ActivityButton";

const statusBarHeight = Constants.statusBarHeight;
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;
const Activity = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [agentData, setAgentData] = useState(null);
  const alerts = agentData?.alerts;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAgent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const agentData = await retrieveData("agent");
        setAgentData(agentData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgent();
  }, []);
  console.log(alerts[0]?.status);
  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
  return (
    <ScreenWrapper
      isConnectedUser={false}
      wrapperStyle={styles.container}
      edges={[""]}
    >
      {isLoading ? (
        <Loader visible={isLoading} />
      ) : (
        <>
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
          <ActivityButton />
        </>
      )}
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
