// import { useEffect, useState } from "react";
// import { storeData, retrieveData } from "../Auth/StorageService";

// export function useTime() {
//   const [elapsedTime, setElapsedTimeState] = useState(0);

//   useEffect(() => {
//     void (async () => {
//       const storedTime = await retrieveData("elapsedTime");
//       if (storedTime !== null) {
//         setElapsedTimeState(storedTime);
//       }
//     })();
//   }, []);

//   const setElapsedTime = (newTime) => {
//     void (async () => {
//       await storeData("elapsedTime", newTime);
//       setElapsedTimeState(newTime);
//     })();
//   };

//   return {
//     elapsedTime,
//     setElapsedTime,
//   };
// }

import { useEffect, useState } from "react";
import { storeData, retrieveData, removeData } from "../Auth/StorageService";

export function useTime() {
  const [elapsedTime, setElapsedTimeState] = useState(0);

  useEffect(() => {
    void (async () => {
      const storedTime = await retrieveData("elapsedTime");
      if (storedTime !== null) {
        setElapsedTimeState(storedTime);
      }
    })();
  }, []);

  const setElapsedTime = (newTime) => {
    void (async () => {
      if (newTime === null || newTime === undefined) {
        await removeData("elapsedTime");
      } else {
        await storeData("elapsedTime", newTime);
      }
      setElapsedTimeState(newTime);
    })();
  };

  return {
    elapsedTime,
    setElapsedTime,
  };
}
