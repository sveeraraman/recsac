import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import colors from "../constants/colors";
import { Platform, Modal, Text } from "react-native";
import FoldersListScreen from "../screens/FoldersListScreen";
import FolderItemsScreen from "../screens/FolderItemsScreen";
import ItemDetailsScreen from "../screens/ItemDetailsScreen";
import { AntDesign } from "@expo/vector-icons";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator, DrawerSidebar } from "react-navigation-drawer";
import Sidebar from "../components/Sidebar";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "react-navigation-tabs";
import LoginScreen from "../screens/LoginScreen";
import SignupScreenWrapper from "../screens/SignupScreen";
import SignupSuccessScreen from "../screens/SignupSuccessScreen";
import SettingsMainScreen from "../screens/SettingsMainScreen";
import StartupScreen from "../screens/StartupScreen";
import PremiumScreen from "../screens/PremiumScreen";
import PolicyScreen from "../screens/PolicyScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import FriendsListScreen from "../screens/FriendsListScreen";
import AddFriendScreen from "../screens/addfriendscreen";
import ThemeScreen from "../screens/ThemeScreen";
// import MoveToFolderScreen from "../screens/MoveToFolderScreen";
//import { colors } from "react-native-elements";

const ItemNavigator = createStackNavigator(
  {
    Folders: { screen: FoldersListScreen },
    FolderItems: { screen: FolderItemsScreen },
    ItemDetail: { screen: ItemDetailsScreen },
    Profile: { screen: ProfileScreen },
    Settings: { screen: SettingsMainScreen },
    Premium: { screen: PremiumScreen },
    Policy: { screen: PolicyScreen },
    FriendsList: { screen: FriendsListScreen },
    Theme: { screen: ThemeScreen },
    // MoveToFolder: { screen: MoveToFolderScreen },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#f5f5f5",
      },
      headerTintColor:
        Platform.OS === "android"
          ? colors.blackIconColor
          : colors.blackIconColor,
    },
    mode: "card",
  }
);

const defaultNavOptions = {
  // headerStyle: {
  //   backgroundColor:
  //     Platform.OS === "android" ? colors.secondaryColor : colors.secondaryColor,
  // },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor:
    Platform.OS === "android" ? colors.blackIconColor : colors.blackIconColor,
};

const defaultNavOptionsNoHeader = {
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor:
    Platform.OS === "android"
      ? colors.highlightedTextColor
      : colors.highlightedTextColor,
};

const FavoriteNavigator = createStackNavigator(
  {
    Favorites: (props) => (
      <FoldersListScreen {...props} clickFrom="favorite"></FoldersListScreen>
    ),
    FolderList: FoldersListScreen,
  },
  {
    defaultNavigationOptions: {
      headerBackTitleVisible: false,
    },
  }
);

const FriendsNavigator = createStackNavigator(
  {
    FriendsList: FriendsListScreen,
    Invite: AddFriendScreen,
  },
  {
    defaultNavigationOptions: {
      headerBackTitleVisible: false,
      headerBackAllowFontScaling: true,
    },
  }
);

const SettingsNavigator = createStackNavigator(
  {
    SettingsMain: { screen: SettingsMainScreen },
  },
  {
    defaultNavigationOptions: {
      headerBackTitleVisible: false,
    },
  }
);

const tabscreenConfig = {
  Home: {
    screen: ItemNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <MaterialIcons name="home" size={26} color={colors.blackIconColor} />
        );
      },
    },
  },
  Favorites: {
    screen: FavoriteNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <AntDesign name="star" size={26} color={colors.blackIconColor} />
        );
      },
    },
  },
  Friends: {
    screen: FriendsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <AntDesign name="adduser" size={26} color={colors.blackIconColor} />
        );
      },
    },
  },
  Settings: {
    screen: SettingsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <MaterialIcons
            name="settings"
            size={26}
            color={colors.blackIconColor}
          />
        );
      },
    },
  },
};

const BottomTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabscreenConfig, {
        activeColor: colors.fontDefColor,
        shifting: true,
        barStyle: {
          backgroundColor: colors.backgroundColor,
        },
      })
    : createBottomTabNavigator(tabscreenConfig, {
        tabBarOptions: {
          //activeTintColor: colors.fontDefColor,
          inactiveTintColor: colors.fontDefColor,
          //activeBackgroundColor: "#BCBBBB",
          //activeColor: "red",
          //inactiveBackgroundColor: colors.primaryColor,
        },
      });

const AuthNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Registration: { screen: SignupScreenWrapper },
    SignupSuccess: { screen: SignupSuccessScreen },
    Policy: { screen: PolicyScreen },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      // headerTitle: null,
    },
  }
);

const MainFolderNavigator = createDrawerNavigator(
  {
    TabNav: BottomTabNavigator,
    Favorites: FavoriteNavigator,
    Settings: SettingsNavigator,
  },
  {
    // initialRouteName: "Auth",
    // unmountInactiveRoutes: true,
    //headerMode: "none",
    contentComponent: (props) => <Sidebar {...props} />,
  }
);

const ApplicationNavigator = createStackNavigator(
  {
    Startup: { screen: StartupScreen },
    Auth: AuthNavigator,
    AppNav: MainFolderNavigator,
  },
  {
    headerMode: "none",
  }
);

export default createAppContainer(ApplicationNavigator);
