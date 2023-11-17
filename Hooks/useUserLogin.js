import { useState } from "react";
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

import {
  disconnectSocket,
  initializeSocket,
  subscribeToChangeAlert,
} from "../Services/socket";
import { useServerUrl } from "./useServerUrl";

const useUserLogin = () => {
  // const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setToken } = useToken();
  const { setUser } = useUser();
  const { setAlert } = useAlert();
  const { setTypes } = useTypes();
  const { ServerUrl } = useServerUrl();
  // const [Error, setError] = useState(null);
  // todo to change the logic instead getting the api from env hardcoded get it from the input
  const loginUser = async (username, password) => {
    try {
      // console.log(ServerUrl);
      console.log("serverUrl", ServerUrl);

      setLoading(true);
      const response = await axios.post(`${ServerUrl}/api/auth`, {
        username,
        password,
      });
      // console.log("response",response);
      if (response.status == 200) {
        const userToken = response.data.token;
        setToken(userToken);
        loginUserWithToken(userToken);

        return true;
      } else {
        console.error("Login failed:", response.status);
      }
    } catch (error) {
      console.error("Login failed:", error);

      Alert.alert("Login Error", `wrong password or username`);
    } finally {
      setLoading(false);
    }
    return false;
  };
  // todo to change the logic instead getting the api from env hardcoded get it from the input
  const loginUserWithToken = async (userToken) => {
    try {
      const data = await useFetch(
        `${process.env.API_BASE_URL}/front/data`,
        userToken,
        "fetch data"
      );
      // ! error auto login with token gets network error because the ServerUrl start has false
      // const data = await useFetch(
      //   `${ServerUrl}/api/front/data`,
      //   userToken,
      //   "fetch data"
      // );
      // console.log("Fetched data:", data, data.currentUser._id);
      OneSignal.login(data.currentUser._id);

      if (OneSignal.Notifications.canRequestPermission) {
        // console.log("Notifications");
        OneSignal.Notifications.requestPermission(true);
      }
      // console.log(data.types);
      setUser(data.currentUser);
      setTypes(data.types);
      setAlert(data.alerts.length > 0 ? data.alerts[0] : false);
      // todo align with nir if this code could run only on the home screen
      // initializeSocket();
      // // * subscribe to changeAlert event with currentUser
      // subscribeToChangeAlert(data.currentUser, (alert) => {
      //   if (alert) {
      //     console.log("callback is true, perform actions...");
      //     // setAlert(data.alerts[0]);
      //     setAlert(alert);
      //   } else {
      //     console.log("callback is false, handle false alert...");
      //     // setAlert(false);
      //   }
      // });

      return true;
    } catch (error) {
      console.log("error", error);
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
