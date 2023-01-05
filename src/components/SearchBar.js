import React from "react";
import SearchSummoner from "./SearchSummoner";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function SearchBar() {
  const navigate = useNavigate();

  return (
        <div className="SearchBar">
          <div className="logoZone">
            <img
              src={logo}
              alt="로고"
              onClick={() => navigate("/")}
            />
          </div>
          <div className="SearchInputContainer">
            <SearchSummoner />
          </div>
        </div>
  );
};

export default SearchBar;