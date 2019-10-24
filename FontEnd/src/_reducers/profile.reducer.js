import { userConstants } from '../_constants';
import { toDate } from '../_helpers/uility';

export function profile(state = {}, action) {
  switch (action.type) {
    case userConstants.GETBY_REQUEST:
      return { loading: true };
    case userConstants.GETBY_SUCCESS:
      let updatedState = { user: { ...action.user } }
      updatedState.user.birthdate && (updatedState.user.birthdate = toDate(updatedState.user.birthdate));
      return { user: action.user };
    case userConstants.GETBY_FAILURE:
      return {};
    case userConstants.UPDATE_REQUEST:
      return { updating: true };
    case userConstants.UPDATE_SUCCESS:
      return {};
    case userConstants.UPDATE_FAILURE:
      return {};
    default:
      return state;
  }
}