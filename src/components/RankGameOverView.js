import React from "react";

function RankGameOverView({rankType,data}) {


  // unrank
  if (data === undefined) {
    return (
      <div className="RankGame">
        <div className="RankIconWrapper">
          <img className="UnRanked" src={require(`../assets/rank/Emblem_UNRANKED.png`)} alt="UNRANKED" />
        </div>
        <div className="RankInfo">
          <div className="GameType">{rankType}</div>
          <div className="Tier">Unranked</div>
        </div>
      </div>
    );     
  }else{
    const winRate = Math.floor(
      (data.wins / (data.wins + data.losses || 1)) * 100
    );

    
    return (
      <div className="RankGame">
        <div className="RankIconWrapper">
          <img className="RankIcon" src={require(`../assets/rank/Emblem_${data.tier}.png`)} alt={data.tier} />
        </div>
        <div className="RankInfo">
          <div className="GameType">{data.queueType}</div>
          <div className="Tier">{`${data.tier} ${data.rank}`}</div>
          <div className="Points">
            <div className="LP">{data.leaguePoints}LP</div>
            <div className="WL">
              &nbsp; / {data.wins}승 {data.losses}패
            </div>
          </div>
          <div className="LeagueName">승률 {winRate}%</div>
        </div>
      </div>
    );
  }


};

export default RankGameOverView;
