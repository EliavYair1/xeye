import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/Login/login";
import Home from "../Screens/Home/Home";
import Start from "../Screens/Start/Start";

const Stack = createStackNavigator();
const XeyeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Start"
        component={Start}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default XeyeNavigator;
