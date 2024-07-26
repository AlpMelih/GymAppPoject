import React from "react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light} icons={EvaIconsPack}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
