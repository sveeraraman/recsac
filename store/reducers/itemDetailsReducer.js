//itemDetailsReducer
import {
  GET_ATTACHMENT_LINKS,
  SET_FOLDER_MOVE_RULE,
} from "../actions/folderItemsAction";

const initialState = {
  loading: false,
  attachmentLinks: {
    items: [],
  },
};

export default function itemDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ATTACHMENT_LINKS:
      // console.log("attreducer-2", action);
      //console.log("reached attlink", action);
      return {
        attachmentLinks: action.attachmentDetails,
      };
    case SET_FOLDER_MOVE_RULE:
    default:
      return state;
  }
}
