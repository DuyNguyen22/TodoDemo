import { tagConstants } from "../_constants";

export function tag(state = {}, action) {
  switch (action.type) {
    case tagConstants.GETALL_REQUEST:
      return { loading: true };
    case tagConstants.GETALL_SUCCESS:
      return { items: action.tags };
    case tagConstants.GETALL_FAILURE:
      return { error: action.error };
    default:
      return state;
  }
}
