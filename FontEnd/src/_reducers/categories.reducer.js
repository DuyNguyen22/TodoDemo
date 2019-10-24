import { categoryConstants } from "../_constants";

export function category(state = {}, action) {
  switch (action.type) {
    case categoryConstants.GETALL_REQUEST:
      return { loading: true };
    case categoryConstants.GETALL_SUCCESS:
      return { items: action.categories };
    case categoryConstants.GETALL_FAILURE:
      return { error: action.error };
    default:
      return state;
  }
}
