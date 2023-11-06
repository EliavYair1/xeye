import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GunNavbar } from "../../../UI/SvgIcon";
import { MediumText, BoldText } from "../../../utiles/Fonts";
import colors from "../../../styles/colors";
import ActivityTimer from "../activityTimer/ActivityTimer";
import { useSelector } from "react-redux";
import { selectOnlineStatus } from "../../../store/redux/reducers/onlineStatusSlice";
import Button from "../../../UI/Button";
import { useUser } from "../../../Hooks/useUser";
const ActivityBar = ({ statusColor, type, time, alertNumber, status }) => {
  const isOnline = useSelector(selectOnlineStatus);
  // console.log("ActivityBar", isOnline);
  const { user } = useUser();
  // console.log(user.status);
  const timeFormat = (timestamp) => {
    const date = new Date(timestamp);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    const formattedTime = date.toLocaleTimeString("en-US", options);
    return formattedTime;
  };

  return (
    <View style={[styles.container, { backgroundColor: statusColor }]}>
      <View style={styles.iconWrapper}>
        <GunNavbar />
        <View>
          <MediumText style={styles.gunStatusText}>
            Alert #{alertNumber}:
          </MediumText>
          <MediumText style={styles.gunStatusText}>{type} detected</MediumText>
        </View>
      </View>
      <View style={styles.separator} />
      <BoldText style={styles.gunStatusText}>{status}</BoldText>
      <View style={styles.separator} />
      <BoldText style={styles.gunStatusText}>{timeFormat(time)}</BoldText>
      <View style={styles.separator} />
      <ActivityTimer isOnline={user.status == "online"} />
    </View>
  );
};

export default ActivityBar;

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
