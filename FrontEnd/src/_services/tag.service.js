import config from "config";
import { authHeader } from "../_helpers";

export const tagService = {
  getAll
};

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/tag`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}