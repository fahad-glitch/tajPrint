const axios = require("axios");
const queryString = require("query-string");

// export const baseURL = "http://localhost:3000";
// const baseURL = "http://localhost:5000";
// const baseURL = "http://192.168.4.44:9000";
// const baseURL = "http://192.168.4.60:9000";
// 192.168.4.60
// 192.168.100.74
export const uploadURL = "https://taj-print.s3.amazonaws.com/";
// const baseURL ="http://tajprintbackend-env.eba-vjnr4brr.us-east-2.elasticbeanstalk.com";
const baseURL ="http://192.168.0.106:9000"

export const postRequest = async (url, body = {}, headers = {}, token) => {
  let xform = queryString.stringify(body);
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers,
    },
  };

  let returnValue;

  await axios
    .post(baseURL + url, xform, config)
    .then((result) => {
      returnValue = { result: result, error: null };
    })
    .catch((err) => {
      returnValue = { result: null, error: err };
    });
  return returnValue;
};

export const postRequestForm = async (url, token, body = {}, headers = {}) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  };

  let returnValue;

  await axios
    // baseURL +
    .post(baseURL + url, body, config)
    .then((result) => {
      returnValue = { result: result, error: null };
    })
    .catch((err) => {
      returnValue = { result: null, error: err };
    });
  return returnValue;
};

export const postWithParams = async (url, token, params = {}, headers = {}) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers,
    },
    params: {
      ...params,
    },
  };

  let returnValue;

  await axios
    .post(baseURL + url, {}, config)
    .then((result) => {
      returnValue = { result: result, error: null };
    })
    .catch((err) => {
      returnValue = { result: null, error: err };
    });
  return returnValue;
};

export const getRequest = async (url, token, params = {}, headers = {}) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers,
    },
    params: {
      ...params,
    },
  };

  let returnValue;

  await axios
    .get(baseURL + url, config)
    .then((result) => {
      returnValue = { result: result, error: null };
    })
    .catch((err) => {
      returnValue = { result: null, error: err };
    });
  return returnValue;
};

export const putRequestForm = async (url, token, body = {}, headers = {}) => {
  let config = "";
  if (token) {
    config = {
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    };
  }
  console.log("config", config);
  let returnValue;

  await axios
    .put(baseURL + url, body, config)
    .then((result) => {
      returnValue = { result: result, error: null };
    })
    .catch((err) => {
      returnValue = { result: null, error: err };
    });
  return returnValue;
};

export const putRequest = async (
  url,
  token,
  body,
  params = {},
  headers = {}
) => {
  let xform = queryString.stringify(body);
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers,
    },
    params: {
      ...params,
    },
  };

  let returnValue;

  await axios
    .put(baseURL + url, xform, config)
    .then((result) => {
      returnValue = { result: result, error: null };
    })
    .catch((err) => {
      returnValue = { result: null, error: err };
    });
  return returnValue;
};
