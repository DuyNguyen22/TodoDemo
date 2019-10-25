import { userConstants } from "../_constants";
import { userService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
  block: block,
  unblock: unblock,
  update: update,
  getById: getById
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push("/");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(
      user => {
        dispatch(success());
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(getAllRequestCreator.request());

    userService
      .getAll()
      .then(
        users => dispatch(getAllRequestCreator.success(users)),
        error => dispatch(getAllRequestCreator.failure(error.toString()))
      );
  };

  // function request() { return { type: userConstants.GETALL_REQUEST } }
  // function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
  // function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

const getAllRequestCreator = {
  request: () => {
    return { type: userConstants.GETALL_REQUEST };
  },
  success: users => {
    return { type: userConstants.GETALL_SUCCESS, users };
  },
  failure: error => {
    return { type: userConstants.GETALL_FAILURE, error };
  }
};

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userService
      .delete(id)
      .then(
        user => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}

function block(id) {
  return dispatch => {
    dispatch(request(id));

    userService.block(id).then(
      user => {
        dispatch(success(id));
        dispatch(getAllRequestCreator.request());

        userService
          .getAll()
          .then(
            users => dispatch(getAllRequestCreator.success(users)),
            error => dispatch(getAllRequestCreator.failure(error.toString()))
          );
      },
      error => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.BLOCK_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.BLOCK_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.BLOCK_FAILURE, id, error };
  }
}

function unblock(id) {
  return dispatch => {
    dispatch(request(id));

    userService.unblock(id).then(
      user => {
        dispatch(success(id));
        dispatch(getAllRequestCreator.request());

        userService
          .getAll()
          .then(
            users => dispatch(getAllRequestCreator.success(users)),
            error => dispatch(getAllRequestCreator.failure(error.toString()))
          );
      },
      error => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.UNBLOCK_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.UNBLOCK_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.UNBLOCK_FAILURE, id, error };
  }
}

function getById(id) {
  return dispatch => {
    dispatch(getByIdAction.request(id));

    userService
      .getById(id)
      .then(
        user => dispatch(getByIdAction.success(user)),
        error => dispatch(getByIdAction.failure(id, error.toString()))
      );
  };
}

const getByIdAction = {
  request: id => ({
    type: userConstants.GETBY_REQUEST, id
  }),
  success: user => ({
    type: userConstants.GETBY_SUCCESS, user
  }),
  failure: (id, error) => ({
    type: userConstants.GETBY_FAILURE, id, error
  })
};

function update(user) {
  return dispatch => {
    const id = user.id;
    dispatch(request(user));

    userService.update(user).then(
      user => {
        dispatch(success());
        dispatch(alertActions.success("Update successful"));
        
        dispatch(getByIdAction.request(id));
        userService
          .getById(id)
          .then(
            user => dispatch(getByIdAction.success(user)),
            error => dispatch(getByIdAction.failure(id, error.toString()))
          );
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.UPDATE_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.UPDATE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_FAILURE, error };
  }
}
