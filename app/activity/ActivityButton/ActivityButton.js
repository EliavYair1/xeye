import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState } from "react";
import Button from "../../../UI/Button";
import Fonts from "../../../utiles/Fonts";
import colors from "../../../styles/colors";
import { useActionSheet } from "@expo/react-native-action-sheet";
const windowWidth = Dimensions.get("screen").width;
const ActivityButton = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [buttonColor, setButtonColor] = useState("#1D69C5");
  const [buttonText, setButtonText] = useState("Accept");
  const onAcceptPress = () => {
    setButtonColor("#529739");
    setButtonText("Resolved");
  };

  const onPress = () => {
    const options = [
      "False alert",
      "Innocent",
      "Cleared",
      "Real suspect",
      "Cancel",
    ];
    const destructiveButtonIndex = 4;
    const cancelButtonIndex = 4;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            // False alert
            console.log("False alert");
            break;

          case 1:
            // Naive
            console.log("Naive");
            break;

          case 2:
            // Authorized
            console.log("Authorized");
            break;

          case 3:
            // Real suspect
            console.log("Real suspect");
            break;

          case cancelButtonIndex:
            // Canceled
            console.log("Cancel");
            break;

          default:
            // Handle additional options here
            console.log("Selected option:", options[selectedIndex]);
        }
      }
    );
  };
  return (
    <View>
      {/* <Text>ActivityButton</Text> */}
      {buttonText == "Accept" ? (
        <>
          <Button
            buttonFunction={() => {
              onAcceptPress();
            }}
            buttonText={buttonText}
            buttonWidth={windowWidth - 32}
            disableLogic={false}
            buttonTextStyle={{
              color: colors.white,
              fontSize: 16,
              fontFamily: Fonts.SemiBold,
            }}
            buttonStyle={{
              backgroundColor: buttonColor,
              padding: 8,
              borderRadius: 4,
            }}
          />
        </>
      ) : (
        <>
          <Button
            buttonFunction={() => {
              onPress();
            }}
            buttonText={buttonText}
            buttonWidth={windowWidth - 32}
            disableLogic={false}
            buttonTextStyle={{
              color: colors.white,
              fontSize: 16,
              fontFamily: Fonts.SemiBold,
            }}
            buttonStyle={{
              backgroundColor: buttonColor,
              padding: 8,
              borderRadius: 4,
            }}
          />
        </>
      )}
    </View>
  );
};

export default ActivityButton;

const styles = StyleSheet.create({});
