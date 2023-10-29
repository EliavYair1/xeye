import React from "react";
import { View, ImageBackground, Dimensions } from "react-native";
import { GunIcon } from "../../../../UI/SvgIcon";
const windowWidth = Dimensions.get("screen").width;

const TargetThreat = ({
  imageSource,
  imageWidth,
  imageHeight,
  gunBgWidth,
  gunBgHeight,
}) => {
  return (
    <View style={{ marginBottom: 24 }}>
      <ImageBackground
        source={imageSource}
        style={{
          width: imageWidth,
          height: imageHeight,
          resizeMode: "cover",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
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
          <GunIcon />
        </View>
      </ImageBackground>
    </View>
  );
};

export default TargetThreat;
