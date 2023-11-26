import { useEffect, useState } from "react";
import { Alert, AsyncStorage } from "react-native";
import { storeData, retrieveData, removeData } from "../Auth/StorageService";
import axios from "axios";

import "@env";
import { useToken } from "./useToken";
import { useUser } from "./useUser";
import useFetch from "./useFetch";
import { OneSignal } from "react-native-onesignal";
import { useAlert } from "./useAlert";
import { useTypes } from "./useType";

import { disconnectSocket } from "../Services/socket";
import { useServerUrl } from "./useServerUrl";

const useUserLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setToken } = useToken();
  const { setUser } = useUser();
  const { setAlert } = useAlert();
  const { setTypes } = useTypes();
  const { ServerUrl } = useServerUrl();

  // * login user with username and password
  const loginUser = async (username, password) => {
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
      // console.log("response",response);
      if (response.status == 200) {
        const userToken = response.data.token;
        setToken(userToken);
        await loginUserWithToken(userToken);
        setLoading(false);
        return true;
      } else {
        console.error("Login failed:", response.status);
        Alert.alert("Login Error", response.status);
      }
    } catch (error) {
      console.error("Login failed:", error);

      Alert.alert("Login Error", error);
    } finally {
      setLoading(false);
    }
    return false;
  };

  // * login user with token
  const loginUserWithToken = async (userToken) => {
    const currentServerUrl = await retrieveData("currentServerUrl");
    console.log("currentServerUrl", currentServerUrl);
    try {
      const data = await useFetch(
        `${currentServerUrl}/api/front/data`,
        userToken,
        "fetch data"
      );

      if (OneSignal.Notifications.canRequestPermission()) {
        console.log("Notifications", data.currentUser._id);
        OneSignal.Notifications.requestPermission(true).then(() => {
          console.log("Notifications requestPermission");
          OneSignal.login(data.currentUser._id);
        });
      }
      // console.log("[loginUserWithToken]currentUser", data.currentUser);
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
