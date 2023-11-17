import { useEffect, useState } from "react";
import { retrieveData, storeData } from "../Auth/StorageService";

export function useUser() {
  const [user, setUserState] = useState(false);
  useEffect(() => {
    void (async () => {
      const currentUser = await retrieveData("currentUser");
      setUserState(currentUser);
    })();
  }, []);
  // console.log(user);

  const setUser = (currentUser) => {
    // console.log("settings", currentUser);
    void (async () => {
      await storeData("currentUser", currentUser);
      setUserState(currentUser);
    })();
  };

  return {
    user,
    setUser,
  };
}
