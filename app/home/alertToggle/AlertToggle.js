import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ToggleSwitch from "../../../UI/ToggleSwitch";
import axios from "axios";
import "@env";
import { retrieveData } from "../../../Auth/StorageService";
import { useToken } from "../../../Hooks/useToken";
import { useServerUrl } from "../../../Hooks/useServerUrl";
// todo restyle the toggle switch
const AlertToggle = ({ callback, user }) => {
  const [isOnline, setIsOnline] = useState(false);
  const { ServerUrl } = useServerUrl();
  const strConversion = (bol) => {
    return bol ? "online" : "offline";
  };
  const { token } = useToken();

  useEffect(() => {
    setIsOnline(user.status == "online");
  }, [user]);

  const changeUserStatus = async (status) => {
    // const userToken = await retrieveData("currentToken");
    // console.log("userToken", userToken);
    try {
      console.log("status", strConversion(status));
      let url = `${ServerUrl}/api/front/users/${user._id}`;
      const response = await axios.put(
        url,
        {
          status: strConversion(status),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == "200") {
        console.log("status updated successfully!");
        console.log("response", response.data);
        callback(response.data.status);
      }
    } catch (error) {
      console.error("[AlertToggle]updateStatus Err:", error);
    }
  };

  return (
    <View>
      <ToggleSwitch
        id="onlineToggle"
        label="Online"
        switchStates={{ onlineToggle: isOnline }}
        value={isOnline}
        toggleSwitch={() => changeUserStatus(!isOnline)}
        truthyText="Online"
        falsyText="Offline"
      />
    </View>
  );
};

export default AlertToggle;

const styles = StyleSheet.create({});
