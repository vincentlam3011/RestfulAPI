import { userConstants } from '../Constants/users';

export function personalization(state = {}, action) {
  switch (action.type) {
    case userConstants.EDIT_REQUEST:
      return {
        editting: true,
        user: action.user
      };
    case userConstants.EDIT_SUCCESS:
      return {
        editted: true,
        user: action.user
      };
    case userConstants.EDIT_FAILURE:
      return {
        error: action.error
      };
    default: return state;
  }
}