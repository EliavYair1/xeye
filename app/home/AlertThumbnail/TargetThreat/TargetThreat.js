import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";

const TargetThreat = React.memo(({ imageHeight, imageWidth, alert }) => {
  // console.log("props", props);
  // const alert = props.alert;
  const [imageStyle, setImageStyle] = useState({
    // width: 100,
    // height: 100,
    justifyContent: "center",
    alignItems: "center",
  });
  useEffect(() => {
    if (alert) {
      Image.getSize(alert.snapshot, (width, height) => {
        console.log("width, height", width, height);
        if (width > height) {
          setImageStyle((prev) => {
            return {
              ...prev,
              width: width > imageWidth ? imageWidth : width,
              aspectRatio: width / height,
            };
          });
        } else {
          setImageStyle((prev) => {
            return {
              ...prev,
              height: height,
              aspectRatio: width / height,
              maxHeight: imageHeight,
            };
          });
        }
      });
    }
  }, [alert]);

  if (!alert || !alert.snapshot) {
    return <View></View>;
  }
  return (
    <View style={{ marginBottom: 24 }}>
      <Image source={{ uri: alert.snapshot }} style={imageStyle}></Image>
    </View>
  );
});

export default TargetThreat;
