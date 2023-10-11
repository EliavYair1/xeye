import { useState } from "react";
import { Alert, AsyncStorage } from "react-native";
import { storeData, retrieveData, removeData } from "../Auth/StorageService";
import axios from "axios";
import "@env";
const useUserLogin = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [Error, setError] = useState(null);
  const loginUser = async (username, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.API_BASE_URL}auth`, {
        username,
        password,
      });
      if (response.status == 200) {
        const userToken = response.data.token;
        // console.log("userToken", userToken);

        await storeData("userToken", userToken);
        setToken(userToken);
      } else {
        console.error("Login failed:", response.status);
      }
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);

      Alert.alert("Login Error", `wrong password or username`);
    } finally {
      setLoading(false);
    }
  };
  // Clear the token from AsyncStorage.
  const logoutUser = async () => {
    // await removeData("userToken");
    // await setToken(null);

    try {
      await removeData("userToken");
      setToken(null);
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  // Retrieve the token using your custom AsyncStorage function.
  const initializeUserToken = async () => {
    const userToken = await retrieveData("userToken");
    if (userToken) {
      await setToken(userToken);
    }
  };

  return {
    token,
    loading,
    loginUser,
    logoutUser,
    initializeUserToken,
  };
};

export default useUserLogin;
