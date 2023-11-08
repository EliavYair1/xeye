import {
  Link,
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import {
  selectOnlineStatus,
  setOnlineStatus,
} from "../../store/redux/reducers/onlineStatusSlice";
import { useUser } from "../../Hooks/useUser";
import { useAlert } from "../../Hooks/useAlert";
import AlertToggle from "./alertToggle/AlertToggle";

const statusBarHeight = Constants.statusBarHeight;
export default function Home() {
  const { loading } = useUserLogin();
  const { user } = useUser();
  // console.log("user", user);
  const { alert } = useAlert();
  // console.log(user.assignedAlert == "");
  // console.log("user", user);
  // todo after finishing alert manipulate Event the live event prop to false globaly
  // todo to check why user.status dosent change to offline after sending a post req to alert
  // todo to check if the assignedAlert is the right value for live event
  // todo make the current user listen to the user status when retoggle the switch AlertToggle
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

            <AgentInfoStatus
              agentId={"#01"}
              // agentName={"James Bond"}
              agentProfession={"Security"}
              status={user.status}
              styling={{ marginBottom: 28 }}
            />
            <AlertToggle user={user} />

            {user.status == "online" && (
              <>
                <AlertThumbnail />
              </>
            )}
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
