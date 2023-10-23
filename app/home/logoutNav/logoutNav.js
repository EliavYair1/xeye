import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MediumText } from "../../../utiles/Fonts";
import { removeData } from "../../../Auth/StorageService";
import useUserLogin from "../../../Hooks/useUserLogin";
import { router } from "expo-router";
import colors from "../../../styles/colors";
const LogoutNav = () => {
  const { logoutUser, loading, token, initializeUserToken } = useUserLogin();

  const handleLogout = async () => {
    const logoutSuccess = await logoutUser();

    if (logoutSuccess) {
      console.log("token", token);

      if (token === null) {
        router.replace("/login");
      }
    }
  };
  return (
    <TouchableOpacity onPress={handleLogout} style={styles.logout}>
      <MediumText style={styles.logoutText}>Log out</MediumText>
    </TouchableOpacity>
  );
};

export default LogoutNav;

const styles = StyleSheet.create({
  logout: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logoutText: {
    color: colors.white,
    textDecorationLine: "underline",
  },
});
