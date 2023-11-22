import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DemoScreen from "../screens/DemoScreen";
import DemoScreen2 from "../screens/DemoScreen2";
import RegisterScreen from "../screens/auth/RegisterScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import HomeScreenHeader from "./headers/HomeScreenHeader";
import CreateMovieScreen from "../screens/CreateMovieScreen";

const Stack = createNativeStackNavigator();

export default function CustomStackNavigator({ userConnected }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={userConnected ? "Home" : "WelcomeScreen"}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="WelcomeScreen"
          component={WelcomeScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RegisterScreen"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen name="CreateMovieScreen" component={CreateMovieScreen} />
        <Stack.Screen name="Demo" component={DemoScreen} />
        <Stack.Screen name="DemoScreen2" component={CreateMovieScreen} />
        <Stack.Screen
          options={{
            headerRight: () => <HomeScreenHeader />,
          }}
          name="Home"
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
