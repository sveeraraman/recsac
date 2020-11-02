import {
  CREATE_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE,
} from "../actions/auth";

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROFILE:
      return Object.assign({}, state, action.profile);
    case UPDATE_PROFILE:
      return Object.assign({}, state, action.profile);
    case DELETE_PROFILE:
      return null;
    default:
      return state;
  }
};

export default profileReducer;
