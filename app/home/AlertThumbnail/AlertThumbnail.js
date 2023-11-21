import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { BoldText, MediumText } from "../../../utiles/Fonts";

import colors from "../../../styles/colors";
import { router } from "expo-router";
import TargetThreat from "./TargetThreat/TargetThreat";
import { useEffect } from "react";
const windowWidth = Dimensions.get("screen").width;
const AlertThumbnail = ({ alert }) => {
  const handleAlertPress = async () => {
    router.push("/alertscreen");
  };

  useEffect(() => {
    if (alert) {
      console.log("new alert");
      // console.log("new alert", alert);
    } else {
      console.log("no alerts to display...");
    }
  }, [alert]);

  return (
    <View style={styles.container}>
      {alert ? (
        <>
          <View
            style={{
              width: windowWidth - 32,
              height: 1,
              color: colors.white,
              backgroundColor: colors.white,
              marginBottom: 24,
              opacity: 0.2,
            }}
          />
          <BoldText style={styles.header}>New active event</BoldText>
          <TouchableOpacity
            style={styles.wrapper}
            onPress={() => {
              handleAlertPress();
            }}
          >
            <TargetThreat
              gunBgHeight={200}
              gunBgWidth={144}
              imageWidth={windowWidth - 32}
              imageHeight={240}
              alert={alert}
            />
          </TouchableOpacity>

          <MediumText style={styles.eventText}>
            Click on the image to continue
          </MediumText>
          <View
            style={{
              width: windowWidth - 32,
              height: 1,
              color: colors.white,
              backgroundColor: colors.white,
              marginBottom: 24,
              opacity: 0.2,
            }}
          />
        </>
      ) : (
        <BoldText style={styles.noEventText}>There is no active event</BoldText>
      )}
    </View>
  );
};

export default AlertThumbnail;

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  wrapper: {},
  header: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 24,
  },
  eventText: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 24,
    justifyContent: "center",
    alignSelf: "center",
  },
  noEventText: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 24,
  },
});
