import SplashScreenComponent from "../../utiles/SplashScreen";

const Splash = () => {
  return (
    <SplashScreenComponent
      onLoaded={() => {
        console.log("Splash.");
      }}
    />
  );
};

export default Splash;
