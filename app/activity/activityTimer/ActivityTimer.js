import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../../../styles/colors";
import { formatTime } from "../../../Services/TimeFormatter";
const ActivityTimer = ({ isOnline }) => {
  const [timerStartTime, setTimerStartTime] = useState(null);
  const [timerElapsed, setTimerElapsed] = useState(0);

  // Function to save the elapsed time when going offline
  const saveShiftTime = async () => {
    if (timerStartTime) {
      const elapsedTime = Date.now() - timerStartTime;
      setTimerElapsed(elapsedTime);

      // Save the elapsed time when going offline
      await AsyncStorage.setItem("onlineTime", elapsedTime.toString());
    }
  };

  const fetchStoredTime = async () => {
    const storedTime = await AsyncStorage.getItem("onlineTime");

    if (storedTime) {
      setTimerElapsed(parseInt(storedTime));
    }
  };

  // Use useEffect to start/stop the timer and handle offline state
  useEffect(() => {
    let timerInterval;

    if (isOnline) {
      // Reset the timer when going online
      setTimerStartTime(Date.now());
      setTimerElapsed(0);

      timerInterval = setInterval(() => {
        if (timerStartTime) {
          const elapsedTime = Date.now() - timerStartTime;
          setTimerElapsed(elapsedTime);
        }
      }, 1000);
    } else {
      if (timerInterval) {
        // Clear the timer interval when offline
        clearInterval(timerInterval);

        // Save elapsed time when going offline
        saveShiftTime();

        // Reset timer
        setTimerStartTime(null);
        setTimerElapsed(0);
      }
    }
    fetchStoredTime();
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
        // Save elapsed time when unmounting
        saveShiftTime();
      }
    };
  }, [isOnline]);

  //   console.log("timr", formatTime(timerElapsed));

  return (
    <View>
      <Text style={styles.timer}>{`${formatTime(timerElapsed)}`}</Text>
    </View>
  );
};

export default ActivityTimer;

const styles = StyleSheet.create({
  timer: {
    color: colors.white,
    fontSize: 16,
  },
});
