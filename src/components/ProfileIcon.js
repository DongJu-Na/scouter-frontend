import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { httpGet } from "../util/apiClient";
import { httpUrl } from "../util/urlMapper";

const ProfileIcon = ({data}) => {
  const [pi,setPi] = useState('1');
  useEffect(()=>{
    getSummoner();
  },[]);

  function getSummoner(){
    httpGet(httpUrl.getSummoner + data, {}).then((res) => {
      if(res.status ===200){
        console.log(res);
        setPi(res.data.profileIconId);
      }
    }).catch(() => { 
      setPi('1');
    });
  }

    return(
      <>
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${pi}.png`}
          alt=""
        />
      </>
    )

};

export default ProfileIcon;
