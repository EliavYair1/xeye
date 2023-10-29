import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GunNavbar } from "../../../UI/SvgIcon";
import { MediumText, BoldText } from "../../../utiles/Fonts";
import colors from "../../../styles/colors";
import ActivityTimer from "../../home/activityTimer/ActivityTimer";
import { useSelector } from "react-redux";
import { selectOnlineStatus } from "../../../store/redux/reducers/onlineStatusSlice";
import Button from "../../../UI/Button";
const ActivityBar = ({ statusColor }) => {
  const isOnline = useSelector(selectOnlineStatus);
  // console.log("ActivityBar", isOnline);
  return (
    <View style={[styles.container, { backgroundColor: statusColor }]}>
      <View style={styles.iconWrapper}>
        <GunNavbar />
        <View>
          <MediumText style={styles.gunStatusText}>Alert #123:</MediumText>
          <MediumText style={styles.gunStatusText}>Gun detected</MediumText>
        </View>
      </View>
      <View style={styles.separator} />
      <BoldText style={styles.gunStatusText}>Assigned</BoldText>
      <View style={styles.separator} />
      <BoldText style={styles.gunStatusText}>4:35pm</BoldText>
      <View style={styles.separator} />
      <ActivityTimer isOnline={isOnline} />
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
