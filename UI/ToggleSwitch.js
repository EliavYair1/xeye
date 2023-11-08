import { StyleSheet, Text, View, Switch } from "react-native";
import React from "react";
import Fonts from "../utiles/Fonts";
import colors from "../styles/colors";
const ToggleSwitch = ({
  id,
  label,
  switchStates,
  toggleSwitch,
  truthyText,
  falsyText,
  value,
}) => (
  <View
    style={{
      flexDirection: "row-reverse",
      alignItems: "center",
      gap: 11.5,
      marginBottom: 40,
    }}
  >
    <Text
      style={{
        fontFamily: switchStates[id] == 0 ? Fonts.Regular : Fonts.Bold,
        fontSize: 16,
        color: switchStates[id] == 0 ? colors.white : "rgba(255, 255, 255, 1)",
      }}
    >
      {truthyText}
    </Text>
    <Switch
      style={{
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
        overflow: "hidden",
      }}
      trackColor={{
        false: "#B0B0B0",
        true: "#08CB83",
      }}
      thumbColor={"#fff"}
      onValueChange={() => toggleSwitch(id)}
      value={switchStates[id] || 0}
      // value={value}
    />
    <Text
      style={{
        fontFamily: switchStates[id] == 1 ? Fonts.Regular : Fonts.Bold,
        fontSize: 16,
        color: switchStates[id] == 1 ? colors.white : "rgba(255, 255, 255, 1)",
      }}
    >
      {falsyText}
    </Text>
  </View>
);

export default ToggleSwitch;

const styles = StyleSheet.create({});
