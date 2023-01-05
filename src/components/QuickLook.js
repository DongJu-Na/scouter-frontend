import React from "react"

function QuickLook(){
    return(
        <div className="QuickLook">
            <div className="Seasons">
                <div className="SeasonBadges">
                    <div class="SeasonBadge">S2022 Platinum 2</div>
                    <div class="SeasonBadge">S2021 Platinum 4</div>
                    <div class="SeasonBadge">S2020 Gold 4</div>                    
                </div>
                </div>
                <div className="QuickLookBottomContainer">
                <img className="Avatar" src="https://opgg-static.akamaized.net/images/profile_icons/profileIcon4558.jpg?image=q_auto,f_webp,w_auto&v=1672400108682" alt="avatar" />
                <img
                    className="BorderImage"
                    src="https://opgg-static.akamaized.net/images/borders2/challenger.png"
                    alt="bracket"
                />
        
                <div className="UserNameAndRaderInfo">
                    <div className="UserName"> <b>소환사명</b>  </div>
                    <span class="LadderRank">래더 랭킹<span class="Accent"> 162,782 위 </span> (상위 3.62%) </span>
                </div>
                </div>
      </div>
    )
}

export default QuickLook;