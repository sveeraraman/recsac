import {
  ADD_FRIENDS_LIST,
  GET_FRIENDS_LIST,
  INVITE_FRIENDS,
  SHARE_WITH_FRIENDS,
} from "../actions/friends";

const initialState = {
  loading: false,
  friendsList: [],
  error: null,
  loading: false,
};

export default function friendsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FRIENDS_LIST:
      return {
        ...state,
        loading: false,
        error: null,
        friendsList: action.friendsList,
      };
    case INVITE_FRIENDS:
      return {
        ...state,
        loading: false,
        error: null,
        inviteResponse: action.inviteResponse,
      };
    case SHARE_WITH_FRIENDS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
