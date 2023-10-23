import { Link, router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../../utiles/ScreenWrapper";
import colors from "../../styles/colors";
import Loader from "../../utiles/Loader";
import useUserLogin from "../../Hooks/useUserLogin";
import LogoutNav from "./logoutNav/logoutNav";
export default function Home() {
  const { loading } = useUserLogin();
  return (
    <ScreenWrapper
      wrapperStyle={styles.container}
      isConnectedUser={true}
      edges={[]}
    >
      <LogoutNav />
      {loading && (
        <Loader size={"large"} color={colors.white} visible={loading} />
      )}
    </ScreenWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
});
