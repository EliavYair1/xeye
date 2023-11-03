import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState } from "react";
import Button from "../../../UI/Button";
import Fonts from "../../../utiles/Fonts";
import colors from "../../../styles/colors";
import { useActionSheet } from "@expo/react-native-action-sheet";
import "@env";
import axios from "axios";
import Loader from "../../../utiles/Loader";
import { retrieveData } from "../../../Auth/StorageService";
import { useDispatch } from "react-redux";
import { setOnlineStatus } from "../../../store/redux/reducers/onlineStatusSlice";
import { router } from "expo-router";

const windowWidth = Dimensions.get("screen").width;
const ActivityButton = ({ agentId, toggleLoading }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [buttonColor, setButtonColor] = useState("#1D69C5");
  const [buttonText, setButtonText] = useState("Accept");
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const onAcceptPress = async () => {
    setButtonColor("#529739");
    setButtonText("Resolved");
  };

  const onResolved = async (status) => {
    const userToken = await retrieveData("userToken");
    // console.log(userToken);
    toggleLoading(true);
    try {
      console.log("in", agentId);
      console.log(`${process.env.API_BASE_URL}/front/alert/${agentId}/status`);

      const response = await axios.put(
        `${process.env.API_BASE_URL}/front/alert/${agentId}/status`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      toggleLoading(false);
      console.log("status", response.status);
      if (response.status == 200) {
        dispatch(setOnlineStatus(false));
        setTimeout(() => router.replace("/final"), 10);
      }
    } catch (error) {
      toggleLoading(false);
      console.log("[ActivityButton]Fetch Error:", error);
    }
  };

  const getStatusString = (selectedIndex) => {
    switch (selectedIndex) {
      case 0:
        return "accepted";
      case 1:
        return "resolved-false-alert";
      case 2:
        return "resolved-naive";
      case 3:
        return "resolved-authorized";
      case 4:
        return "resolved-real-suspect";
      default:
        return null;
    }
  };

  const onPress = async () => {
    const options = [
      "Accepted",
      "False alert",
      "Naive",
      "Authorized",
      "Real suspect",
      "Cancel",
    ];
    const destructiveButtonIndex = 5;
    const cancelButtonIndex = 5;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        const selectedStatus = getStatusString(selectedIndex);
        if (selectedStatus !== null) {
          console.log("selectedStatus", selectedStatus);
          onResolved(selectedStatus);
        } else {
          console.log("Selected option:", options[selectedIndex]);
        }
      }
    );
  };

  return (
    <View>
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
