import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatGpt from "../screens/ChatGemini";
import Map from "../screens/Map";

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
const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={AppTabs} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
