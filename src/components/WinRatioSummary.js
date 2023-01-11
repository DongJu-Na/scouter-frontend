import React from "react";
import { toFloatPrecision } from "../util/numbers";
import { colorOfKDA, colorOfWinRatio } from "../util/colors";

const WinRatioSummary = () => {
  const tab = "Champion Win Ratio";

  const renderedTabs = (
    <div className="LRContainer">
      <div
        className={`ChampsWinRateButton ${ tab === "Champion Win Ratio" ? "Selected" : "" }`}
        onClick={() => {}}
      >
        솔로랭크
      </div>
      <div
        className={`ChampsWinRateButton ${ tab === "Rank win rate per week" ? "Selected" : "" }`}
        onClick={() => {} }
      >
        자유랭크
      </div>
    </div>
  );

  if (tab === "Rank win rate per week") {
    return (
      <div className="ChampsWinRatioBox">
        {renderedTabs}
        {/*recents?.map((item, idx) => ( ))*/}
          <div
            className="ChampWinRatioItem"
            key={`ChampWinRatioWeek_item_idx`}
          >
            <img className="ChampAvatar" src="" alt="" />
            <div className="ChampName"></div>
            <div className="WinRatio">
              0%
            </div>
            <div className="WinLose">
              <div className="Win" style="">
                0W
              </div>
              <div className="Loss" style="">
                0L
              </div>
            </div>
          </div>
        
      </div>
    );
  }

  return (
    <div className="ChampsWinRatioBox">
      {renderedTabs}
      {/*mostChampions?.map((champ, idx) => {      })
        return (  );
      */}
          <div
            className="ChampWinRatioItem"
            key={`$prefixchamp.name_idx`}
          >
            <img className="ChampAvatar" src="" alt="" />
            <div className="TDContainer1">
              <div className="Top1">champ.name</div>
              <div className="Down1">
                CS  ()
              </div>
            </div>
            <div className="TDContainer2">
              <div className="">
                :1 KDA
              </div>
              <div className="Down2">
                
              </div>
            </div>
            <div className="TDContainer3">
              <div className="">
                0%
              </div>
              <div className="Down3"> Played</div>
            </div>
          </div>
      

    </div>
  );
};

export default WinRatioSummary;
