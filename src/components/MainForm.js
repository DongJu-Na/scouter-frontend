import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MainForm = ({ history }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setUsername(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    navigate("/summoner/" + username);
  };

  return (
    <div className="mainForm">
      <Link to="/community">
        <div className="icon-form">
          <img
            className="community-icon"
            src="/img/communityIcon.png"
            alt="아이콘"
          />
          <div className="icon-text">리그오브레전드</div>
        </div>
      </Link>
      <div className="SearchForm">
        <form onSubmit={handleOnSubmit}>
          <input
            onChange={handleOnChange}
            type="text"
            className="main-input"
            placeholder="소환사명..."
          />
          <button className="mainBtn" type="submit">
            <img className="btnImg" src="/img/searchBtn.gif" alt="검색" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainForm;
