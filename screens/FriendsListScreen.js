import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import colors from "../constants/colors";
import * as action from "../store/actions/friends";
import { View, Text, StyleSheet, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AdMobBanner } from "expo-ads-admob";
import constantkeys, { DOMAIN_NAME_PLAIN } from "../constants/constantkeys";
import { FontAwesome5 } from "@expo/vector-icons";
import { RadioButton, TextInput } from "react-native-paper";
import InProgress from "../components/InProgress";
import CustomModal from "../components/CustomModal";
import FormInput from "../components/FormInput";
import { FontAwesome } from "@expo/vector-icons";
import DefaultText from "../components/DefaultText";

const FriendsListScreen = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [error, setError] = useState();
  const [username, setusername] = useState();
  const [contacts, setcontacts] = useState([]);
  const [isFromForward, setisFromForward] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modaltitle, setmodaltitle] = useState("");
  const [idToAdd, setidToAdd] = useState("");
  var isAddSaveButtonInParam = props.navigation.getParam("addSaveButton");
  var friendsList = [];
  var inviteFriendsList = [];
  const messagekey = props.navigation.getParam("messagekey");

  const dispatch = useDispatch();

  friendsList = useSelector((state) => {
    if (state.friends != undefined) {
      return state.friends.friendsList;
    }
    return [];
  });

  const fetchFriendList = useCallback(async () => {
    setError(null);
    setisLoading(true);
    try {
      await dispatch(action.getFriendsList());
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setisLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (isAddSaveButtonInParam) {
      setisFromForward(true);
    }
    setmodaltitle("Add friends from " + DOMAIN_NAME_PLAIN);
    props.navigation.setParams({ addFriend: addFriendFn });
    props.navigation.setParams({ addFriendFromApp: addFriendFromAppHandler });
    props.navigation.setParams({ forwardToFriends: forwardToFriendsFn });
    props.navigation.setParams({ refreshList: fetchFriendList });
    props.navigation.setParams({ selectedCount: contacts.length });
    return function cleanup() {};
  }, [
    addFriendFn,
    forwardToFriendsFn,
    contacts,
    fetchFriendList,
    addFriendFromAppHandler,
  ]);

  useEffect(() => {
    setisLoading(true);
    fetchFriendList().then(() => {
      setisLoading(false);
    });
  }, [dispatch, fetchFriendList]);

  const forwardToFriendsFn = useCallback(async () => {
    //console.log("messagekeyfriendsList", messagekey);
    dispatch(action.shareWithFriends(messagekey, contacts));
    props.navigation.goBack();
  }, [messagekey, contacts]);

  const handleFriendAddFromAppChange = (value) => {
    setidToAdd(value);
  };

  const addFriendFromAppHandler = useCallback(async () => {
    setShowModal(!showModal);
  });

  const outsideClick = () => {
    setShowModal(!showModal);
  };

  const addFriendFn = useCallback(async () => {
    props.navigation.navigate({
      routeName: "Invite",
      params: {
        inviteFriendsList: inviteFriendsList,
      },
    });
  });

  const addFriendFromApp = async () => {
    setError(null);
    try {
      //console.log(idToAdd);
      setShowModal(!showModal);
      setidToAdd("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const bannerError = () => {
    return (
      <View>
        <DefaultText>Error</DefaultText>
      </View>
    );
  };

  const setChecked = (_email, _phone) => {
    var tempcontacts = [...contacts];
    //if already exists in collection, it means it was checked earlier.
    var objIndex = tempcontacts.findIndex((m) => m.email == _email);
    if (objIndex >= 0) {
      tempcontacts.splice(objIndex, 1);
    } else {
      tempcontacts.push({ email: _email, value: "checked", phone: _phone });
    }
    setcontacts(tempcontacts);
    //console.log("contacts", contacts);
  };

  const isChecked = (_email, _phone) => {
    var filteredContact = contacts.filter((m) => m.email == _email);
    var selStatus = "unchecked";
    if (filteredContact != null) {
      filteredContact = filteredContact[0];
      if (filteredContact) {
        var selStatus =
          filteredContact.value == "checked" ? "checked" : "unchecked";
      }
    }
    return selStatus;
  };

  const renderFriendGridItem = (itemData) => {
    var _itemcolor =
      itemData.item.account_status == "Pending Registration"
        ? "#EA4335"
        : "#34A853";
    var disabled_status =
      itemData.item.account_status == "Available" ? "" : "disabled";
    // console.log(disabled_status);

    return (
      <View style={styles.listrow}>
        <View style={styles.icon}>
          <FontAwesome5 name="user" size={24} color="black" />
        </View>
        <View style={styles.listrowitem}>
          <View>
            <Text style={styles.listText}>{itemData.item.name}</Text>
            <Text style={styles.listTextsub}>{itemData.item.email}</Text>
            {itemData.item.phone != null ? (
              <Text style={styles.listTextsub}>{itemData.item.phone}</Text>
            ) : (
              <View></View>
            )}
            <Text style={{ ...styles.listTextsub_status, color: _itemcolor }}>
              {itemData.item.account_status}
            </Text>
          </View>

          <View style={styles.radio}>
            {isFromForward ? (
              <RadioButton.Android
                value={itemData.item.email}
                status={isChecked(itemData.item.email, itemData.item.phone)}
                onPress={() =>
                  setChecked(itemData.item.email, itemData.item.phone)
                }
                //uncheckedColor="#dddddd"
                disabled={disabled_status}
              />
            ) : (
              <View />
            )}
          </View>
        </View>
      </View>
    );
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <DefaultText>An error occurred!</DefaultText>
        <Button
          title="Try again"
          onPress={fetchFriendList}
          color={colors.primaryColor}
        ></Button>
      </View>
    );
  }
  if (isLoading) {
    return <InProgress />;
  }
  if (!isLoading && friendsList.length === 0) {
    return (
      <View style={styles.centered}>
        <DefaultText>No records found</DefaultText>
      </View>
    );
  }
  return (
    <View style={styles.listadcontainer}>
      <View style={styles.flatlistitem}>
        <FlatList
          onRefresh={fetchFriendList}
          refreshing={isRefreshing}
          data={friendsList}
          renderItem={renderFriendGridItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
        ></FlatList>
      </View>

      {/* <View style={styles.bannerad}>
        <AdMobBanner
          style={styles.bottomBanner}
          bannerSize="fullBanner"
          adUnitID={constantkeys.bannerAddCompId_1}
          didFailToReceiveAdWithError={bannerError}
        />
      </View> */}

      <CustomModal
        visible={showModal}
        onRequestClose={() => {
          outsideClick();
        }}
        outsideClick={() => outsideClick()}
        onSave={() => {
          addFriendFromApp();
        }}
        onCancel={() => {
          outsideClick();
        }}
        title={modaltitle}
      >
        <View style={styles.modalinput}>
          <View style={{ padding: 10 }}>
            <FontAwesome name="user" size={30} color={colors.iconColor} />
          </View>
          <View style={{ paddingTop: 10, width: "100%" }}>
            <FormInput
              name="friendsid"
              value={idToAdd}
              placeholder="Enter your friend's id to add"
              autoCapitalize="none"
              onChangeText={(text) => handleFriendAddFromAppChange(text)}
              iconName="md-person"
              iconColor="#2C384A"
              itemStyle={styles.input}
            />
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

FriendsListScreen.navigationOptions = (navdata) => {
  const addFriend = navdata.navigation.getParam("addFriend");
  var title = navdata.navigation.getParam("title");
  var addSaveButton = navdata.navigation.getParam("addSaveButton");
  var fwdToFriends = navdata.navigation.getParam("forwardToFriends");
  var selectedCount = navdata.navigation.getParam("selectedCount");
  var fnrefresh = navdata.navigation.getParam("refreshList");
  var addFriendFromApp = navdata.navigation.getParam("addFriendFromApp");

  var checkdisabled = true;
  var btnstyle = {
    color: "#918F90",
  };

  if (selectedCount != undefined && selectedCount > 0) {
    checkdisabled = false;
    //console.log(selectedCount);
    btnstyle = {
      color: "black",
    };
  }

  if (!title) {
    title = "Friends";
  }
  var controls;

  if (addSaveButton) {
    controls = (
      <View style={{ flexDirection: "row", flex: 1 }}>
        <Item
          icontype="ionic"
          title="add"
          onPress={addFriend}
          iconName="md-add"
        ></Item>
        <Item
          icontype="feather"
          title="check"
          onPress={fwdToFriends}
          iconName="check"
          disabled={checkdisabled}
          buttonStyle={btnstyle}
        ></Item>
      </View>
    );
  } else {
    controls = (
      <View style={{ flexDirection: "row", flex: 1 }}>
        <Item
          icontype="ionic"
          title="add"
          onPress={addFriend}
          iconName="md-add"
        ></Item>
        <Item
          icontype="AntDesign"
          title="add"
          onPress={addFriendFromApp}
          iconName="adduser"
        ></Item>
      </View>
    );
  }
  return {
    headerTitle: title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        {controls}
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          icontype="AntDesign"
          title="add"
          onPress={() => {
            navdata.navigation.navigate("Home");
          }}
          iconName="arrowleft"
        ></Item>
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
    //backgroundColor: colors.secondaryColor,
    //borderWidth: 0.25,
    //borderColor: colors.borderwidth,
  },
  bannerError: {
    position: "absolute",
    bottom: 0,
  },
  listadcontainer: {
    flex: 1,
    flexDirection: "column",
    borderWidth: 0,
  },
  listrow: {
    flex: 1,
    borderWidth: 0,
    flexDirection: "row",
    marginTop: 2,
    paddingLeft: 20,
    paddingTop: 5,
    backgroundColor: "#FFFFFF",
  },
  listrowitem: {
    borderWidth: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    justifyContent: "flex-start",
  },
  radio: {
    alignItems: "flex-end",
    flex: 2,
    justifyContent: "flex-end",
    paddingRight: 15,
  },
  listText: {
    fontSize: 15,
  },
  listTextsub: {
    fontSize: 12,
    paddingTop: 2,
    paddingBottom: 2,
  },
  flatlistitem: {
    borderWidth: 0,
    flex: 1,
  },
  bannerad: {
    borderWidth: 0,
    //flex: 1,
    // borderColor: "blue",
    // height: 100,
  },
  icon: {
    paddingRight: 20,
  },
  listTextsub_status: {
    fontSize: 12,
    paddingTop: 2,
    paddingBottom: 2,
  },
  modalinput: {
    borderWidth: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  input: {
    borderWidth: 0,
    height: 30,
    borderBottomWidth: 0.25,
    width: "80%",
  },
});
export default FriendsListScreen;
