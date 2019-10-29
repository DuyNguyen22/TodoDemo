import { todoConstants } from "../_constants";
import { todoService } from "../_services/todo.service";
import { alertActions } from "./";
import { history } from "../_helpers";

export const todoActions = {
  getTodos,
  markCompleted,
  remove,
  create,
  update
};

function getTodos() {
  return dispatch => {
    dispatch(getTodosActionCreator.request());

    todoService.getTodos().then(
      todos => {
        dispatch(getTodosActionCreator.success(todos));
        history.push("/todos");
      },
      error => {
        dispatch(getTodosActionCreator.failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

const getTodosActionCreator = {
  request: () => ({ type: todoConstants.GETTODO_REQUEST }),
  success: todos => ({ type: todoConstants.GETTODO_SUCCESS, todos }),
  failure: error => ({ type: todoConstants.GETTODO_FAILURE, error })
};

function markCompleted(todo) {
  return dispatch => {
    dispatch(request(todo.id));

    todoService.markCompleted(todo.id).then(
      data => {
        dispatch(success(todo.id));

        refreshTodoList(dispatch);
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(id) {
    return { type: todoConstants.MARKCOMPLETED_REQUEST, id };
  }
  function success(id) {
    return { type: todoConstants.MARKCOMPLETED_SUCCESS, id };
  }
  function failure(error) {
    return { type: todoConstants.MARKCOMPLETED_FAILURE, error };
  }
}

function remove(todo) {
  return dispatch => {
    dispatch(request(todo.id));

    todoService.remove(todo.id).then(
      data => {
        dispatch(success(todo.id));

        refreshTodoList(dispatch);
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(id) {
    return { type: todoConstants.REMOVE_REQUEST, id };
  }
  function success(id) {
    return { type: todoConstants.REMOVE_SUCCESS, id };
  }
  function failure(error) {
    return { type: todoConstants.REMOVE_FAILURE, error };
  }
}

function create(todo) {
  return dispatch => {
    dispatch(request(todo));

    todoService.create(todo).then(
      data => {
        dispatch(success(todo));

        //refreshTodoList(dispatch);
        history.push("/todos");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: todoConstants.CREATE_REQUEST };
  }
  function success(todo) {
    return { type: todoConstants.CREATE_SUCCESS, todo };
  }
  function failure(error) {
    return { type: todoConstants.CREATE_FAILURE, error };
  }
}

function update(todo) {
  return dispatch => {
    dispatch(request(todo));

    todoService.update(todo).then(
      data => {
        dispatch(success(todo));

        refreshTodoList(dispatch);
        //history.push("/todos");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: todoConstants.UPDATE_REQUEST };
  }
  function success(todo) {
    return { type: todoConstants.UPDATE_SUCCESS, todo };
  }
  function failure(error) {
    return { type: todoConstants.UPDATE_FAILURE, error };
  }
}

function refreshTodoList(dispatch) {
  todoService.getTodos().then(
    todos => {
      dispatch(getTodosActionCreator.success(todos));
    },
    error => {
      dispatch(getTodosActionCreator.failure(error.toString()));
      dispatch(alertActions.error(error.toString()));
    }
  );
}