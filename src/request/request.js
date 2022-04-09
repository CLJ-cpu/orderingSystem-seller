import fetch from "dva/fetch";
import { Toast } from "antd-mobile";
// import { ORIGIN } from '../constants';
const ORIGIN = "http://192.168.31.99:9000/api";
//响应拦截
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    window.location.href = `${window.location.pathname}#/login`;
    return response;
  } else if (response.status === 400) {
    Toast.show({
      icon: 'fail',
      content: `请求错误: ${response.status} ${response.statusText}`,
    })
  }

  return response;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
//请求拦截
export default function request(url, options = {}) {
  const token = localStorage.getItem("token");
  const defaultOptions = {
    // credentials: 'include',
    headers: {
      Accept: "application/json",
    },
  };
  const newOptions = {
    ...defaultOptions,
    ...options,
    headers: { ...defaultOptions.headers, ...options.headers },
  };
  if (token) {
    newOptions.headers.Authorization = token;
  }
  if (
    newOptions.method === "POST" ||
    newOptions.method === "PUT" ||
    newOptions.method === "DELETE"
  ) {
    newOptions.headers = {
      "Content-Type": "application/json; charset=utf-8",
      ...newOptions.headers,
    };
    if (newOptions.headers["Content-Type"] === "")
      delete newOptions.headers["Content-Type"];
    newOptions.body =
      newOptions.body instanceof FormData
        ? newOptions.body
        : JSON.stringify(newOptions.body);
  }
  const origin = ORIGIN;
  return fetch(/^http/.test(url) ? url : `${origin}${url}`, newOptions)
    .then(checkStatus)
    .then((response) => {
      const promise = response.json();
      // promise.then((result) => {
      //   if (result.error && result.errorCode === 10000) {
      //     notification.error({
      //       message: result.msg,
      //       description: '登录已失效，请刷新页面重新登录',
      //     });
      //   }
      // });
      return promise;
    })
    .catch((error) => {
      if (error.code) {
        Toast.show({
          icon: 'fail',
          content: error.name,
        })
      }
      if ("stack" in error && "message" in error) {
        Toast.show({
          icon: 'fail',
          content: `请求错误: ${error.message}`,
        })
      }
      return error;
    });
}
