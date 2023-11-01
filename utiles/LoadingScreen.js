import React from "react";
import { View, Text } from "react-native";
import { ProgressView } from "react-native-progress";

const LoadingScreen = ({ progress }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
      <ProgressView progress={progress} width={200} />
    </View>
  );
};
export default LoadingScreen;
