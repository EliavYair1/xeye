import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../utiles/ScreenWrapper";
import colors from "../../styles/colors";
import Loader from "../../utiles/Loader";
import useUserLogin from "../../Hooks/useUserLogin";
import LogoutNav from "./logoutNav/logoutNav";
import Constants from "expo-constants";
import { BoldText } from "../../utiles/Fonts";
import AgentInfoStatus from "./agentInfoStatus/agentInfoStatus";
import ToggleSwitch from "../../UI/ToggleSwitch";
import AlertThumbnail from "./AlertThumbnail/AlertThumbnail";

import { useUser } from "../../Hooks/useUser";
import { useAlert } from "../../Hooks/useAlert";
import AlertToggle from "./alertToggle/AlertToggle";
import {
  initializeSocket,
  subscribeToChangeAlert,
} from "../../Services/socket";
import { useServerUrl } from "../../Hooks/useServerUrl";

const statusBarHeight = Constants.statusBarHeight;
export default function Home() {
  const { loading } = useUserLogin();
  const { user, setUser } = useUser();
  const { alert, setAlert } = useAlert();
  const { ServerUrl } = useServerUrl();
  console.log(`${ServerUrl}:5000`);
  useEffect(() => {
    initializeSocket(`${ServerUrl}:5000`);
    if (user) {
      // * subscribe to changeAlert event with currentUser
      subscribeToChangeAlert(user, (alert) => {
        if (alert) {
          setAlert(alert);
        } else {
          console.log("Alert false !");
        }
      });
    }
  }, [user]);

  return (
    <ScreenWrapper
      wrapperStyle={styles.container}
      isConnectedUser={false}
      edges={[]}
    >
      <LogoutNav />

      {loading ? (
        <Loader size={"large"} color={colors.white} visible={loading} />
      ) : (
        <>
          <View style={styles.innerContainer}>
            <BoldText style={styles.header}>Welcome</BoldText>

            <AgentInfoStatus user={user} styling={{ marginBottom: 28 }} />
            <AlertToggle
              callback={(status) => {
                setUser({ ...user, status: status });
              }}
              user={user}
            />

            {user.status == "online" && <AlertThumbnail alert={alert} />}
          </View>
        </>
      )}
    </ScreenWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
    backgroundColor: colors.background,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  header: {
    color: colors.white,
    fontSize: 28,
    marginBottom: 32,
  },
});
