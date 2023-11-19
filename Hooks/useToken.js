import { useEffect, useState } from "react";
import { retrieveData, storeData } from "../Auth/StorageService";

export function useToken() {
  const [token, setTokenState] = useState(false);
  const [serverUrl, setServerUrlState] = useState(false);
  // console.log("token", token);
  useEffect(() => {
    void (async () => {
      const currentToken = await retrieveData("currentToken");
      const currentServerUrl = await retrieveData("currentServerUrl");
      // console.log("currentToken", currentToken);
      setTokenState(currentToken);
      setServerUrlState(currentServerUrl);
    })();
  }, []);

  const setToken = (currentToken) => {
    // console.log("settings", currentToken);
    void (async () => {
      await storeData("currentToken", currentToken);
      setTokenState(currentToken);
    })();
  };

  const setServerUrl = (currentServerUrl) => {
    // console.log("settings", currentServerUrl);
    void (async () => {
      await storeData("currentServerUrl", currentServerUrl);
      // setServerUrlState(currentServerUrl);
      setServerUrlState((prevServerUrl) => {
        if (prevServerUrl == false) {
          return currentServerUrl;
        } else {
          return prevServerUrl;
        }
      });
    })();
  };

  return {
    token,
    setToken,
    setServerUrl,
    serverUrl,
  };
}
