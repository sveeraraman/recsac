import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import colors from "../constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { getUserDataFromCache } from "../store/actions/service";
import * as cons from "../constants/constantkeys";

const ProfileScreen = (props) => {
  const [username, setusername] = useState();
  const [useremail, setuseremail] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [fullname, setfullname] = useState();
  var domainname = cons.DOMAIN_NAME_PLAIN;
  var dom_email = cons.DOMAIN_NAME_WITH_AT;

  const getLoggedUserName = useCallback(async () => {
    var parseduserData = await getUserDataFromCache();
    setusername(parseduserData.username);
    setuseremail(parseduserData.useremail);
    setphonenumber(parseduserData.ph_num_wo_ccode);
    setfullname(parseduserData.user_firstname);
  }, [username]);
  useEffect(() => {
    getLoggedUserName();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View>
          <FontAwesome name="user-o" size={45} color="white" />
        </View>
        <View style={styles.container_rows}>
          <Text style={styles.heading}>{fullname}</Text>
          <Text style={styles.smalltext}>{useremail}</Text>
          <Text style={styles.smalltext}>{phonenumber}</Text>
        </View>
      </View>
      <View style={styles.parahead}>
        <View>
          <View>
            <Text style={styles.subhead}>
              Use any of the following options for receiving use-and-throw,
              short lived emails.
            </Text>
          </View>
          <View
            style={{ borderWidth: 0, flexDirection: "row", marginRight: 10 }}
          >
            <MaterialIcons name="email" size={20} color={colors.iconColor} />
            <Text style={{ paddingLeft: 10, fontSize: 13, paddingBottom: 15 }}>
              {phonenumber}
              {dom_email}
            </Text>
          </View>
          <View
            style={{ borderWidth: 0, flexDirection: "row", marginRight: 10 }}
          >
            <MaterialIcons name="email" size={20} color={colors.iconColor} />
            <Text style={{ paddingLeft: 10, fontSize: 13, paddingBottom: 15 }}>
              {phonenumber}.anyFolderName{dom_email}
            </Text>
          </View>
          <View
            style={{ borderWidth: 0, flexDirection: "row", marginRight: 10 }}
          >
            <MaterialIcons name="email" size={20} color={colors.iconColor} />
            <Text style={{ paddingLeft: 10, fontSize: 13, paddingBottom: 15 }}>
              {username}
              {dom_email}
            </Text>
          </View>
          <View
            style={{ borderWidth: 0, flexDirection: "row", marginRight: 10 }}
          >
            <MaterialIcons name="email" size={20} color={colors.iconColor} />
            <Text style={{ paddingLeft: 10, fontSize: 13, paddingBottom: 15 }}>
              {username}.anyFolderName{dom_email}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

ProfileScreen.navigationOptions = {
  headerTitle: "Profile",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryColor,
  },
  subhead: {
    fontSize: 13,
    color: colors.fontDefColor,
    paddingBottom: 20,
  },
  itemcolumn: {
    paddingLeft: 20,
  },
  itemrow: {
    flexDirection: "row",
    padding: 20,
    borderWidth: 1,
    width: "100%",
  },
  pararows: {
    flex: 1,
    borderWidth: 0,
    flexDirection: "column",
    paddingTop: 25,
  },
  parahead: {
    flex: 8,
    //borderWidth: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: colors.subprimarycolor,
    padding: 20,
    paddingRight: 40,
    //borderTopLeftRadius: 25,
    //borderTopRightRadius: 25,
  },
  container: {
    flex: 1,
    borderWidth: 0,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 20,
  },
  container_rows: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 20,
  },
  heading: {
    fontSize: 20,
    color: colors.highlightedTextColor,
  },
  smalltext: {
    fontSize: 15,
    color: colors.highlightedTextColor,
  },
});

export default ProfileScreen;
