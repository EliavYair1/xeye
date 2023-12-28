import { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";

import "@env";
import { useToken } from "./useToken";
import { useUser } from "./useUser";
import useFetch from "./useFetch";
import { useAlert } from "./useAlert";
import { useTypes } from "./useType";

import { disconnectSocket } from "../Services/socket";

const useUserLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setToken } = useToken();
  const { setUser } = useUser();
  const { setAlert } = useAlert();
  const { setTypes } = useTypes();

  // * login user with username and password
  const loginUser = async (ServerUrl, username, password) => {
    setLoading(true);
    try {
      console.log("trying to login", `${ServerUrl}/api/auth`, {
        username,
        password,
      });
      const response = await axios.post(`${ServerUrl}/api/auth`, {
        username,
        password,
      });
      // console.log("username", username);
      // console.log("password", password);
      console.log("response", response);
      if (response.status == 200) {
        const userToken = response.data.token;
        await loginUserWithToken(ServerUrl, userToken);
        setToken(userToken);
        setLoading(false);
        return true;
      } else {
        console.error("Token Login Error:", response.status);
        Alert.alert("Token Login Error", response.status);
      }
    } catch (error) {
      console.error("Login failed:", error.message);

      Alert.alert("Login Error", error.message);
    } finally {
      setLoading(false);
    }
    return false;
  };

  // * login user with token
  const loginUserWithToken = async (ServerUrl, userToken) => {
    // const currentServerUrl = await retrieveData("currentServerUrl");
    // console.log("currentServerUrl", currentServerUrl);
    try {
      const data = await useFetch(
        `${ServerUrl}/api/front/data`,
        userToken,
        "fetch data"
      );

      console.log("[loginUserWithToken]currentUser", data.currentUser);
      setUser(data.currentUser);
      setTypes(data.types);
      // setAlert(data.alerts.length > 0 ? data.alerts[0] : false);
      setAlert(data.alerts ? data.alerts : false);
      return true;
    } catch (error) {
      console.log("[loginUserWithToken]", error);
    }
    return false;
  };
  // Clear the token from AsyncStorage.
  const logoutUser = async () => {
    setLoading(true);
    try {
      setLoading(false);
      setToken(false);
      setUser(false);
      disconnectSocket();
      return true;
    } catch (error) {
      setLoading(false);
      console.error("Error while logging out:", error);
      return false;
    }
  };

  return {
    loading,
    loginUser,
    logoutUser,
    loginUserWithToken,
  };
};

export default useUserLogin;
