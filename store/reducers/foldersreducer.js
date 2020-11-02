import {
  GET_FOLDERS_LIST_BEGIN,
  GET_FOLDERS_LIST_SUCCESS,
  GET_FOLDERS_LIST_FAILED,
  TOGGLE_FAV,
  LOAD_TOGGLE_FAV,
  LOAD_ADS_COUNT,
} from "../actions/folders";

import { writeFavToCache } from "../actions/service";
import { getfavDataFromCache } from "../actions/service";

const initialState = {
  loading: false,
  foldersListContainer: null,
  error: null,
  favoriteFolders: [],
};

export default function foldersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOLDERS_LIST_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      //console.log("begin");
      return {
        ...state,
        loading: true,
        error: null,
        foldersListContainer: null,
      };
    case GET_FOLDERS_LIST_SUCCESS:
      // console.log("reached here");
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        error: null,
        foldersListContainer: action.folder.foldersListContainer,
      };
    case GET_FOLDERS_LIST_FAILED:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: action.folder.error,
        foldersListContainer: null,
      };
    case TOGGLE_FAV:
      var updstate;
      const existingIndex = state.favoriteFolders.findIndex((f) => {
        return f.favFolderName === action.folderName;
      });
      if (existingIndex >= 0) {
        var updatedFolderList = [...state.favoriteFolders];
        updatedFolderList.splice(existingIndex, 1);
        updstate = { ...state, favoriteFolders: updatedFolderList };
      } else {
        var updstate = {
          ...state,
          favoriteFolders: state.favoriteFolders.concat({
            favFolderName: action.folderName,
          }),
        };
      }
      // console.log("updstate", updstate.favoriteFolders);
      writeFavToCache(updstate.favoriteFolders);
      return updstate;
    case LOAD_TOGGLE_FAV:
      var favStatesFromCache = action.favFoldersList;
      // console.log("favStatesFromCache", favStatesFromCache);
      if (favStatesFromCache == null) {
        favStatesFromCache = [];
      }
      return {
        ...state,
        loading: false,
        favoriteFolders: favStatesFromCache,
      };
    case LOAD_ADS_COUNT:
      var adsCount = action.adsCount;
      return {
        ...state,
        loading: false,
        adsCount: adsCount,
      };
    default:
      return state;
  }
}
