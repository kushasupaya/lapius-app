import { removeEmpty } from "../utils";

const request = async (method, url, params = {}) => {
  const token = localStorage.getItem("authToken");
  const req = {
    method: method,
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  };

  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }

  if (method === "GET") {
    const getParams = new URLSearchParams(removeEmpty(params));
    url += `?${getParams}`;
  } else if (params instanceof FormData) {
    req.body = params;
  } else {
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify(removeEmpty(params));
  }

  const res = await fetch(url, req);
  const data = await res.json();
  if (res.failed || !res.ok) {
    throw new ResponseError(data.message, data.errors);
  }

  return data;
};

class ResponseError extends Error {
  constructor(msg, errors) {
    super(msg);
    this.errors = errors;
  }
}

export default request;
