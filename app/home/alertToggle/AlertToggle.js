import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ToggleSwitch from "../../../UI/ToggleSwitch";
import axios from "axios";
import "@env";
import { retrieveData } from "../../../Auth/StorageService";
// todo restyle the toggle switch
const AlertToggle = ({ user }) => {
  const [isOnline, setIsOnline] = useState(false);
  const strConversion = (bol) => {
    return bol ? "online" : "offline";
  };
  useEffect(() => {
    setIsOnline(user.status === "online");
  }, [user]);

  const changeUserStatus = async (status) => {
    const userToken = await retrieveData("userToken");
    try {
      console.log("status", strConversion(status));
      let url = `${process.env.API_BASE_URL}/front/users/${user._id}`;
      const response = await axios.put(
        url,
        {
          status: strConversion(status),
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.status == "200") {
        console.log("status updated successfully!");
        console.log("response", response);
      }
    } catch (error) {
      console.error("[AlertToggle]updateStatus Err:", error);
    }
  };

  // Function to toggle the online/offline state
  const toggleOnlineStatus = async () => {
    // console.log("id", id);
    const newOnlineStatus = !isOnline;
    // console.log("status", strConversion(newOnlineStatus));
    setIsOnline(newOnlineStatus);
    await changeUserStatus(newOnlineStatus);
    // dispatch(setOnlineStatus(newOnlineStatus));
  };
  return (
    <View>
      <ToggleSwitch
        id="onlineToggle"
        label="Online"
        switchStates={{ onlineToggle: isOnline }}
        value={isOnline}
        toggleSwitch={toggleOnlineStatus}
        truthyText="Online"
        falsyText="Offline"
      />
    </View>
  );
};

export default AlertToggle;

const styles = StyleSheet.create({});
