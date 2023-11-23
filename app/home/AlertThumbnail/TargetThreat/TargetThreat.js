import React from "react";
import { View, ImageBackground } from "react-native";

const TargetThreat = ({ imageWidth, imageHeight, alert }) => {
  if (!alert || !alert.snapshot) {
    return <View></View>;
  }
  return (
    <View style={{ marginBottom: 24 }}>
      <ImageBackground
        source={{ uri: alert.snapshot }}
        style={{
          width: imageWidth,
          height: imageHeight,
          resizeMode: "cover",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></ImageBackground>
    </View>
  );
};

export default TargetThreat;
