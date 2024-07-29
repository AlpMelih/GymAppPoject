import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatGpt from "../screens/ChatGemini";
import Map from "../screens/Map";
import UserInfo from "../screens/UserInfo";
import QrScanner from "../screens/QrScanner";
import Settings from "../screens/Settings";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="ChatGPT" component={ChatGpt} />
      <Tab.Screen name="Harita" component={Map} />
    </Tab.Navigator>
  );
};
const AuthNavigator = ({ toggleTheme }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={AppTabs} />
      <Stack.Screen name="Bilgiler" component={UserInfo} />
      <Stack.Screen name="QrScanner" component={QrScanner} />
      <Stack.Screen
        name="Ayarlar"
        // Optional: hide header if you don't want it
      >
        {(props) => <Settings {...props} toggleTheme={toggleTheme} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
