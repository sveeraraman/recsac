import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import DefaultText from "../components/DefaultText";
import { FontAwesome } from "@expo/vector-icons";

const state = {
  routes: [
    {
      name: "Account",
      subtext: "",
      icon: "ios-contact",
      isPremium: false,
      navigateScreen: "Profile",
      style: "rowitem",
    },
    {
      name: "Add Phone Number",
      icon: "ios-phone-portrait",
      navigateScreen: "SettingsAddPhone",
      isPremium: true,
    },
    {
      name: "Business Integration",
      icon: "ios-build",
      navigateScreen: "SettingsBusinessInt",
      isPremium: true,
    },
    {
      name: "Configure Folders",
      icon: "ios-folder",
      navigateScreen: "SettingsConfigureFolders",
      isPremium: true,
    },
    {
      name: "Set alerts",
      icon: "ios-alert",
      navigateScreen: "SettingsDeleteAccount",
      isPremium: true,
    },
    {
      name: "Upgrade",
      icon: "ios-bowtie",
      navigateScreen: "SettingsDeleteAccount",
      isPremium: false,
      subtext: "Coming soon!",
    },
    {
      name: "Delete Acccount",
      icon: "ios-remove-circle",
      navigateScreen: "SettingsDeleteAccount",
      isPremium: false,
      subtext: "Coming soon!",
    },
  ],
};

const SettingsMain = (props) => {
  return (
    <View>
      <FlatList
        data={state.routes}
        renderItem={({ item }) => (
          <SubItem
            item={item}
            navigate={props.navigation.navigate}
            name={props.name}
            email={props.email}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
      />
    </View>
  );
};

function SubItem({ item, navigate, name, email }) {
  //state.routes[0].subtext = email;
  return (
    <View style={styles.rowitemContainer}>
      <TouchableOpacity onPress={() => navigate(item.navigateScreen)}>
        <View style={styles.itemstyle}>
          <View style={styles.iconsrow}>
            <View>
              {item.isPremium ? (
                <View>
                  <FontAwesome name="lock" size={24} color="#9D9DA0" />
                </View>
              ) : (
                <View></View>
              )}
            </View>
          </View>
          <View style={styles.icon}>
            <Ionicons name={item.icon} size={30} color="#9D9DA0" />
          </View>
          <View style={styles.title}>
            <DefaultText style={styles.titletext}>{item.name}</DefaultText>
          </View>
          <View style={styles.subtext}>
            <DefaultText size={10}>{item.subtext}</DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 5,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    borderWidth: 0,
    width: 50,
  },
  iconsrow: {
    // borderWidth: 0,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    // elevation: 1,
    position: "absolute",
  },
  titletext: {
    fontSize: 16,
    // marginLeft: 20,
    paddingTop: 2,
    color: colors.fontDefColor,
    // borderWidth:1
  },
  rowitemContainer: {
    flex: 1,
    margin: 2,
    borderWidth: 0,
    //borderTopWidth: 0.25,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    width: "100%",
    marginBottom: 0,
    // backgroundColor: "white",
    backgroundColor: "#ffffff",
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  itemstyle: {
    flex: 1,
    //borderWidth: 0.25,
    borderColor: colors.borderColor,
    flexDirection: "row",
    //    borderTopLeftRadius: 15,
    //  borderBottomLeftRadius: 15,
    // borderRadius: 15,
    alignItems: "flex-start",
    //justifyContent: "center",
    padding: 2,
    //shadowRadius: 0.5,
    //shadowOpacity: 0.25,
  },
  subtext: {
    paddingTop: 5,
    alignItems: "flex-end",
    flex: 1,
    //borderWidth: 1,
  },
  profile: {
    // flexDirection: "row",
  },
});

export default SettingsMain;
