import axios from "axios";
import { Alert } from "react-native";

const useFetch = async (url, token, msg) => {
  if (!token) {
    Alert.alert("Error", "Token not provided");
    throw new Error("Token not provided");
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    Alert.alert("Error", `There was an error trying to ${msg}`);
    throw new Error(`Unable to fetch data from ${url}`);
  }
};

export default useFetch;
