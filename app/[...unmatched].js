import { router } from "expo-router";
import SplashScreenComponent from "../utiles/SplashScreen";

const Unmatched = () => {
  return (
    <SplashScreenComponent
      onLoaded={() => {
        console.log("Unmatched.");
        router.replace("/login");
      }}
    />
  );
};

export default Unmatched;
