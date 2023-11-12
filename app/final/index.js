import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../utiles/ScreenWrapper";
import Constants from "expo-constants";
import colors from "../../styles/colors";
import { CheckmarkIcon, RateStar } from "../../UI/SvgIcon";
import { BoldText, MediumText } from "../../utiles/Fonts";
import LogoutNav from "../home/logoutNav/logoutNav";
import Button from "../../UI/Button";
import { router } from "expo-router";
import fonts from "../../styles/fonts";
import { useDispatch, useSelector } from "react-redux";
import { resetElapsed } from "../../store/redux/reducers/timeSlice";
import { formatTime } from "../../Services/TimeFormatter";
const statusBarHeight = Constants.statusBarHeight;
const FinalScreen = ({ time = "0:48" }) => {
  const elapsed = useSelector((state) => state.time.elapsed);
  console.log("elapsed", elapsed);

  const dispatch = useDispatch();

  const handleBackToMainScreen = () => {
    dispatch(resetElapsed());
    setTimeout(() => router.replace("/home"), 10);
  };
  // todo to calculate the dateNow with the updateAT
  // todo to refresh the put req on final screen after return to main screen

  return (
    <ScreenWrapper
      wrapperStyle={styles.container}
      isConnectedUser={false}
      edges={[]}
    >
      <LogoutNav />
      <ImageBackground
        source={require("../../assets/imgs/finalscreenbg.png")}
        style={{
          // width: 465,
          height: 177,
          resizeMode: "cover",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CheckmarkIcon />
        </View>
      </ImageBackground>

      <BoldText style={styles.header}>Good Job!</BoldText>
      <BoldText style={styles.subheader}>
        The system received the data.
      </BoldText>
      <MediumText style={styles.timerText}>
        You solved the alert perfectly on time, within{" "}
        <BoldText style={styles.timer}>{formatTime(elapsed)} seconds!</BoldText>
      </MediumText>
      <View style={styles.ratingWrapper}>
        <RateStar />
        <RateStar />
        <RateStar />
        <RateStar />
        <RateStar />
      </View>
      <Button
        buttonFunction={() => {
          handleBackToMainScreen();
        }}
        buttonText={"Back to main screen"}
        buttonWidth={303}
        buttonTextStyle={styles.buttonText}
        buttonStyle={styles.buttonStyle}
      />
    </ScreenWrapper>
  );
};

export default FinalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
    backgroundColor: colors.background,
  },
  header: {
    color: colors.white,
    fontSize: 28,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 32,
  },
  subheader: {
    color: colors.white,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  timerText: {
    fontSize: 16,
    color: colors.white,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: 339,
    lineHeight: 22,
    marginBottom: 12,
  },
  timer: {
    color: colors.white,
    fontSize: 16,
  },
  ratingWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    marginBottom: 48,
  },
  buttonStyle: {
    backgroundColor: "#1D69C5",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.Bold,
    fontSize: 16,
  },
});
