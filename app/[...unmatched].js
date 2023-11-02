import SplashScreenComponent from "../utiles/SplashScreen";

const Unmatched = () => {
  return (
    <SplashScreenComponent
      onLoaded={() => {
        console.log("Unmatched.");
      }}
    />
  );
};

export default Unmatched;
