import React, { useState, useEffect } from "react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [theme, setTheme] = useState(eva.light);

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("darkMode");
      if (storedTheme !== null) {
        setTheme(storedTheme === "true" ? eva.dark : eva.light);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === eva.light ? eva.dark : eva.light;
    setTheme(newTheme);
    await AsyncStorage.setItem(
      "darkMode",
      newTheme === eva.dark ? "true" : "false"
    );
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer>
          <AuthNavigator toggleTheme={toggleTheme} />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default App;
