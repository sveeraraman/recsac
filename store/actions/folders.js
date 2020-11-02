import { API } from "aws-amplify";
import * as services from "../actions/service";
import Folder from "../../models/Folder";
import { AsyncStorage } from "react-native";

const GET_FOLDERS_LIST_BEGIN = "GET_FOLDERS_LIST_BEGIN";
const GET_FOLDERS_LIST_SUCCESS = "GET_FOLDERS_LIST_SUCCESS";
const GET_FOLDERS_LIST_FAILED = "GET_FOLDERS_LIST_FAILED";
const TOGGLE_FAV = "TOGGLE_FAV";
const LOAD_TOGGLE_FAV = "LOAD_TOGGLE_FAV";
const LOAD_ADS_COUNT = "LOAD_ADS_COUNT";

const getFoldersPath = "/folders/all";

const toggleFavorite = (_folderName) => {
  return {
    type: TOGGLE_FAV,
    folderName: _folderName,
  };
};

const loadAds = (_adsCount) => {
  return async (dispatch) => {
    _adsCount = _adsCount == undefined ? 0 : parseInt(_adsCount) + 1;
    //console.log("_adsCount", _adsCount);
    dispatch({
      type: LOAD_ADS_COUNT,
      adsCount: _adsCount,
    });
  };
};

const loadFavorites = () => {
  return async (dispatch, getState) => {
    var favFoldersListFromCache = await services.getfavDataFromCache();
    //console.log("favFoldersListFromCache", favFoldersListFromCache);
    dispatch({
      type: LOAD_TOGGLE_FAV,
      favFoldersList: favFoldersListFromCache,
    });
  };
};

const getFolders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(getFoldersStarted());
      var username;
      var parseduserData = await services.getUserDataFromCache();

      username = parseduserData.userid;

      var response = await services.postData(
        {
          customerName: username,
        },
        getFoldersPath
      );

      //console.log("getFolders_response", response);

      var foldersListContainer = {
        items: [],
      };

      if (response != null && response.statusCode == "200") {
        foldersListContainer.name = response.body.Name;
        foldersListContainer.isTruncated = response.body.IsTruncated;
        foldersListContainer.contents = response.body.contents;
        response.body.CommonPrefixes.forEach((folder) => {
          foldersListContainer.items.push(
            new Folder(
              folder.id,
              folder.Prefix.endsWith("/")
                ? folder.Prefix.substring(0, folder.Prefix.length - 1)
                : folder.Prefix,
              folder.expiry,
              folder.itemsCount,
              folder.signedUrl
            )
          );
        });
      } else {
        if (response && response.statusCode == "400") {
          //return error
          throw new Error("Something went wrong in getFolders");
        }
      }

      dispatch(getFoldersSuccess(foldersListContainer));
    } catch (error) {
      // dispatch(getFoldersFailure(error));
      throw error;
    }
  };
};

const getFoldersStarted = () => ({
  type: GET_FOLDERS_LIST_BEGIN,
});

const getFoldersSuccess = (foldersListContainer) => ({
  type: GET_FOLDERS_LIST_SUCCESS,
  folder: {
    foldersListContainer,
  },
});

const getFoldersFailure = (error) => ({
  type: GET_FOLDERS_LIST_FAILED,
  folder: {
    error,
  },
});

export {
  GET_FOLDERS_LIST_BEGIN,
  GET_FOLDERS_LIST_SUCCESS,
  GET_FOLDERS_LIST_FAILED,
  TOGGLE_FAV,
  LOAD_TOGGLE_FAV,
  LOAD_ADS_COUNT,
};
export { getFolders, toggleFavorite, loadFavorites, loadAds };
