//SettingsMainScreen
import React, { useState, useEffect } from "react";
import SettingsMain from "../components/settingsmain";
import { getUserDataFromCache } from "../store/actions/service";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

const SettingsMainScreen = (props) => {
  const [username, setusername] = useState();
  const [email, setemail] = useState();

  const getLoggedUserName = async () => {
    var parseduserData = await getUserDataFromCache();
    setusername(parseduserData.userid);
    setemail(parseduserData.useremail);
  };

  useEffect(() => {
    getLoggedUserName();
  }, [getLoggedUserName]);

  return (
    <SettingsMain
      name={username}
      email={email}
      // props={props}
      navigation={props.navigation}
    ></SettingsMain>
  );
};

SettingsMainScreen.navigationOptions = (navdata) => {
  return {
    headerTitle: "Settings",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          icontype="AntDesign"
          title="home"
          onPress={() => {
            navdata.navigation.navigate("Home");
          }}
          iconName="arrowleft"
        ></Item>
      </HeaderButtons>
    ),
  };
};

export default SettingsMainScreen;
