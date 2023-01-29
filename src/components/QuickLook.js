import React, { useState } from "react";

import { useRecoilValue } from "recoil";
import { summonerDataState} from "../atom";


function QuickLook(){

    const summonerData = useRecoilValue(summonerDataState);

    return(
        <div className="QuickLook">
            {/* 
                <div className="Seasons">
                    <div className="SeasonBadges">
                        <div className="SeasonBadge">S2022 Platinum 2</div>
                        <div className="SeasonBadge">S2021 Platinum 4</div>
                        <div className="SeasonBadge">S2020 Gold 4</div>                    
                    </div>
                </div>            
            */}


            <div className="QuickLookBottomContainer">
                    <img className="Avatar" src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${summonerData.profileIconId}.png`} alt="avatar" />
                
                    <div className="Champlevel">
                        <span>{summonerData.summonerLevel}</span>
                    </div>
            
                    <div className="UserNameAndRaderInfo">
                        <div className="UserName"> <b>{summonerData.name}</b></div>
                        {/*<span className="LadderRank">래더 랭킹<span className="Accent"> 162,782 위 </span> (상위 3.62%) </span>  */}
                    </div>
            </div>
      </div>
    )
}

export default QuickLook;