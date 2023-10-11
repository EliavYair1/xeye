import axios from "axios";
import { Alert } from "react-native";
import { useState, useEffect } from "react";

export const useFetch = async (url, msg) => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    Alert.alert("Error", `There was an error trying to ${msg}`);
    throw new Error(`Unable to fetch data from ${url}`);
  }
};

export default useFetch;
