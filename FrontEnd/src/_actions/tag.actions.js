import { tagConstants } from "../_constants";
import { tagService } from '../_services'

export const tagsActions = {
  getAll
};

function getAll() {
  return dispatch => {
    dispatch(request());

    tagService
      .getAll()
      .then(
        tags => dispatch(success(tags)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: tagConstants.GETALL_REQUEST } }
  function success(tags) { return { type: tagConstants.GETALL_SUCCESS, tags } }
  function failure(error) { return { type: tagConstants.GETALL_FAILURE, error } }
}