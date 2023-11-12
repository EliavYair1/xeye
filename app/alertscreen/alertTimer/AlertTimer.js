import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import colors from "../../../styles/colors";
import { formatTime } from "../../../Services/TimeFormatter";
const AlertTimer = ({ isOnline, alert }) => {
  const [timeDiff, settimeDiff] = useState(
    new Date() - new Date(alert.assignedAt)
  );
  // todo to change the name of component to:  alert timer
  useEffect(() => {
    setInterval(() => {
      settimeDiff((prev) => prev + 1000);
    }, 1000);
  }, []);

  return (
    <View>
      <Text style={styles.timer}>{formatTime(timeDiff)}</Text>
    </View>
  );
};

export default AlertTimer;

const styles = StyleSheet.create({
  timer: {
    color: colors.white,
    fontSize: 16,
  },
});
