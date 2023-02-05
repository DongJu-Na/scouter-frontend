import Axios from "axios";
import { httpUrl } from "./urlMapper";
import jwt from 'jwt-decode';

const validateToken = (_exp) =>{
  if (Date.now() >= (_exp * 1000)) {
    return false;
  }
  return true;
}

const httpGet = (url, data) => {
  return httpExec("GET", url, data);
};

const httpPut = (url, data) => {
  return httpExec("PUT", url, data);
};

const httpPost = (url, data) => {
  return httpExec("POST", url, data);
};

const httpDelete = (url, data) => {
  return httpExec("DELETE", url, data);
};

const httpExec = (method, url, data) => {
  console.log('httpExec',method,url,data);

  return new Promise((resolve, reject) => {
    let Token;
    let _header = {};
        _header["Accept"] = "application/json";
        _header["Content-Type"] = "application/json";
    
    if(url.indexOf("/lol") === -1 && url !== httpUrl.Login 
      && url !== httpUrl.Register && url !== httpUrl.getBoard 
      && url !== httpUrl.getBoardDetail && url !== httpUrl.getReplys ){
      if(sessionStorage.getItem("accessToken") !== null && validateToken(jwt(sessionStorage.getItem("accessToken"))["exp"])){
          Token = sessionStorage.getItem("accessToken");
      } else if(sessionStorage.getItem("refreshToken") !== null && validateToken(jwt(sessionStorage.getItem("refreshToken"))["exp"])){
          Token = sessionStorage.getItem("refreshToken");
      }

      if(Token !== undefined && Token !== null)
      _header["Authorization"] = `Bearer ${Token}`;
    }
    

    Axios({
      method: method,
      url: url,
      data: data,
      withCredentials: true,
      headers: _header,
    })
      .then((response) => {
         // setTimeout(function() {
          resolve(response);
         // }, 1000);
      })
      .catch((error) => {
        console.log(error);
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

export {
  httpExec,
  httpGet,
  httpPut,
  httpPost,
  httpDelete,
};
