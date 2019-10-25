import { categoryConstants } from "../_constants";
import { categoryService } from '../_services'

export const categoryActions = {
  getAll
};

function getAll() {
  return dispatch => {
    dispatch(request());

    categoryService
      .getAll()
      .then(
        categories => dispatch(success(categories)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: categoryConstants.GETALL_REQUEST } }
  function success(categories) { return { type: categoryConstants.GETALL_SUCCESS, categories } }
  function failure(error) { return { type: categoryConstants.GETALL_FAILURE, error } }
}