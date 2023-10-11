import ScreenWrapper from "../../utiles/ScreenWrapper";
import Loader from "../../utiles/Loader";
import SplashScreenComponent from "../../utiles/SplashScreen";
import useScreenNavigator from "../../Hooks/useScreenNavigator";
import routes from "../../Navigation/routes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import colors from "../../styles/colors";
import { retrieveData } from "../../Auth/StorageService";
const Home = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { navigateToRoute } = useScreenNavigator();
  const dispatch = useDispatch();
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    const checkLoginStatus = async () => {
      const user_id = await retrieveData("user_id");
      console.log(`user #${user_id}`);
      // if (user_id) {
      //   const responseClients = await fetchData(
      //     process.env.API_BASE_URL + "api/clients.php",
      //     { id: user_id }
      //   );
      // console.log("responseClients:", responseClients.data[1].reports[0]);
      //   if (responseClients.success) {
      //     let clients = [];
      //     responseClients.data.forEach((element) => {
      //       clients.push(new Client(element));
      //     });
      //     dispatch(setClients({ clients: clients }));
      //     // console.log("clients[Home]:", clients);

      //     dispatch(setUser(user_id));
      //     const responseCategories = await axios.get(
      //       process.env.API_BASE_URL + "api/categories.php"
      //     );
      //     dispatch(setGlobalCategories(responseCategories.data.categories));
      //     dispatch(setReportsTimes(responseCategories.data.reports_times));
      //     navigateToRoute(routes.ONBOARDING.ClientsList);
      //     // navigateToRoute(routes.ONBOARDING.WorkerNewReport);
      //   } else {
      //     console.log("error2:", responseClients.message);
      //   }
      // } else {
      //   navigateToRoute(routes.ONBOARDING.Login);
      // }
      navigateToRoute(routes.ONBOARDING.Login);
    };
    checkLoginStatus();
    prepare();
  }, []);

  const onAppLoaded = async () => {
    await SplashScreen.hideAsync();
    setTimeout(async () => {
      setAppIsReady(true);
    }, 1000);
  };

  if (!appIsReady) {
    return <SplashScreenComponent onLoaded={onAppLoaded} />;
  }
  return (
    <>
      {appIsReady && (
        <ScreenWrapper bgColor={colors.xeyeBlue}>
          <Loader visible={appIsReady} color={colors.blue} />
        </ScreenWrapper>
      )}
    </>
  );
};

export default Home;
