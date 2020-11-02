import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import FolderListGrid from "../components/FolderListGrid";
import CustomHeaderButton from "../components/CustomHeaderButton";
import colors from "../constants/colors";
import * as itemActions from "../store/actions/folders";
import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";
import constantkeys from "../constants/constantkeys";
import InProgress from "../components/InProgress";
import DefaultText from "../components/DefaultText";
import * as cons from "../constants/constantkeys";
import { getUserDataFromCache } from "../store/actions/service";

const FoldersListScreen = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [error, setError] = useState();
  const [username, setusername] = useState();
  const dispatch = useDispatch();
  const [useremail, setuseremail] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [fullname, setfullname] = useState();
  var domainname = cons.DOMAIN_NAME_PLAIN;
  var dom_email = cons.DOMAIN_NAME_WITH_AT;

  var FilteredFolders = [];

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

  FilteredFolders = useCallback(
    useSelector((state) => {
      //console.log(state);
      if (state.folder.foldersListContainer != undefined) {
        if (props.clickFrom != undefined && props.clickFrom == "favorite") {
          var favoriteFiltered = state.folder.foldersListContainer.items.filter(
            (f) => {
              return state.folder.favoriteFolders
                .map((m) => {
                  return m.favFolderName;
                })
                .includes(f.folderName);
            }
          );
          return favoriteFiltered;
        } else {
          return state.folder.foldersListContainer.items;
        }
      }
      return [];
    })
  );

  // const getLoggedUserName = async () => {
  //   var parseduserData = await getUserDataFromCache();
  //   setusername(parseduserData.username);
  // };

  // useEffect(() => {
  //   getLoggedUserName();
  // }, [getLoggedUserName]);

  const fetchFolders = useCallback(async () => {
    setError(null);
    setisRefreshing(true);
    try {
      //console.log("userFromCache", userFromCache);
      // if (userFromCache !== null) {
      //await dispatch(loadFavorites());
      await dispatch(itemActions.getFolders());
      // }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setisRefreshing(false);
  }, [dispatch]);

  //USE THIS WHEN YOU WANT TO REFRESH THE PAGE ON PAGE LOAD
  // useEffect(() => {
  //   const willFocusSub = props.navigation.addListener(
  //     "willFocus",
  //     fetchFolders
  //   );
  //   return () => {
  //     willFocusSub.remove();
  //   };
  // }, [dispatch, fetchFolders]);

  //console.log("345345");

  // async function componentDidMount() {
  //   // await AdMobInterstitial.setAdUnitID(
  //   //   "ca-app-pub-3940256099942544/1033173712"
  //   // );
  //   console.log("didmount called");
  // }

  // useEffect(() => {

  //   var showAd = async () => {
  //     await AdMobInterstitial.setAdUnitID(
  //       constantkeys.interstatialAdCompId_video
  //     );
  //     //await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
  //   };

  //   showAd();

  //   return function cleanup() {
  //     //AdMobInterstitial.removeAllListeners();
  //   };

  // }, []);

  useEffect(() => {
    props.navigation.setParams({ refresh: refreshscreen });
    return function cleanup() {};
  }, [refreshscreen]);

  useEffect(() => {
    setisLoading(true);
    fetchFolders().then(() => {
      setisLoading(false);
    });
  }, [dispatch, fetchFolders]);

  const refreshscreen = useCallback(async () => {
    setisLoading(true);
    setisRefreshing(true);

    // try {
    //   var showAds = async () => {
    //     await AdMobInterstitial.showAdAsync().catch((e) => {});
    //   };
    //   //console.log("safd");
    //   //showAds();
    // } catch (error) {
    //   console.log(error);
    // }

    await fetchFolders();
    setisLoading(false);
    setisRefreshing(false);
  }, []);

  const folderItemOnselect = async (folderid, signedurl, foldername) => {
    //console.log("2");
    props.navigation.navigate({
      routeName: "FolderItems",
      params: {
        folderId: folderid,
        url: signedurl,
        folderName: foldername,
      },
    });
    // await AdMobInterstitial.setAdUnitID(constantkeys.interstatialAdCompId_1);
    // await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    // await AdMobInterstitial.showAdAsync();
  };

  const bannerError = () => {
    return (
      <View>
        <DefaultText>Error</DefaultText>
      </View>
    );
  };

  bannerAdReceived = () => {
    //console.log("banner ad received");
  };

  const renderGridItem = (itemData) => {
    return (
      <View>
        <FolderListGrid
          title={itemData.item.folderName}
          count={itemData.item.itemscount}
          policy={itemData.item.policy}
          folderId={itemData.item.id}
          onSelect={() =>
            folderItemOnselect(
              itemData.item.id.toString(),
              itemData.item.signedUrl,
              itemData.item.folderName
            )
          }
        ></FolderListGrid>
      </View>
    );
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <DefaultText>An error occurred!</DefaultText>
        <Button
          title="Try again"
          onPress={fetchFolders}
          color={colors.primaryColor}
        ></Button>
      </View>
    );
  }

  if (isLoading) {
    return <InProgress />;
  }

  if (!isLoading && !isRefreshing && FilteredFolders.length === 0) {
    return (
      <View style={styles.centered}>
        <DefaultText itemStyle={{ paddingBottom: 10 }}>
          No records found
        </DefaultText>

        {props.clickFrom != "favorite" ? (
          <View style={styles.centered}>
            <View style={{ paddingLeft: 30, paddingRight: 30 }}>
              <DefaultText itemStyle={{ paddingBottom: 10 }}>
                Start using recsac with your mobile number or user id
              </DefaultText>
            </View>
            <View style={{ padding: 20 }}>
              <DefaultText>Usage:</DefaultText>
            </View>
            <View>
              <DefaultText itemStyle={{ paddingBottom: 5 }}>
                {phonenumber}
                {dom_email}
              </DefaultText>
              <DefaultText itemStyle={{ paddingBottom: 5 }}>
                {username}
                {dom_email}
              </DefaultText>
              <DefaultText itemStyle={{ paddingBottom: 5 }}>
                {phonenumber}.anyFolderName{dom_email}
              </DefaultText>
              <DefaultText itemStyle={{ paddingBottom: 5 }}>
                {username}.anyFolderName{dom_email}
              </DefaultText>
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }

  return (
    <View style={styles.listadcontainer}>
      <View style={styles.flatlistitem}>
        <FlatList
          onRefresh={fetchFolders}
          refreshing={isRefreshing}
          data={FilteredFolders}
          renderItem={renderGridItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          onRefresh={refreshscreen}
        ></FlatList>
      </View>
      {/* <View style={styles.bannerad}>
        <AdMobBanner
          style={styles.bottomBanner}
          bannerSize="fullBanner"
          adUnitID={constantkeys.bannerAddCompId_1}
          onDidFailToReceiveAdWithError={bannerError}
        />
      </View> */}
    </View>
  );
};

FoldersListScreen.navigationOptions = (navdata) => {
  const fnrefresh = navdata.navigation.getParam("refresh");
  return {
    headerTitle: "Folders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          icontype="material"
          title="Menu"
          iconName="menu"
          onPress={() => {
            navdata.navigation.toggleDrawer();
          }}
        ></Item>
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          icontype="material"
          title="refresh"
          iconName="refresh"
          // iconSize={35}
          onPress={fnrefresh}
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
  },
  flatlistitem: {
    borderWidth: 0,
    flex: 1,
    paddingBottom: 20,
  },
  bannerad: {
    borderWidth: 0,
    //flex: 1,
    alignItems: "baseline",
  },
});

export default FoldersListScreen;
