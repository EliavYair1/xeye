import { useEffect, useState } from "react";
import { retrieveData, storeData } from "../Auth/StorageService";

export function useAlert() {
  const [alerts, setAlertsState] = useState(false);
  useEffect(() => {
    void (async () => {
      const currentAlerts = await retrieveData("currentAlerts");
      setAlertsState(currentAlerts);
    })();
  }, []);

  const setAlerts = (currentAlerts) => {
    // console.log("settings", currentAlerts);
    void (async () => {
      await storeData("currentAlerts", currentAlerts);
      setAlertsState(currentAlerts);
    })();
  };

  return {
    alerts,
    setAlerts,
  };
}
