import Axios from "axios";
import util from "util";
import { httpUrl } from './urlMapper';

global.language = "ko";
global.lanList = ["ko", "en", "ja", "zh"];

const serverUrl = process.env.REACT_APP_RIOT_API_URL;
  

const makeUrl = (url, params) => {
  var result = serverUrl + url;
  if (params === null) return result;
  params.forEach((param) => {
    result = util.format(result, param);
  });
  
  return result;
};

const httpGet = (url, params, data) => {
  return httpExec("GET", makeUrl(url, params), data);
};

const httpPut = (url, params, data) => {
  return httpExec("PUT", makeUrl(url, params), data);
};

const httpPost = (url, params, data) => {
  return httpExec("POST", makeUrl(url, params), data);
};

const httpDelete = (url, params, data) => {
  return httpExec("DELETE", makeUrl(url, params), data);
};

const httpExec = (method, url, data) => {
  console.log('httpExec',method,url,data);
  return new Promise((resolve, reject) => {
    Axios({
      method: method,
      url: url,
      data: data,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.message.includes("401")) {
            // 세션 만료 시 로직 
            //alert("로그인이 만료되었습니다. 다시 로그인해주세요");
            //reactLocalStorage.remove("adminUser");
            //global.location.href = "/";
        }
        reject(error);
      });
  });
};



const httpDownload = (url, params, data) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "GET",
      url: makeUrl(url, params),
      data: data,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      responseType: "arraybuffer",
    })
      .then((response) => {
        var blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        resolve(blob);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export {
  serverUrl,
  httpExec,
  makeUrl,
  httpGet,
  httpUrl,
  httpPut,
  httpPost,
  httpDelete,
  httpDownload,
};
