import { useEffect, useState } from "react";
import { retrieveData, storeData } from "../Auth/StorageService";

export function useAlert() {
  const [alert, setAlertState] = useState(false);

  useEffect(() => {
    void (async () => {
      const currentAlert = await retrieveData("currentAlert");
      setAlertState(currentAlert);
    })();
  }, []);

  const setAlert = (currentAlert) => {
    // console.log("settings", currentAlert);
    void (async () => {
      await storeData("currentAlert", currentAlert);
      setAlertState(currentAlert);
    })();
  };

  return {
    alert,
    setAlert,
  };
}
