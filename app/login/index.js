import { StyleSheet } from "react-native";
import ScreenWrapper from "../../utiles/ScreenWrapper";
import LoginWindow from "./loginWindow/loginWindow";
const Login = () => {
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
