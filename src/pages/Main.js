import React from "react";
import logo from "../assets/logo.png";
import  SearchSummoner from "../components/SearchSummoner";

function Main(){
    return (
        <div className="Main">
            <img className="BannerImg" src={logo} alt="로고" />
            <div className="MainSearchContainer">
                <SearchSummoner />
            </div>
        </div>   
    )

}

export default Main;