import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { MediumText } from "../../../utiles/Fonts";
import useUserLogin from "../../../Hooks/useUserLogin";
import { router } from "expo-router";
import colors from "../../../styles/colors";

const screenHeight = Dimensions.get("screen").height;
const LogoutNav = () => {
  const { logoutUser, loading } = useUserLogin();

  const handleLogout = async () => {
    const logoutSuccess = await logoutUser();

    if (logoutSuccess) {
      // console.log("token", token);

      router.replace("/login");
    }
  };
  console.log("screenHeight", screenHeight > 820);
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
    paddingHorizontal: 13.5,
    // height: 48,
    paddingVertical: screenHeight > 820 ? 20 : 13.5,
  },
  imageWrapper: {},
  image: {
    flex: 1,
    width: 48,
    // height: 20,
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
