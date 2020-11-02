import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import { getUserDataFromCache } from "../store/actions/service";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const [username, setusername] = useState();
  const [userid, setuserid] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [email, setemail] = useState();
  const state = {
    routes: [
      {
        name: "Profile",
        icon: "ios-contact",
        navigateScreen: "Profile",
      },
      {
        name: "Settings",
        icon: "ios-settings",
        navigateScreen: "Settings",
      },
      // {
      //   name: "FAQ",
      //   icon: "ios-help-buoy",
      //   navigateScreen: "FAQ",
      // },
      {
        name: "Upgrade to Premium",
        icon: "ios-bowtie",
        navigateScreen: "Premium",
      },
      {
        name: "Home",
        icon: "ios-home",
        navigateScreen: "Folders",
      },
    ],
  };

  useEffect(() => {
    getLoggedUserName();
  });

  const getLoggedUserName = async () => {
    var parseduserData = await getUserDataFromCache();
    // console.log("sidebar-1", parseduserData);
    setusername(parseduserData.user_firstname);
    setuserid(parseduserData.userid);
    setphonenumber(parseduserData.phonenumber);
    setemail(parseduserData.useremail);
  };

  const logout = async () => {
    await dispatch(authActions.logout());
    props.navigation.navigate("Auth");
  };
  return (
    <View style={styles.container}>
      <View style={styles.headcontainer}>
        <View
          style={{ borderWidth: 0, flex: 1, paddingTop: 20, paddingLeft: 10 }}
        >
          <Ionicons name="ios-contact" size={50} color={colors.iconColor} />
        </View>
        <View style={{ borderWidth: 0, width: "80%", paddingLeft: 20 }}>
          <Text
            style={{
              color: colors.fontDefColor,
              fontWeight: "bold",
              fontSize: 22,
              marginTop: 10,
            }}
          >
            {username}
          </Text>
          <Text style={{ color: colors.fontDefColor }}>{email}</Text>
          <Text
            style={{
              color: colors.fontDefColor,
              fontWeight: "bold",
              fontSize: 12,
              marginTop: 5,
            }}
          >
            {userid}
          </Text>
          <Text style={{ color: colors.highlightedTextColor }}>
            {phonenumber}
          </Text>
        </View>
      </View>
      <View style={styles.itemlistview}>
        <View style={styles.sidebarDivider}></View>

        <FlatList
          style={{ width: "100%", marginLeft: 30 }}
          data={state.routes}
          renderItem={({ item }) => (
            <SubItem item={item} navigate={props.navigation.navigate} />
          )}
          keyExtractor={(item) => item.name}
        />
        <View
          style={{
            marginBottom: 50,
            borderWidth: 0,
            width: "100%",
            marginLeft: 30,
          }}
        >
          <TouchableOpacity style={styles.listItem} onPress={logout}>
            <Ionicons name="ios-exit" size={25} color={colors.blackIconColor} />
            <Text style={styles.title}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Text></Text>
      </View>
    </View>
  );
};

function SubItem({ item, navigate }) {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigate(item.navigateScreen)}
    >
      <Ionicons name={item.icon} size={25} color={colors.blackIconColor} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryColor,
    //alignItems: "center",
    flex: 1,
  },
  headcontainer: {
    backgroundColor: colors.primaryColor,
    paddingTop: 30,
    paddingBottom: 10,
    // flex: 1,
    flexDirection: "row",
  },
  listItem: {
    //flex: 1,
    height: 60,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 20,
  },
  sidebarDivider: {
    height: 0,
    width: "100%",
    backgroundColor: "lightgray",
    marginVertical: 10,
  },
  itemlistview: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderWidth: 0,
    backgroundColor: colors.subprimarycolor,
  },
  footer: {
    marginLeft: 0,
    paddingLeft: 0,
    backgroundColor: colors.subprimarycolor,
    borderWidth: 0,
    flex: 1,
  },
});

export default Sidebar;
