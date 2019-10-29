import { todoConstants } from "../_constants";

export function todoUpdate(state = {}, action) {
  switch (action.type) {
    case todoConstants.UPDATE_REQUEST:
      return { updating: true };
    case todoConstants.UPDATE_SUCCESS:
      return { udpateSuccess: true, todo: action.todo };
    case todoConstants.UPDATE_FAILURE:
      return { error: action.error };
    default:
      return state;
  }
}
