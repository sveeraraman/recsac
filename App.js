import "react-native-gesture-handler";
import React, { useState } from "react";
import { StyleSheet, StatusBar } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";
import Amplify from "aws-amplify";
import ItemNavigator from "./navigation/ItemNavigator";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducerCombined from "./store/reducers/rootreducer";
import { Provider } from "react-redux";
import { AsyncStorage } from "react-native";
import { GetEndpoint } from "./constants/constantkeys";

const store = createStore(rootReducerCombined, applyMiddleware(thunk));
var envdetails = GetEndpoint();
//console.log("_endpoint", _endpoint);

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_Z8NXCK2xe",
    userPoolWebClientId: "3fr8fp84btfv2q2hcqo9qmd23s",
    mandatorySignIn: false,
  },
  // Add in our new API, "name" can be whatever we want
  API: {
    endpoints: [
      {
        name: "folderservices",
        endpoint: envdetails.endpoint,
      },
    ],
  },
});

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const _retrieveData = async (key) => {
  var retValue = null;
  try {
    retValue = await AsyncStorage.getItem(key);
  } catch (error) {
    alert(error);
  }
  return retValue;
};

export default function App() {
  // const [loading, setLoading] = useState(true);
  const [fontloaded, setfontloaded] = useState(false);

  if (!fontloaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setfontloaded(true)}
      ></AppLoading>
    );
  }

  return (
    <Provider store={store}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f5f5f5"
        hidden={false}
      />
      <ItemNavigator></ItemNavigator>
    </Provider>
  );
}

// export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
