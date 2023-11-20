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
import { setOnlineStatus } from "../../../store/redux/reducers/onlineStatusSlice";
import { router } from "expo-router";
import { useToken } from "../../../Hooks/useToken";
import { useAlert } from "../../../Hooks/useAlert";
import { useServerUrl } from "../../../Hooks/useServerUrl";

const windowWidth = Dimensions.get("screen").width;
const AlertButton = ({ toggleLoading }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [buttonColor, setButtonColor] = useState("#1D69C5");
  const [buttonText, setButtonText] = useState("Accept");
  const { token } = useToken();
  const { ServerUrl } = useServerUrl();
  const { alert, setAlert } = useAlert();
  // const [isLoading, setIsLoading] = useState(false);
  // todo to apply req for status : accepted and change the navbar accordingly
  const onAcceptPress = async () => {
    setButtonColor("#529739");
    setButtonText("Resolved");
  };
  const onResolved = async (status) => {
    // console.log("in", token);
    toggleLoading(true);
    try {
      // console.log("in", agentId);
      console.log(`${ServerUrl}/api/front/alert/${alert?._id}/status`);

      const response = await axios.put(
        `${ServerUrl}/api/front/alert/${alert?._id}/status`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toggleLoading(false);
      console.log("status", response.status);
      if (response.status == 200) {
        const calculatedDate = new Date() - new Date(alert.assignedAt);
        console.log(calculatedDate);
        setAlert(false);
        setTimeout(
          () =>
            router.replace({
              pathname: "/final",
              params: { calculatedDate },
            }),
          10
        );
      }
    } catch (error) {
      toggleLoading(false);
      console.log("[AlertButton]Fetch Error:", error);
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

export default AlertButton;

const styles = StyleSheet.create({});
