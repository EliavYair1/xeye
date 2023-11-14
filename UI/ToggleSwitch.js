import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Fonts from "../utiles/Fonts";
import colors from "../styles/colors";
import Switch from "react-native-switches";

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
      shape={"pill"}
      showText={false}
      buttonColor="#ffffff"
      colorSwitchOn="#08CB83"
      buttonSize={28}
      buttonOffsetLeft={6}
      buttonOffsetRight={6}
      borderColor="#B0B0B0"
      colorSwitchOff="#B0B0B0"
      value={switchStates[id] || 0}
      onChange={() => toggleSwitch(id)}
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
