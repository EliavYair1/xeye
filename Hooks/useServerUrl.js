import { useEffect, useState } from "react";
import { retrieveData, storeData } from "../Auth/StorageService";

export function useServerUrl() {
  const [ServerUrl, setServerUrlState] = useState("");
  // console.log("[useServerUrl]ServerUrl", ServerUrl);
  useEffect(() => {
    void (async () => {
      const currentServerUrl = await retrieveData("currentServerUrl");
      // console.log("currentServerUrl", currentServerUrl);
      setServerUrlState(currentServerUrl);
    })();
  }, []);

  const setServerUrl = (currentServerUrl) => {
    // console.log("settings", currentServerUrl);
    void (async () => {
      await storeData("currentServerUrl", currentServerUrl);
      setServerUrlState(currentServerUrl);
    })();
  };

  return {
    ServerUrl,
    setServerUrl,
  };
}
