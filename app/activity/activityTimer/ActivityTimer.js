import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../../../styles/colors";
import { formatTime } from "../../../Services/TimeFormatter";
import { useTime } from "../../../Hooks/useTime";
import { useDispatch, useSelector } from "react-redux";
import { incrementElapsed } from "../../../store/redux/reducers/timeSlice";
const ActivityTimer = ({ isOnline }) => {
  const { elapsedTime, setElapsedTime } = useTime();
  const dispatch = useDispatch();
  const elapsed = useSelector((state) => state.time.elapsed);

  // useEffect(() => {
  //   let timerInterval;

  //   const startTimer = () => {
  //     if (isOnline) {
  //       const startTime = Date.now() - timerElapsed;
  //       timerInterval = setInterval(() => {
  //         const elapsesetTimerElapseddTime = Date.now() - startTime;
  //         (elapsedTime);
  //       }, 1000);
  //     } else {
  //       if (timerInterval) {
  //         clearInterval(timerInterval);
  //       }
  //     }
  //   };

  //   startTimer();

  //   return () => {
  //     if (timerInterval) {
  //       clearInterval(timerInterval);
  //     }
  //   };
  // }, [isOnline]);

  useEffect(() => {
    let timerInterval;

    const startTimer = () => {
      if (isOnline) {
        timerInterval = setInterval(() => {
          // * usetime usage
          // setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
          // * redux slice usage
          dispatch(incrementElapsed());
        }, 1000);
      } else {
        clearInterval(timerInterval);
      }
    };

    startTimer();

    return () => {
      clearInterval(timerInterval);
    };
  }, [isOnline, dispatch]);

  return (
    <View>
      <Text style={styles.timer}>{formatTime(elapsed)}</Text>
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
