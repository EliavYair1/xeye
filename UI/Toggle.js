import { StyleSheet, Text, View, Switch } from "react-native";
import React from "react";
import fonts from "../styles/fonts";
const ToggleSwitch = ({
  id,
  label,
  switchStates,
  toggleSwitch,
  truthyText,
  falsyText,
}) => (
  <View style={styles.container}>
    <Text
      style={{
        fontFamily: switchStates[id] == 0 ? fonts.Regular : fonts.Bold,
      }}
    >
      {truthyText}
    </Text>
    <Switch
      trackColor={{
        false: "rgba(83, 104, 180, 0.2)",
        true: "#6886D2",
      }}
      thumbColor={"#fff"}
      onValueChange={() => toggleSwitch(id)}
      value={switchStates[id] || 0}
    />
    <Text
      style={{
        fontFamily: switchStates[id] == 1 ? fonts.Regular : fonts.Bold,
      }}
    >
      {falsyText}
    </Text>
  </View>
);

export default ToggleSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 11.5,
  },
});
