import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Button, Alert, Slider } from "react-native";
import { FlatList } from "react-native";
import FolderItemGrid from "../components/FolderItemGrid";
import colors from "../constants/colors";
import * as itemActions from "../store/actions/folderItemsAction";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
// import { AdMobInterstitial } from "expo-ads-admob";
import constantkeys from "../constants/constantkeys";
import { toggleFavorite, loadAds } from "../store/actions/folders";
import CustomModal from "../components/CustomModal";
import InProgress from "../components/InProgress";
import DefaultText from "../components/DefaultText";

const FolderItemsScreen = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState(false);
  const [userFromCache, setuserFromCache] = useState();
  const [selectedItem, setselectedItem] = useState(null);
  const [NewRetention, setNewRetention] = useState({ newValue: 2 });

  var selectedFolderItems = [];
  const selectedFolderName = props.navigation.getParam("folderName");
  const dispatch = useDispatch();
  var isfav = false;

  var adsCount = useSelector((state) => {
    return state.folder.adsCount == undefined
      ? 0
      : parseInt(state.folder.adsCount);
  });

  const toggleFavHandler = useCallback(() => {
    dispatch(toggleFavorite(selectedFolderName));
    isfav = isfav == true ? false : true;
    props.navigation.setParams({ isFavFolder: isfav });
    //console.log(isfav);
  }, [dispatch]);

  const loadAdsHandler = useCallback(() => {
    dispatch(loadAds(adsCount));
  }, [dispatch, adsCount]);

  selectedFolderItems = useSelector((state) => {
    if (state.folderItems.result != undefined) {
      if (state.folderItems.result.itemsContainer != undefined) {
        var isfavoriteItem = state.folder.favoriteFolders.some(
          (m) => m.favFolderName === selectedFolderName
        );

        if (isfavoriteItem) {
          isfav = true;
        }

        return state.folderItems.result.itemsContainer.items;
      }
    }
    return [];
  });

  const fetchItemsByFolderName = useCallback(async () => {
    setError(null);
    try {
      await dispatch(itemActions.getItemsByFolder(selectedFolderName));
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }, [dispatch, extendRetention]);

  useEffect(() => {
    setisLoading(true);

    // var showAd = async () => {
    //   await AdMobInterstitial.setAdUnitID(
    //     constantkeys.interstatialAdCompId_video
    //   ).catch((e) => {});

    //   await AdMobInterstitial.requestAdAsync({
    //     servePersonalizedAds: true,
    //   }).catch((e) => {});
    // };

    // showAd();

    fetchItemsByFolderName().then(() => {
      setisLoading(false);
    });
    return function cleanup() {
      //AdMobInterstitial.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    props.navigation.setParams({
      refresh: refreshscreen,
    });
    props.navigation.setParams({ handleToggle: toggleFavHandler });
    props.navigation.setParams({ isFavFolder: isfav });
  }, [toggleFavHandler, isfav]);

  const refreshscreen = useCallback(async () => {
    try {
      setisLoading(true);
      setisRefreshing(true);
      await fetchItemsByFolderName();
      setisLoading(false);
      setisRefreshing(false);
    } catch (error) {
      //log later
      setisLoading(false);
      setisRefreshing(false);
    }
  }, [dispatch, setisLoading, fetchItemsByFolderName]);

  const outsideClick = () => {
    setselectedItem(null);
    setNewRetention({ newValue: 2 });
    setShowModal(!showModal);
  };

  const handleItemSelected = (item) => {
    setselectedItem(item);
  };

  const extendRetention = async () => {
    setError(null);
    try {
      if (
        selectedItem != null &&
        selectedItem.key != null &&
        NewRetention != null &&
        NewRetention.newValue != null
      ) {
        dispatch(
          itemActions.extendRetention(selectedItem.key, NewRetention.newValue)
        );
        setShowModal(!showModal);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const showExtendStorageModal = (selectedItem) => {
    setselectedItem(selectedItem);
    if (selectedItem.expiry != null) {
      setNewRetention({ newValue: parseInt(selectedItem.expiry) });
    }
    setShowModal(!showModal);
  };

  const renderfolderItem = (itemData) => {
    // console.log("itemData", itemData);
    return (
      <FolderItemGrid
        folderName={itemData.item.folderName}
        from={itemData.item.from}
        fromid={itemData.item.fromid}
        to={itemData.item.to}
        receivedDate={itemData.item.receivedDate}
        subject={itemData.item.subject}
        snippet={itemData.item.snippetString}
        expiry={itemData.item.expiry}
        ttlDeleteAt={itemData.item.ttlDeleteAt}
        hasattachment={itemData.item.attachmentItems.length}
        onSwipeFromLeft={() => {}}
        onRightPress={() => showExtendStorageModal(itemData.item)}
        onSelect={() => {
          handleItemSelected(itemData.item);
          props.navigation.navigate({
            routeName: "ItemDetail",
            params: {
              folderId: itemData.item.id.toString(),
              folderName: itemData.item.folderName,
              signedUrl: itemData.item.signedUrl,
              attachments: itemData.item.attachmentItems,
              from: itemData.item.from,
              to: itemData.item.to,
              fromid: itemData.item.fromid,
              messagekey: itemData.item.messagekey,
            },
          });
        }}
      ></FolderItemGrid>
    );
  };

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

  //console.log("adsCount", adsCount);

  if (isLoading) {
    // var rannum = Math.floor(Math.random() * 100);
    // var showAds = async () => {
    //   await AdMobInterstitial.showAdAsync().catch((e) => {
    //     //console.log(e);
    //   });

    //   loadAdsHandler();
    // };

    // //show only three times
    // if (adsCount < 10 && rannum % 2 == 0) {
    //   showAds();
    // }

    return <InProgress />;
  }

  if (!isLoading && !isRefreshing && selectedFolderItems.length === 0) {
    return (
      <View style={styles.centered}>
        <DefaultText>No records found</DefaultText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedFolderItems}
        renderItem={renderfolderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        refreshing={isRefreshing}
        onRefresh={refreshscreen}
      ></FlatList>

      <CustomModal
        visible={showModal}
        onRequestClose={() => {
          outsideClick();
        }}
        outsideClick={() => outsideClick()}
        onSave={() => {
          extendRetention();
        }}
        onCancel={() => {
          outsideClick();
        }}
        title="Extend storage"
      >
        <View style={styles.modelroot}>
          <View style={styles.modelcontainer}>
            {selectedItem != null ? (
              <View>
                <View style={styles.textrow}>
                  <Text
                    style={{ paddingRight: 4, fontSize: 18, fontWeight: "600" }}
                  >
                    Sub:
                  </Text>

                  <Text
                    style={{ paddingRight: 4, fontSize: 18, fontWeight: "600" }}
                  >
                    {selectedItem.subject}
                  </Text>
                </View>
                <View style={{ paddingTop: 4 }}>
                  <Text
                    style={{ paddingRight: 4, fontSize: 16, fontWeight: "600" }}
                  >
                    from {selectedItem.from}
                  </Text>
                </View>
                <View style={{ paddingTop: 30 }}>
                  <DefaultText>
                    Keep this message for {NewRetention.newValue} more days
                  </DefaultText>
                </View>

                <View style={{ paddingTop: 30 }}>
                  <Slider
                    style={{ width: 300 }}
                    step={10}
                    minimumValue={10}
                    maximumValue={50}
                    value={NewRetention.newValue}
                    onValueChange={(val) => setNewRetention({ newValue: val })}
                  />
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

FolderItemsScreen.navigationOptions = (navdata) => {
  const title = navdata.navigation.getParam("folderName");
  const fnrefresh = navdata.navigation.getParam("refresh");
  const fnToggleFav = navdata.navigation.getParam("handleToggle");
  const isfavfolder = navdata.navigation.getParam("isFavFolder");
  const faviconName = isfavfolder === true ? "ios-star" : "ios-star-outline";
  return {
    headerTitle: title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          icontype="ionic"
          title="Favorite"
          iconName={faviconName}
          onPress={fnToggleFav}
        ></Item>

        <Item
          icontype="material"
          title="refresh"
          iconName="refresh"
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
  modelroot: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 0,
  },
  modelcontainer: {
    borderWidth: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  textrow: {
    flexDirection: "row",
  },
});

// const FolderItemsScreenWrapper = (props) => {
//   return (
//     <Provider store={store}>
//       <FolderItemsScreen navigation={props.navigation} />
//     </Provider>
//   );
// };

export default FolderItemsScreen;
