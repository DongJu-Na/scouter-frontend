import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import  SearchSummoner from "../components/SearchSummoner";

function Main(){
    const navigate = useNavigate();


    return (
            <>
                <div className="loginArea" onClick={()=>{navigate("/login")}}>
                    로그인
                </div>                  
                <div className="Main">
                    <img className="BannerImg" src={logo} alt="로고" />
                    <div className="MainSearchContainer">
                        <SearchSummoner />
                    </div>
                </div>   
            </>
    )

}

export default Main;