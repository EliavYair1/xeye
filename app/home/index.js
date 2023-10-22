import { Link, router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../../utiles/ScreenWrapper";
import useUserLogin from "../../Hooks/useUserLogin";
import useScreenNavigator from "../../Hooks/useScreenNavigator";
import routes from "../../Navigation/routes";
import colors from "../../styles/colors";
import { removeData } from "../../Auth/StorageService";
import Loader from "../../utiles/Loader";

export default function Page() {
  const { test } = useLocalSearchParams();
  const { logoutUser, loading, token, initializeUserToken } = useUserLogin();

  const handleLogout = async () => {
    const logoutSuccess = await logoutUser();

    if (logoutSuccess) {
      console.log("token", token);

      if (token === null) {
        // navigateToRoute(routes.ONBOARDING.Login);
        router.replace("/login");
      }
    }
  };
  return (
    <ScreenWrapper
      wrapperStyle={styles.container}
      isConnectedUser={true}
      edges={["top", "bottom"]}
    >
      <TouchableOpacity onPress={handleLogout} style={styles.logout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
      {loading && (
        <Loader size={"large"} color={colors.xeyeBlue} visible={loading} />
      )}
    </ScreenWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,

    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  logout: { alignSelf: "flex-start", justifyContent: "flex-start" },
  logoutText: {
    color: colors.white,
  },
});
