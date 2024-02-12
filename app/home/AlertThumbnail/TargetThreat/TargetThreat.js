import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";

const TargetThreat = React.memo(({ imageHeight, imageWidth, alert }) => {
  const [imageStyle, setImageStyle] = useState({
    justifyContent: "center",
    alignItems: "center",
    width: imageWidth,
    height: imageHeight,
    aspectRatio: imageWidth / imageHeight,
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
    <View style={styles.imageContainer}>
      <Image source={{ uri: alert.snapshot }} style={imageStyle}></Image>
    </View>
  );
});
const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 24,
  },
});
export default TargetThreat;
