import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getTimeAgoString } from "../util/dates";
import { toFloatPrecision } from "../util/numbers";

import ReactTooltip from "react-tooltip";

const PlayerStick  = ({imageUrl,summonerName}) => {
  return (
    <div className="Player">
      <img className="Champion" src={imageUrl} alt="" />
      <Link
        to={`/summoner/userName=${summonerName}`}
        onClick={() => {} }
        className="SummonerName"
      >
        {summonerName}
      </Link>
    </div>
  );
};

  const TeamLists = ({summonerName,gameId}) => {
  const [matchDetails, setMatchDetails] = useState();

  /* 
    useEffect(() => {
      fetch(
        `https://codingtest.op.gg/api/summoner/${summonerName}/matchDetail/${gameId}`
      )
        .then((res) => res.json())
        .then((res) => setMatchDetails?.(res));

      return () => {
        setMatchDetails(undefined);
      };
    }, [summonerName, gameId]);
  */


  if (matchDetails === undefined) {
    return <div className="GR6"></div>;
  }

  return (
    <div className="GR6">
      <span className="Team1">
        {/* 
            {matchDetails.teams[0].players.map((player, idx) => (
              <PlayerStick
                imageUrl={player.champion.imageUrl}
                summonerName={player.summonerName}
                key={`Game_${gameId}PlayerStick_${player.summonerName}_${idx}`}
              />
            ))}
        */}
      </span>
      <span className="Team2">
        {/* 
            {matchDetails.teams[1].players.map((player, idx) => (
              <PlayerStick
                imageUrl={player.champion.imageUrl}
                summonerName={player.summonerName}
                key={`Game_${gameId}PlayerStick_${player.summonerName}_${idx}`}
              />
            ))}        
        */}

      </span>
    </div>
  );
};

const MemoTeamLists = React.memo(TeamLists);

const GameRecord = (game) => {
  const vd =  "victory"; // game.isWin ? "victory" : "defeat";

  const getChampName = (champUrl) => {
    return champUrl.split("champion/")[1].split(".png")[0];
  };

  return (
    <div className={`GameRecord ${vd}`}>
      <div className="GR1">
        <div className="GameType">{"게임타입"}</div>
        <time className="TimeAgo">{"경과시간" /*getTimeAgoString(game.createDate)*/}</time>
        <div className="Divider"></div>
        <div className={`Outcome ${vd}`}>{vd}</div>
        <div className="PlayTime">
          { 0 /*toFloatPrecision(game.gameLength, 60, 0) */ }분 { /* game.gameLength % 60 */} 0초
        </div>
      </div>
      <div className="GR2">
        <div className="ChampVisuals">
          <img
            className="ChampAvatar"
            src="https://opgg-static.akamaized.net/meta/images/lol/champion/Teemo.png"
            alt="ChampAvatar"
          />
          <div className="Spells">
            <img className="Spell" src="https://opgg-static.akamaized.net/meta/images/lol/spell/SummonerFlash.png" alt="Spell" />
            <img className="Spell" src="https://opgg-static.akamaized.net/meta/images/lol/spell/SummonerDot.png" alt="Spell" />
          </div>
          <div className="Runes">
            <img className="Rune" src="https://opgg-static.akamaized.net/meta/images/lol/perk/8005.png" alt="Rune" />
            <img className="Rune" src="https://opgg-static.akamaized.net/meta/images/lol/perkStyle/8400.png" alt="Rune" />
          </div>
        </div>
        <div className="ChampName">{ "챔피언명"/*getChampName(game.champion.imageUrl)*/}</div>
      </div>
      <div className="GR3">
        <div className="KDASeperated">
          <span className="K">{"0"/*game.stats.general.kill*/}</span>/
          <span className="D">{"0"/*game.stats.general.death*/}</span>/
          <span className="A">{"0"/*game.stats.general.assist*/}</span>
        </div>
        <div className="KDAScoreContainer">
          <span className="KDAScore">{"KDA스코어"/*game.stats.general.kdaString*/}</span>
          <span className="KDAScoreSuffix">KDA</span>
        </div>
        <div className="Badges">
          
            <div className="Badge kill">
              더블킬
            </div>
          
            <div className="Badge ace">ACE</div>
          
        </div>
      </div>
      <div className="GR4">
        <div className="Level">Level </div>
        <div className="CS">
          0 (0) CS
        </div>
        <div className="PKill">
          P/Kill
        </div>
            <div className="TierAverage">Tier Average</div>
            <div className="Tier"></div>
      </div>
      <div className="GR5">

        <div className="Items">
              <div className="ItemWrapper">
                  <img
                    className="Item"
                    src="https://opgg-static.akamaized.net/meta/images/lol/item/3157.png?image=q_auto,f_webp,w_44&v=1673037181628"
                    alt=""
                    data-tip
                    data-for="test2"
                  />
                  <ReactTooltip
                    id="test2"
                  >
                      <div className="ItemTooltip">
                        <b className="TooltipItemName">
                          존야의 모래시계
                        </b>
                        <br />
                      <span className="TooltipItemPlainText">
                         ㅁㄴㅇ
                      </span>
                      <br />
                      <span>Cost: </span>
                      <span className="TooltipItemPrice">
                        
                      </span>
                    </div>
                    
                  </ReactTooltip>
                </div>


          <img className="Item" src="" alt="Build" />
        </div>

        <div className="ControlWardCount">
          <img className="ControlWard" src="https://opgg-static.akamaized.net/meta/images/lol/item/3364.png?image=q_auto,f_webp,w_44&v=1673037181628" alt="" />
        </div>
      </div>
      <MemoTeamLists gameId={game.gameId} summonerName={game.summonerName} />
    </div>
  );
};

export default GameRecord;
