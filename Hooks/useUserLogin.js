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
import { useType } from "./useType";

const useUserLogin = () => {
  // const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setToken } = useToken();
  const { setUser } = useUser();
  const { setAlert } = useAlert();
  const { setType } = useType();
  // const [Error, setError] = useState(null);
  const loginUser = async (username, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.API_BASE_URL}/auth`, {
        username,
        password,
      });

      // console.log(`url:   ${process.env.API_BASE_URL}/auth`);
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

  const loginUserWithToken = async (userToken) => {
    try {
      const data = await useFetch(
        `${process.env.API_BASE_URL}/front/data`,
        userToken,
        "fetch data"
      );
      // console.log("Fetched data:", data, data.currentUser._id);
      OneSignal.login(data.currentUser._id);
      if (OneSignal.Notifications.canRequestPermission) {
        console.log("Notifications");
        OneSignal.Notifications.requestPermission(true);
      }
      // console.log(data.types);
      setUser(data.currentUser);
      setType(data.types);
      setAlert(data.alerts.length > 0 ? data.alerts[0] : false);

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
      return true;
    } catch (error) {
      setLoading(false);
      console.error("Error while logging out:", error);
      return false;
    }
  };

  // // Retrieve the token using your custom AsyncStorage function.
  // const initializeUserToken = async () => {
  //   const userToken = await retrieveData("userToken");
  //   if (userToken) {
  //     await setToken(userToken);
  //   }
  // };

  return {
    loading,
    loginUser,
    logoutUser,
    loginUserWithToken,
  };
};

export default useUserLogin;
