import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import background from "../assets/background/background.svg";
const SvgComponent = ({
  width,
  height,
  path,
  text = false,
  textValue = "",
}) => {
  return (
    <View style={styles.container}>
      <SvgXml xml={path} width={width} height={height} />
      {text && <Text style={styles.text}>{textValue}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default SvgComponent;
