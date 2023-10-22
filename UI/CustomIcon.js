import React from "react";
import { Image, View } from "react-native";
import { IconButton } from "react-native-paper";

const CustomIcon = ({ image, size, color, onPress }) => {
  return (
    <IconButton
      icon={() => (
        <View>
          <Image source={image} style={{ width: size, height: size }} />
        </View>
      )}
      color={color}
      size={size}
      onPress={onPress}
    />
  );
};

export default CustomIcon;
