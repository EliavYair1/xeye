import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../../utiles/ScreenWrapper";
import colors from "../../styles/colors";
import Loader from "../../utiles/Loader";
import LogoutNav from "./logoutNav/logoutNav";
import Constants from "expo-constants";
import AgentInfoStatus from "./agentInfoStatus/agentInfoStatus";
import { BoldText } from "../../utiles/Fonts";
import AlertThumbnail from "./AlertThumbnail/AlertThumbnail";
import { useUser } from "../../Hooks/useUser";
import { useAlert } from "../../Hooks/useAlert";
import AlertToggle from "./alertToggle/AlertToggle";
import { subscribeToChangeAlert } from "../../Services/socket";

const statusBarHeight = Constants.statusBarHeight;
export default function Home() {
  const { user, setUser, loading } = useUser();
  const { alert, setAlert } = useAlert();

  useEffect(() => {
    if (user) {
      // * subscribe to changeAlert event with currentUser
      subscribeToChangeAlert(user, (alert) => {
        console.log("subscribeToChangeAlert home");
        if (alert) {
          setAlert(alert);
        } else {
          // * if the user is not matched with or resolved from the spotter then alert false.
          console.log("Alert false!");
          setAlert(false);
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
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Loader size={"large"} color={colors.white} visible={loading} />
        </View>
      ) : (
        <>
          <View style={styles.innerContainer}>
            <BoldText style={styles.header}>Welcome</BoldText>

            <AgentInfoStatus
              user={user}
              styling={{ marginBottom: 28 }}
              loading={loading}
            />
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
