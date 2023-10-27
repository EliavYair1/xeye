import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import { BoldText } from "../../../utiles/Fonts";
import colors from "../../../styles/colors";
const EventList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <BoldText style={styles.noEventText}>There is no active event</BoldText>
      </View>
    </View>
  );
};

export default EventList;

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
  noEventText: {
    fontSize: 16,
    color: colors.white,
  },
});
