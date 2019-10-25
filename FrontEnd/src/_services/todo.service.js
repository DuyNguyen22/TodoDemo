import config from "config";
import { authHeader } from "../_helpers";

export const todoService = {
  getByUser,
  getTodos,
  markCompleted,
  remove,
  create
};

function getByUser(userId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/todos/getbyuser/${userId}`, requestOptions).then(handleResponse);
}

function getTodos() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/todos`, requestOptions).then(handleResponse);
}

function markCompleted(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/todos/markcompleted/${id}`, requestOptions).then(handleResponse);
}

function remove(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/todos/${id}`, requestOptions).then(handleResponse);
}

function create(todo) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(todo)
  };

  return fetch(`${config.apiUrl}/todos`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      // if (response.status === 401) {
      //   // auto logout if 401 response returned from api
      //   logout();
      //   location.reload(true);
      // }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}