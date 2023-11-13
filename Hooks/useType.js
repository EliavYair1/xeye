import { useEffect, useState } from "react";
import { retrieveData, storeData } from "../Auth/StorageService";

export function useTypes() {
  const [types, setTypeState] = useState(false);

  useEffect(() => {
    void (async () => {
      const currentTypes = await retrieveData("currentTypes");
      setTypeState(currentTypes);
    })();
  }, []);

  const setTypes = (currentTypes) => {
    // console.log("settings", currentTypes);
    void (async () => {
      await storeData("currentTypes", currentTypes);
      setTypeState(currentTypes);
    })();
  };

  return {
    types,
    setTypes,
  };
}
