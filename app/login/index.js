import { StyleSheet, Text, View, Button } from "react-native";
import ScreenWrapper from "../../utiles/ScreenWrapper";
import colors from "../../styles/colors";
import background from "../../assets/background/background.png";
import LoginWindow from "./loginWindow/loginWindow";
const Login = () => {
  // eliav s465erydgfhg
  return (
    <ScreenWrapper
      wrapperStyle={styles.container}
      edges={["right", "left"]}
      isConnectedUser={true}
    >
      <LoginWindow />
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
  },
});
