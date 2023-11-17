import { useEffect, useState } from "react";
import { retrieveData, storeData } from "../Auth/StorageService";

export function useAlert() {
  const [alert, setAlertState] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentAlert = await retrieveData("currentAlert");
        setAlertState(currentAlert);
      } catch (error) {
        console.error("Error fetching alert:", error);
      }
    };
    fetchData();
  }, []);
  // console.log(alert);

  const setAlert = async (currentAlert) => {
    try {
      await storeData("currentAlert", currentAlert);
      setAlertState(currentAlert);
    } catch (error) {
      console.error("Error setting alert:", error);
    }
  };

  return {
    alert,
    setAlert,
  };
}
