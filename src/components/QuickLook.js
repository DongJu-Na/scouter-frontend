import React, { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { summonerDataState} from "../atom";


function QuickLook({refreshGame}){

    const summonerData = useRecoilValue(summonerDataState);
    const [timer,setTimer] = useState(0);
    const [active,setActive] = useState(false);

    useEffect(() => {
        let timerF;
        if (active) {
            timerF = setInterval(() => {
                setTimer((t)=>t-1);
          }, 1000);

          if(timer === 0){
            setActive(false);
            clearInterval(timerF);
          }
        }
        return () => clearInterval(timerF);
      }, [active]);

      useEffect(()=>{
        setActive(false);
        setTimer(0);
      },[summonerData]);

    function refreshGameCheck(){
        if(!active){
            setActive(true);
            setTimer(120);
            refreshGame();
        }
    }
    
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
                    <img className="Avatar" src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${summonerData.profileIconId}.png`} alt="avatar" />
                
                    <div className="Champlevel">
                        <span>{summonerData.summonerLevel}</span>
                    </div>
            
                    <div className="UserNameAndRaderInfo">
                        <div className="UserName"> <b>{summonerData.name}</b></div>
                        <div className="resetMatchBtn">
                            <button onClick={()=>refreshGameCheck()} disabled={!active ? false : true}>전적 갱신</button>
                        </div>
                        {timer !== 0 ? <span className="Accent">{timer}초 후 갱신을 시도해주세요.</span> : <></>}
                    </div>
                    
                    
            </div>
            
      </div>
    )
}

export default QuickLook;