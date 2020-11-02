import { combineReducers } from "redux";
import profileReducer from "./profilereducer";
import foldersReducer from "./foldersreducer";
import folderItemsReducer from "./folderItemsreducer";
import itemDetailsReducer from "./itemDetailsReducer";
import authReducer from "./authReducer";
import friendsReducer from "./friendsReducer";
// import { reducer as formReducer } from "redux-form";

const rootreducerCombined = combineReducers({
  profile: profileReducer,
  folder: foldersReducer,
  folderItems: folderItemsReducer,
  itemDetails: itemDetailsReducer,
  auth: authReducer,
  friends: friendsReducer,
});

export default rootreducerCombined;
