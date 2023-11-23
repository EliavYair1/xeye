import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { MediumText } from "../../../utiles/Fonts";
import useUserLogin from "../../../Hooks/useUserLogin";
import { router } from "expo-router";
import colors from "../../../styles/colors";
const LogoutNav = () => {
  const { logoutUser, loading } = useUserLogin();

  const handleLogout = async () => {
    const logoutSuccess = await logoutUser();

    if (logoutSuccess) {
      // console.log("token", token);

      router.replace("/login");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../../assets/imgs/xeyeLogo.png")}
          style={styles.image}
        />
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logout}>
        <MediumText style={styles.logoutText}>Log out</MediumText>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutNav;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.navbar,
    padding: 13.5,
  },
  imageWrapper: {},
  image: {
    width: 48,
    height: 20,
  },
  logout: {
    // flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  logoutText: {
    color: colors.white,
    textDecorationLine: "underline",
  },
});
