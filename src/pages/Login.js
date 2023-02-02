import React , { useRef, useState } from "react";
import { httpPost } from "../util/apiClient";
import { httpUrl } from "../util/urlMapper";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


function Login(){
    const [authMode, setAuthMode] = useState("signin");
    const inputRef = useRef([]);
    const navigate = useNavigate();

    const changeAuthMode = () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    const loginFn = () => {
      if(inputRef.current[0].value === ""){
        Swal.fire('이메일을 입력해주세요.');
        inputRef.current[0].focus();
        return false;
      }else if(inputRef.current[1].value === ""){
        Swal.fire('비밀번호를 입력해주세요.');
        inputRef.current[1].focus();
        return false;
      }

      httpPost(httpUrl.Login, {
        "email" :  inputRef.current[0].value,
        "password" : inputRef.current[1].value,
      })
      .then((res) => {
        console.log(res);
        if(res.status === 201){
          localStorage.setItem("accessToken",res.data.data.access_token);
          localStorage.setItem("refreshToken",res.data.data.refresh_token);
          sessionStorage.setItem("accessTokenExpirationTime",res.data.data.accessTokenExpirationTime);
          navigate("/");
        }
      })
      .catch(() => { 
        Swal.fire('처리 중 오류가 발생하였습니다.');
      });
    }

    const registerFn = () => {

      httpPost(httpUrl.Register, {
        "email" :  inputRef.current[2].value,
        "nickName" : inputRef.current[3].value,
        "password" : inputRef.current[4].value,
      })
      .then((res) => {
        console.log(res);
        if(res.status === 200){
          Swal.fire('처리 중 오류가 발생하였습니다.');
          setAuthMode("signin");
        }
      })
      .catch((e) => { 
        Swal.fire('처리 중 오류가 발생하였습니다.');
      });
    }

  
    if (authMode === "signin") {
      return (
        <div className="Auth-form-container">
          <form className="Auth-form"  action='' method='' onSubmit={loginFn}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Scouter</h3>
              <div className="text-center">
          
              </div>
              <div className="form-group mt-3">
                <label>이메일</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder=""
                  maxLength={100}
                  ref={el => inputRef.current[0] = el}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      loginFn()
                    }
                  }}
                />
              </div>
              <div className="form-group mt-3">
                <label>비밀번호</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder=""
                  maxLength={255}
                  ref={el => inputRef.current[1] = el}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      loginFn()
                    }
                  }}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="button" className="btn btn-primary" onClick={loginFn}>
                  로그인
                </button>
              </div>

              <p className="text-center mt-2" onClick={()=>changeAuthMode()}>
                <a href="#!">회원가입</a>
              </p>
              <p className="text-center mt-2">
                <a href="#!">비밀번호찾기</a>
              </p>
            </div>
          </form>
        </div>
      )
    }
  
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">회원가입</h3>
            <div className="text-center">
              계정이 이미 있습니까?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                로그인
              </span>
            </div>
            <div className="form-group mt-3">
              <label>이메일</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder=""
                maxLength={100}
                ref={el => inputRef.current[2] = el}
              />
            </div>
            <div className="form-group mt-3">
              <label>닉네임</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder=""
                maxLength={20}
                ref={el => inputRef.current[3] = el}
              />
            </div>
            <div className="form-group mt-3">
              <label>비밀번호</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder=""
                maxLength={255}
                ref={el => inputRef.current[4] = el}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-primary" onClick={()=>registerFn()}>
                회원가입
              </button>
            </div>
          </div>
        </form>
      </div>
    )

}

export default Login;