import React from "react";
import { View, ImageBackground, Dimensions } from "react-native";
import { GunIcon } from "../../../../UI/SvgIcon";

const windowWidth = Dimensions.get("screen").width;
const TargetThreat = ({
  imageWidth,
  imageHeight,
  gunBgWidth,
  gunBgHeight,
  alert,
}) => {
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
      >
        {/* <View
          style={{
            borderWidth: 1,
            borderColor: "#E92F2F",
            width: gunBgWidth,
            height: gunBgHeight,
            position: "relative",
            backgroundColor: "rgba(233, 47, 47, 0.20)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {getAlertIcon(type, alert?.type, true)}
          <GunIcon/>
        </View> */}
      </ImageBackground>
    </View>
  );
};

export default TargetThreat;
