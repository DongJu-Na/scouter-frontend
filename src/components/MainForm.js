import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import SearchSummoner from "./SearchSummoner";

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
            src={logo}
            alt="아이콘"
          />
          <div className="icon-text"></div>
        </div>
      </Link>
      <div className="SearchBar">
        <div className="SearchInputContainer">
          <SearchSummoner />
        </div>
      </div>
    </div>
  );
};

export default MainForm;
