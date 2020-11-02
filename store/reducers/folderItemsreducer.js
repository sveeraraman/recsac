import {
  GET_FOLDERS_ITEMS_LIST_BEGIN,
  GET_FOLDERS_ITEMS_LIST_SUCCESS,
  GET_FOLDERS_ITEMS_LIST_FAILED,
  GET_ATTACHMENT_LINKS,
  EXTEND_OBJECT_RETENTION,
} from "../actions/folderItemsAction";

const initialState = {
  loading: false,
  result: {},
  error: null,
};

export default function folderItemsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOLDERS_ITEMS_LIST_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      //console.log("begin");
      return {
        ...state,
        loading: true,
        error: null,
        result: action.folderItemsContainer,
      };
    case GET_FOLDERS_ITEMS_LIST_SUCCESS:
      //console.log("attreducer", action.folderItemsContainer);
      //      console.log("reached itemslist");

      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        error: null,
        result: action.folderItemsContainer,
      };
    case GET_FOLDERS_ITEMS_LIST_FAILED:
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
        error: action.folderItemsContainer.error,
        result: null,
      };
    // case EXTEND_OBJECT_RETENTION:
    //   // console.log("EXTEND_OBJECT_RETENTION", action.folderItemsExtension);
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.folderItemsExtension.error,
    //     result: action.folderItemsExtension,
    //   };
    default:
      return state;
  }
}
