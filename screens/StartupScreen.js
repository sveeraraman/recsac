import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import colors from "../constants/colors";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import { loadFavorites } from "../store/actions/folders";
import { getUserDataFromCache, refreshToken } from "../store/actions/service";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  const [isloading, setisloading] = useState(false);

  useEffect(() => {
    const tryLogin = async () => {
      setisloading(true);
      var parseduserData = await getUserDataFromCache();
      // console.log("startup2", parseduserData);
      if (parseduserData == null) {
        //redirect to login
        props.navigation.navigate("Login");
        return;
      } else if (parseduserData != null) {
        //try refreshing
        await refreshToken();
        parseduserData = await getUserDataFromCache();
        if (!parseduserData) {
          props.navigation.navigate("Login");
          return;
        }
        const { username, userid, token, expiry } = parseduserData;
        const currentUnixTime = new Date().getTime() / 1000;
        if (currentUnixTime > expiry) {
          props.navigation.navigate("Login");
        } else {
          dispatch(
            authActions.authenticate(
              parseduserData.userid,
              parseduserData.token,
              parseduserData.username,
              parseduserData.expiry,
              parseduserData.useremail,
              parseduserData.phonenumber,
              parseduserData.ph_num_wo_ccode,
              parseduserData.user_firstname,
              parseduserData.user_lastname
            )
          );
          dispatch(loadFavorites());
          props.navigation.navigate("Home");
        }
      }
    };
    tryLogin();
    //clearStorage();
  }, [dispatch]);

  return (
    <View style={StyleSheet.screen}>
      <ActivityIndicator
        size="large"
        color={colors.primaryColor}
      ></ActivityIndicator>
    </View>
  );
};

const sytles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
