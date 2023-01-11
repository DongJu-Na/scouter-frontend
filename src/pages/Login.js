import React , { useState } from "react";


function Login(){
    let [authMode, setAuthMode] = useState("signin")

    const changeAuthMode = () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin")
    }
  
    if (authMode === "signin") {
      return (
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Scouter</h3>
              <div className="text-center">
          
              </div>
              <div className="form-group mt-3">
                <label>아이디</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder=""
                  maxLength={20}
                />
              </div>
              <div className="form-group mt-3">
                <label>비밀번호</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder=""
                  maxLength={255}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  로그인
                </button>
              </div>

              <p className="text-center mt-2" onClick={changeAuthMode}>
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
              <label>아이디</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder=""
                maxLength={20}
              />
            </div>
            <div className="form-group mt-3">
              <label>닉네임</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder=""
                maxLength={20}
              />
            </div>
            <div className="form-group mt-3">
              <label>비밀번호</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder=""
                maxLength={255}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                회원가입
              </button>
            </div>
          </div>
        </form>
      </div>
    )

}

export default Login;