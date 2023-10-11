import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../../utiles/ScreenWrapper";
import useUserLogin from "../../Hooks/useUserLogin";
import useScreenNavigator from "../../Hooks/useScreenNavigator";
import routes from "../../Navigation/routes";
import Loader from "../../utiles/Loader";
import colors from "../../styles/colors";
import { removeData } from "../../Auth/StorageService";
const Start = () => {
  const { logoutUser, loading, token, initializeUserToken } = useUserLogin();
  const { navigateToRoute } = useScreenNavigator();
  useEffect(() => {
    initializeUserToken();
  }, [token]);
  const handleLogout = async () => {
    await logoutUser();
    console.log("token", token);
    if (token == null) {
      navigateToRoute(routes.ONBOARDING.Login);
    }
  };
  // console.log("token", token);
  return (
    <ScreenWrapper wrapperStyle={styles.container}>
      <TouchableOpacity
        onPress={handleLogout}
        style={{ alignSelf: "flex-start" }}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
      {loading && (
        <Loader size={"large"} color={colors.xeyeBlue} visible={loading} />
      )}
    </ScreenWrapper>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
