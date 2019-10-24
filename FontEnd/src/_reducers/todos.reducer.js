import { todoConstants } from "../_constants";

export function todos(state = {}, action) {
  switch (action.type) {
    case todoConstants.GETTODO_REQUEST:
      return { loading: true };
    case todoConstants.GETTODO_SUCCESS:
      return { items: action.todos };
    case todoConstants.GETTODO_FAILURE:
      return { error: action.error };
    default:
      return state;
  }
}
