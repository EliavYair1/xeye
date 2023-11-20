import { StyleSheet, View } from "react-native";
import React from "react";
import { MediumText, BoldText } from "../../../utiles/Fonts";
import colors from "../../../styles/colors";
import { useUser } from "../../../Hooks/useUser";
import AlertTimer from "../alertTimer/AlertTimer";
import { useTypes } from "../../../Hooks/useType";

import { getAlertIcon } from "../../../Services/alertIconToDisplay";
import { SvgXml } from "react-native-svg";

const AlertNavBar = ({ statusColor, alert }) => {
  const { user } = useUser();
  const { types } = useTypes();
  const timeFormat = (timestamp) => {
    const date = new Date(timestamp);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    const formattedTime = date.toLocaleTimeString("en-US", options);
    return formattedTime;
  };
  if (!alert) {
    return <></>;
  }

  return (
    <View style={[styles.container, { backgroundColor: statusColor }]}>
      <View style={styles.iconWrapper}>
        {getAlertIcon(types, alert.type)}
        <View>
          <MediumText style={styles.gunStatusText}>
            Alert #{alert.alertNumber}:
          </MediumText>
          <MediumText style={styles.gunStatusText}>
            {alert.type} detected
          </MediumText>
        </View>
      </View>
      <View style={styles.separator} />
      <BoldText style={styles.gunStatusText}>{alert.status}</BoldText>
      <View style={styles.separator} />
      <BoldText style={styles.gunStatusText}>
        {timeFormat(alert.createdAt)}
      </BoldText>
      <View style={styles.separator} />

      <AlertTimer isOnline={user.status == "online"} alert={alert} />
    </View>
  );
};

export default AlertNavBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7.5,
    paddingHorizontal: 16,
    paddingVertical: 9.5,
    marginBottom: 16,
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  gunStatusText: {
    fontSize: 12,
    color: colors.white,
  },
  separator: {
    width: 16,
    backgroundColor: colors.white,
    height: 1,
    transform: [{ rotate: "-90deg" }],
  },
});
