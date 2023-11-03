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
import Event from "./eventList/Event";
import ActivityTimer from "../activity/activityTimer/ActivityTimer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOnlineStatus,
  setOnlineStatus,
} from "../../store/redux/reducers/onlineStatusSlice";
const statusBarHeight = Constants.statusBarHeight;
export default function Home() {
  const { loading } = useUserLogin();
  // const [isOnline, setIsOnline] = useState(false);
  const dispatch = useDispatch();
  const isOnline = useSelector(selectOnlineStatus);
  // Function to toggle the online/offline state
  const toggleOnlineStatus = (id) => {
    const newOnlineStatus = !isOnline;
    // setIsOnline(newOnlineStatus);
    dispatch(setOnlineStatus(newOnlineStatus));
  };
  // todo after finishing activity manipulate Event the live event prop to false globaly
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
              status={isOnline}
              styling={{ marginBottom: 28 }}
            />
            <ToggleSwitch
              id="onlineToggle"
              label="Online"
              switchStates={{ onlineToggle: isOnline }}
              toggleSwitch={toggleOnlineStatus}
              truthyText="Online"
              falsyText="Offline"
            />
            {/* <ActivityTimer isOnline={isOnline} /> */}
            {isOnline && (
              <>
                <Event liveEvent={true} />
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
