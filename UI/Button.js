import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { HelperText } from "react-native-paper";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
export default function Button({
  buttonFunction,
  buttonStyle,
  disableLogic,
  buttonTextStyle,
  buttonText,
  icon = false,
  buttonWidth,
  iconStyle,
  iconPath,
  errorMessage = false,
  isCameraButton = false,
}) {
  return (
    <>
      <View style={{ flexDirection: "column" }}>
        <TouchableOpacity
          style={[
            buttonStyle,
            styles.button,
            {
              width: buttonWidth,
              opacity: disableLogic ? 0.4 : 1,
              borderColor: errorMessage ? "#b3261e" : null,
            },
          ]}
          onPress={() => buttonFunction()}
          disabled={disableLogic}
        >
          {icon && <Image style={iconStyle ?? ""} source={iconPath} />}

          <Text
            style={[buttonTextStyle, styles.text, { fontFamily: fonts.Medium }]}
          >
            {buttonText}
          </Text>
        </TouchableOpacity>
        {errorMessage && (
          <HelperText
            type="error"
            style={{
              fontFamily: fonts.Medium,
              backgroundColor: "white",
              borderColor: "transparent",
            }}
          >
            {errorMessage}
          </HelperText>
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  text: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
