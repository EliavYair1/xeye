import { useEffect, useState } from "react";
import { retrieveData, storeData } from "../Auth/StorageService";

export function useToken() {
  const [token, setTokenState] = useState(false);
  // console.log("token", token);
  useEffect(() => {
    void (async () => {
      const currentToken = await retrieveData("currentToken");
      // console.log("currentToken", currentToken);
      setTokenState(currentToken);
    })();
  }, []);

  const setToken = (currentToken) => {
    // console.log("settings", currentToken);
    void (async () => {
      await storeData("currentToken", currentToken);
      setTokenState(currentToken);
    })();
  };

  return {
    token,
    setToken,
  };
}
