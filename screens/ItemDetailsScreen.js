import WebView from "react-native-webview";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import colors from "../constants/colors";
import * as itemActions from "../store/actions/folderItemsAction";
import { useSelector, useDispatch } from "react-redux";
import DefaultText from "../components/DefaultText";
import FormInput from "../components/FormInput";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import CustomModal from "../components/CustomModal";
import { FontAwesome } from "@expo/vector-icons";

const ItemDetailsScreen = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [error, setError] = useState();
  const [userFromCache, setuserFromCache] = useState();
  const [showOverlay, setshowOverlay] = useState(false);
  const [fromAddress, setFromAddress] = useState();
  const [destinationFolderRule, setDestinationFolderRule] = useState();
  const [showWebView, setshowWebView] = useState(false);
  const attachments = props.navigation.getParam("attachments");
  const signedUrl = props.navigation.getParam("signedUrl");
  const from = props.navigation.getParam("from");
  const fromid = props.navigation.getParam("fromid");
  const messagekey = props.navigation.getParam("messagekey");

  var to = props.navigation.getParam("to");
  if (to != null) {
    to = to.replace(".html", "");
  }
  var selectedFoldername = props.navigation.getParam("folderName");
  const dispatch = useDispatch();

  const displayOverlay = useCallback(() => {
    setFromAddress(fromid);
    setshowOverlay(true);
  }, [dispatch, selectedFoldername]);

  const selectedAttachments = useSelector((state) => {
    if (state.itemDetails.attachmentLinks.items != undefined) {
      // console.log(state.itemDetails.attachmentLinks.items);
      return state.itemDetails.attachmentLinks.items;
    }
    return [];
  });

  const fetchItemsByFolderName = useCallback(async () => {
    setError(null);
    // console.log(messagekey);
    try {
      if (attachments != null && attachments.length > 0) {
        var promises = [];
        await dispatch(itemActions.getAttachmentLinks(attachments));
      } else {
        //reset attachments collection
        await dispatch(itemActions.getAttachmentLinks(null));
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setisRefreshing(false);
  }, [dispatch, setisLoading, setError]);

  const forwardToFriends = useCallback(() => {
    const messagekey = props.navigation.getParam("messagekey");
    // console.log("messageKeyToFriendsList", messagekey);
    props.navigation.navigate({
      routeName: "FriendsList",
      params: {
        messagekey: messagekey,
        title: "Share",
        addSaveButton: true,
      },
    });
  }, [messagekey]);

  useEffect(() => {
    setisLoading(true);
    setisRefreshing(true);
    fetchItemsByFolderName().then(() => {
      setisLoading(false);
    });

    return function cleanup() {
      //AdMobInterstitial.removeAllListeners();
    };
  }, [dispatch, fetchItemsByFolderName]);

  useEffect(() => {
    setshowOverlay(false);
    props.navigation.setParams({ handleOverlay: displayOverlay });
    props.navigation.setParams({ handleforwardToFriends: forwardToFriends });
  }, [displayOverlay, forwardToFriends]);

  const createMoveToFolderRule = () => {
    try {
      if (destinationFolderRule == null) {
        Alert.alert("Invalid folder name");
        return;
      }
      if (destinationFolderRule) {
        if (destinationFolderRule.trim().length > 0) {
          let action;
          action = itemActions.setFolderMove(
            fromAddress,
            destinationFolderRule
          );
          dispatch(action);
          setDestinationFolderRule(null);
          setshowOverlay(false);
          return;
        }
      }
    } catch (error) {
      console.log("Myerror", JSON.stringify(error));
      return;
    }
  };

  const handleWebViewNavigationStateChange = (event) => {
    //console.log(event);
    if (event.loading) {
      setshowWebView(false);
    } else {
      setshowWebView(true);
    }
  };

  const getAttachmentItemView = (itemData) => {
    if (error) {
      return (
        <View style={styles.centered}>
          <DefaultText>An error occurred!</DefaultText>
          <Button
            title="Try again"
            onPress={fetchItemsByFolderName}
            color={colors.primaryColor}
          ></Button>
        </View>
      );
    }

    if (!isLoading && selectedAttachments.length === 0) {
      return (
        <View style={styles.centered}>
          <DefaultText>No records found</DefaultText>
        </View>
      );
    }

    //console.log("item", itemData);

    return (
      <View style={styles.attcontaineritem}>
        <Text
          style={{ color: "blue" }}
          onPress={() => Linking.openURL(itemData.item.signedUrl)}
        >
          <MaterialCommunityIcons
            name="file-document"
            size={28}
            color="black"
          />
        </Text>
        <Text style={{ fontSize: 11 }}>
          {itemData.item.folderName.substring(0, 10)}
        </Text>
      </View>
    );
  };

  let attsectionheader;
  if (isLoading) {
    attsectionheader = (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color={colors.primaryColor}
        ></ActivityIndicator>
      </View>
    );
  } else {
    attsectionheader = (
      <FlatList
        data={selectedAttachments}
        renderItem={getAttachmentItemView}
        keyExtractor={(item, index) => index.toString()}
        numColumns={5}
      ></FlatList>
    );
  }

  const outsideClick = () => {
    setshowOverlay(!showOverlay);
  };

  return (
    <View style={styles.container}>
      <CustomModal
        visible={showOverlay}
        onRequestClose={() => {
          outsideClick();
        }}
        outsideClick={() => outsideClick()}
        onSave={createMoveToFolderRule}
        onCancel={() => {
          outsideClick();
        }}
        title="Create Rule"
      >
        <View>
          <View style={{ paddingTop: 20 }}>
            <DefaultText>
              When received emails from {fromAddress} going forward, move to a
              different folder
            </DefaultText>
          </View>
          <View style={styles.input}>
            <View style={{ padding: 10 }}>
              <FontAwesome name="folder" size={30} color={colors.iconColor} />
            </View>

            <FormInput
              name="destinationFolder"
              value={destinationFolderRule}
              placeholder="Folder Name"
              autoCapitalize="none"
              onChangeText={(text) => setDestinationFolderRule(text)}
              iconName="md-person"
              iconColor="#2C384A"
              itemStyle={styles.modalinput}
            />
          </View>
        </View>
      </CustomModal>

      {/* <Overlay
        //fullScreen={false}
        isVisible={showOverlay}
        onBackdropPress={() => setshowOverlay(false)}
        overlayBackgroundColor="white"
        containerStyle={styles.overlay}
      ></Overlay> */}

      <View style={styles.headerbar}>
        <View style={styles.addressbarcontainer}>
          <View>
            <DefaultText size={15}>{from}</DefaultText>
            <Text style={styles.textheaderbar}>To: {to}</Text>
          </View>
        </View>
      </View>
      {!isLoading && selectedAttachments.length > 0 ? (
        <View style={styles.attachmentcontainer}>{attsectionheader}</View>
      ) : (
        <View></View>
      )}
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "flex-start",
          flexDirection: "column",
          paddingRight: 10,
        }}
      >
        <WebView
          source={{ uri: signedUrl }}
          originWhitelist={["https://*", "http://*"]}
          contentInset={{ bottom: "never", vertical: "never" }}
          onError={(e) => {
            // console.log(e);
          }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          containerStyle={{
            flex: 1,
            borderWidth: 0,
          }}
          startInLoadingState={true}
          allowFileAccessFromFileURLs={false}
          automaticallyAdjustContentInsets={true}
          allowFileAccess={false}
          useWebKit={false}
          scalesPageToFit={true}
          injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('name', 'viewport'); meta.setAttribute('content', 'width=200, initial-scale=0.60, maximum-scale=0.60, user-scalable=2.0'); document.getElementsByTagName('head')[0].appendChild(meta); `}
          style={{
            opacity: 0.99,
            overflow: "hidden",
            flex: 1,
          }}
        />
        {/* 
        {!showWebView && (
          <ActivityIndicator
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
            }}
            size="large"
          />
        )} */}
      </View>
    </View>
  );
};

ItemDetailsScreen.navigationOptions = (navdata) => {
  const title = navdata.navigation.getParam("folderName");
  const fromAddress = navdata.navigation.getParam("from");
  const fnHandleOverlay = navdata.navigation.getParam("handleOverlay");
  const fnforward = navdata.navigation.getParam("handleforwardToFriends");
  return {
    headerTitle: title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          icontype="material"
          iconName="folder-shared"
          onPress={() => {
            fnHandleOverlay(fromAddress);
          }}
        ></Item>
        <Item
          icontype="MaterialCommunityIcons"
          iconName="forwardburger"
          onPress={fnforward}
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
  container: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 10,
    borderWidth: 0,
  },
  headerbar: {
    borderWidth: 0,
    flexDirection: "row",
  },
  addressbarcontainer: {
    //backgroundColor: "lightgray",
    flex: 1,
    //borderWidth: 0.25,
    borderBottomWidth: 0.25,
    borderBottomColor: "lightgray",
    flexDirection: "row",
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  textheaderbar: {
    fontSize: 12,
  },
  attachmentcontainer: {
    //borderWidth: 0.25,
  },
  attcontaineritem: {
    padding: 12,
  },
  overlaycontent: {
    padding: 15,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    opacity: 1,
  },
  overlaycontentInner: {
    padding: 15,
  },
  input: {
    paddingTop: 15,
    borderWidth: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  modalView: {
    elevation: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 40,
    elevation: 2,
    opacity: 1,
    backgroundColor: "#00000080",
    borderWidth: 1,
  },
  closeButton: {
    //backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalinput: {
    borderWidth: 0,
    height: 30,
    borderBottomWidth: 1,
    width: "80%",
  },
});

export default ItemDetailsScreen;
