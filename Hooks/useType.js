import { useEffect, useState } from "react";
import { retrieveData, storeData } from "../Auth/StorageService";

export function useType() {
  const [type, setTypeState] = useState(false);

  useEffect(() => {
    void (async () => {
      const currentType = await retrieveData("currentType");
      setTypeState(currentType);
    })();
  }, []);

  const setType = (currentType) => {
    // console.log("settings", currentType);
    void (async () => {
      await storeData("currentType", currentType);
      setTypeState(currentType);
    })();
  };

  return {
    type,
    setType,
  };
}
