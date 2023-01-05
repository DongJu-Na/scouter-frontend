import React from "react";

function RankGameOverView({rankType}) {
  const league = undefined;

  if (league === undefined) {
    return (
      <div className="RankGame">
        <div className="RankIconWrapper">
          <img className="UnRanked" src="https://opgg-static.akamaized.net/images/medals_new/platinum.png?image=q_auto,f_webp,w_144&v=1672400108682" alt="gold3" />
        </div>
        <div className="RankInfo">
          <div className="GameType">{rankType}</div>
          <div className="Tier">Unranked</div>
        </div>
      </div>
    );
  }

  return (
    <div className="RankGame">
      <div className="RankIconWrapper">
        <img className="RankIcon" src="" alt="gold3" />
      </div>
      <div className="RankInfo">
        <div className="GameType">tierRank.name</div>
        <div className="PreferredPosition">top (total 27 Played)</div>
        <div className="Tier">tier</div>
        <div className="Points">
          <div className="LP">tierRank.lp</div>
          <div className="WL">
            &nbsp; / 0W 0L
          </div>
        </div>
        <div className="LeagueName">Win Ratio 0%</div>
      </div>
    </div>
  );
};

export default RankGameOverView;
