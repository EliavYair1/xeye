import { StyleSheet, Text, View, Button } from "react-native";

import "@env";
import LoginWindow from "./LoginWindow/LoginWindow";
const Login = () => {
  // eliav s465erydgfhg
  return (
    <View style={styles.container}>
      <LoginWindow />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
