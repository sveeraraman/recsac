import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../constants/colors";
import { getUserDataFromCache } from "../store/actions/service";
import DefaultText from "../components/DefaultText";

const PremiumScreen = (props) => {
  const [username, setusername] = useState();
  const [useremail, setuseremail] = useState();
  const [phonenumber, setphonenumber] = useState();

  const getLoggedUserName = async () => {
    var parseduserData = await getUserDataFromCache();
    setusername(parseduserData.username);
    setuseremail(parseduserData.useremail);
    setphonenumber(parseduserData.ph_num_wo_ccode);
    // console.log("parseduserData", parseduserData.ph_num_wo_ccode);
  };

  useEffect(() => {
    getLoggedUserName();
  }, []);

  return (
    <View style={styles.screen}>
      <DefaultText>Coming soon!</DefaultText>
    </View>
  );
};

PremiumScreen.navigationOptions = {
  headerTitle: "Upgrade",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.subprimarycolor,
  },
});

export default PremiumScreen;
