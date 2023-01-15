import React from "react";
import { Link } from "react-router-dom";

const Headers = () => {
  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?") == true) {
      localStorage.clear();
      console.log(localStorage.getItem("jwtToken"));
    } else {
      return false;
    }
  };

  const authCheck = localStorage.getItem("jwtToken") ? (
    <Link to="/#" onClick={logout}>
      {" "}
      로그아웃{" "}
    </Link>
  ) : (
    <Link to="/login">로그인</Link>
  );

  return (
    <div className="header1">
      <div className="l-menu1">
        <ul className="menu1">
          <li className="menu__item1">
            <Link to="/">Home</Link>
          </li>

          <li className="menu__item1">
            <Link to="/ranking">랭킹</Link>
          </li>

          <li className="menu__item1">
            <Link to="/community">커뮤니티</Link>
          </li>
          <li className="menu__item1">{authCheck}</li>
        </ul>
      </div>
    </div>
  );
};

export default Headers;
