import React from "react";
import { useNavigate } from "react-router-dom";
import { httpGet  } from "../util/apiClient";
import { httpUrl } from "../util/urlMapper";

import item from "../riotData/item.json";
import summonerSpell from "../riotData/summonerSpell.json";
import rune from "../riotData/runesReforged.json";
import champ from "../riotData/champ.json";

import ReactTooltip from "react-tooltip";
import { matchDataState, summonerDataState, summonerLeagueDataState, summonerState } from "../atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import redWard from "../assets/wards/red.png";

const PlayerStick  = ({imageUrl,summonerName}) => {
  const navigate = useNavigate();
  const [list , setList] = useRecoilState(summonerState);
  const setSummoner = useSetRecoilState(summonerDataState);
  const setMatch = useSetRecoilState(matchDataState);
  const setLeaugeData = useSetRecoilState(summonerLeagueDataState);

  if(summonerName){
    //문자열 길이 체크
  }

  return (
    <div className="Player">
      <img className="Champion" src={imageUrl} alt="" />
      <a
        href="#javascript"
        onClick={() => {

          let findIndex = list["recent"].findIndex(data => data.name === summonerName);
          let copyArray = [...list["recent"]];

          if(copyArray.length > 5){
            copyArray.splice(copyArray.length - 1);
          }  

          if(findIndex === -1 ){
            copyArray.unshift({ "name" : summonerName, "favoritesFlag" : false });
          }

          httpGet(httpUrl.getSummoner + summonerName, {})
          .then((res) => {
              if(res.status === 200){
                  setList((prevVal)=>({
                      ...prevVal,
                      ["recent"] :  copyArray
                  }));
                  setMatch([]);
                  setLeaugeData([]);
                  setSummoner(res.data);
                  navigate(`/summoner/userName=${summonerName}`);
              }
          })
          .catch((e) => { 
            console.error(e);       
          });
        } }
        className="SummonerName"
      >
        {summonerName}
      </a>
    </div>
  );
};

  const TeamLists = ({matchData}) => {
    
  return (
    <div className="GR6">
      <span className="Team1">
            {matchData.info.participants.slice(0,5).map((player, idx) => (
              <PlayerStick
                imageUrl={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${player.championName === "FiddleSticks" ? "Fiddlesticks" : player.championName}.png`}
                summonerName={player.summonerName}
                key={`Game_${matchData.info.gameId}PlayerStick_${player.summonerName}_${idx}`}
              />
            ))}
      </span>
      <span className="Team2">
            {matchData.info.participants.slice(5,10).map((player, idx) => (
              <PlayerStick
                imageUrl={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${player.championName === "FiddleSticks" ? "Fiddlesticks" : player.championName}.png`}
                summonerName={player.summonerName}
                key={`Game_${matchData.info.gameId}PlayerStick_${player.summonerName}_${idx}`}
              />
            ))}
      </span>
    </div>
  );
};
const returnObj = {
  code : "",
  text : "",
  color : ""
};
const MemoTeamLists = React.memo(TeamLists);
const ParseWin = (_win , _gameDuration) => {
    if(_gameDuration <  195){
      returnObj.code = 'remake';
      returnObj.msg = '다시하기';
      returnObj.color = "rgb(172 192 193)";
    }else if(_win){
      returnObj.code = 'victory';
      returnObj.msg = '승리';
      returnObj.color = "rgb(125, 160, 227)";
    }else if(!_win){
      returnObj.code = 'defeat';
      returnObj.msg = '패배';
      returnObj.color = "rgb(217 149 146)";
    }
          
  return returnObj;
}

const GameRecord = ({matchData,myInfoData}) => {
  const vd =  ParseWin(myInfoData.win,matchData.info.gameDuration);  
  
  const qType = (_q) =>{
    let returnVal;
    switch(_q){
      case 400:
      case 430:
      returnVal = "일반";
      break;
      case 420:
      returnVal = "솔랭";
      break;
      case 440:
      returnVal = "자유 5:5 랭크";
      break;
      case 450:
      returnVal = "무작위 총력전";
      break;
      case 830: 
      returnVal = "초보";
      break;
        case 840:
      returnVal = "중급";
      break;
        case 850:
      returnVal = "고수";
      break;
      case 900:
      returnVal = "우르프";
      break;
      case 920:
      returnVal = "포로왕";
      break;
      case 1020:
      returnVal = "단일";
      break;
      case 1300:
      returnVal = "돌넥";
      break;
      case 1400:
      returnVal = "궁주문서";
      break;
      case 2000:
      case 2010:
      case 2020:
      returnVal = "튜토리얼";
      break;
    }
   return returnVal;
  }

  const spellInfo = (_code) => {
    let returnVal = Object.keys(summonerSpell.data).find(_key => {
              if(Number(summonerSpell.data[_key].key) === _code){
                return summonerSpell.data[_key].id;
              }
    });
    return returnVal;
  }

  const runeInfo = (_code,_subCode,_type) => {
    let mainIdx = rune.findIndex(data =>  data.id === _code);
    let detailRune = rune[mainIdx].slots[0].runes.find(subData => subData.id === _subCode);

    if(_type === "main"){
      return detailRune.icon;
    }else{
      return rune[mainIdx].icon;
    }
      
  }

  const itemInfo = (_code) => {
    let returnVal = item.data[_code];
    return returnVal;
  }

  const ItemWrapper = (_code,_num) => {

    if(_code === undefined || _code === null || _code === "0" || _code === 0) {
      return (
        <div className="ItemWrapper">
           <div style={ {   "display" : "block",
                            "width" : "20px",
                            "height" : "20px",
                            "objectFit" : "fill",
                            "borderRadius" : "5px",
                            "backgroundColor" : returnObj.color
                             }}
    ></div>
        </div>
      )
    }
    return (
            <div className="ItemWrapper">
            <img
              className="Item"
              src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${_code}.png`}
              alt=""
              data-tip
              data-for={`item${_num}${matchData.info.gameId}${matchData.metadata.matchId}`}
            />
            <ReactTooltip
              id={`item${_num}${matchData.info.gameId}${matchData.metadata.matchId}`}
            >
                <div className="ItemTooltip">
                  <b className="TooltipItemName">
                    {itemInfo(_code).name}
                  </b>
                  <br />
                <span className="TooltipItemPlainText">
                    {itemInfo(_code).description.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n').replace(/<[^>]*>?/g, '')}
                </span>
                <br />
                <span>Cost: </span>
                <span className="TooltipItemPrice">
                    {itemInfo(_code).gold.total}
                    ({itemInfo(_code).gold.base})
                </span>
              </div>
              
            </ReactTooltip>
        </div>
    )
  }

  const champInfo = (_code) => {
    let returnVal = champ.data[_code];
    return returnVal;
  }

  const killLog = () =>{
    let returnVal = "";

    if(myInfoData.firstBloodKill)
      returnVal="퍼블킬";
    if(myInfoData.doubleKills > 0)
      returnVal="더블킬";
    if(myInfoData.tripleKills > 0)
      returnVal="트리플킬"; 
    if(myInfoData.quadraKills > 0)
      returnVal="쿼드라킬"; 
    if(myInfoData.pentaKills > 0)
      returnVal="펜타킬"; 

    if(returnVal === "")
      return false;

    return (
      <div className="Badge kill">
        {returnVal}
      </div>
    );

  }

  const kdaInfo = (_k,_d,_a) => {
    let returnVal = 0;

    try{
      if(_k !== 0 && _d !== 0 && _a !== 0){
        returnVal = ((_k + _a ) / _d);
      }else if(_d === 0){
        returnVal = "Perfect";
      }
    }catch(err){
      returnVal = 0;
    }

    if(!isNaN(returnVal) && returnVal > 0){
      returnVal = returnVal.toFixed(2);
    }

    return returnVal;
  }

  function getTime(_date){
    try{ 

      const start = new Date(_date);
      const end = new Date(); // 현재 날짜
  
      const diff = (end - start); // 경과 시간
  
      const times = [
        {time: "분", milliSeconds: 1000 * 60},
        {time: "시간", milliSeconds: 1000 * 60 * 60},
        {time: "일", milliSeconds: 1000 * 60 * 60 * 24},
        {time: "달", milliSeconds: 1000 * 60 * 60 * 24 * 30},
        {time: "년", milliSeconds: 1000 * 60 * 60 * 24 * 365},
      ].reverse();
  
      for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);
        
        if (betweenTime > 0) {
           return `${betweenTime}${value.time} 전`;
        }
      }
      return "방금 전";

    }catch(err){
      console.log(err);
      return "";
    }
  }


  

  return (
    <div className={`GameRecord ${vd.code}`}>
      <div className="GR1">
        <div className="GameType">{qType(matchData.info.queueId)}</div>
        <span className="TimeAgo">{getTime(matchData.info.gameStartTimestamp)}</span>
        <div className="Divider"></div>
        <div className={`Outcome ${vd.code}`}>{vd.msg}</div>
        <div className="PlayTime">
          { Math.floor(matchData.info.gameDuration / 60) }분 { Math.floor(matchData.info.gameDuration % 60 ) }초
        </div>
      </div>
      <div className="GR2">
        <div className="ChampVisuals">
          <img
            className="ChampAvatar"
            src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${myInfoData.championName}.png`}
            alt="ChampAvatar"
          />
          <div className="Spells">
            <img className="Spell" src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${spellInfo(myInfoData.summoner1Id)}.png`} alt="Spell" />
            <img className="Spell" src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${spellInfo(myInfoData.summoner2Id)}.png`} alt="Spell" />
          </div>
          <div className="Runes">
            <img className="Rune" src={`http://ddragon.leagueoflegends.com/cdn/img/${runeInfo(myInfoData.perks.styles[0].style,myInfoData.perks.styles[0].selections[0].perk,"main")}`} alt="Rune" />
            <img className="Rune" src={`http://ddragon.leagueoflegends.com/cdn/img/${runeInfo(myInfoData.perks.styles[1].style,myInfoData.perks.styles[1].selections[0].perk,"sub")}`} alt="Rune" />
          </div>
        </div>
        <div className="ChampName">{ champInfo(myInfoData.championName).name }</div>
      </div>
      <div className="GR3">
        <div className="KDASeperated">
          <span className="K">{myInfoData.kills}</span>/
          <span className="D">{myInfoData.deaths}</span>/
          <span className="A">{myInfoData.assists}</span>
        </div>
        <div className="KDAScoreContainer">
          <span className="KDAScore">{kdaInfo(myInfoData.kills,myInfoData.deaths,myInfoData.assists)}</span>
          <span className="KDAScoreSuffix">평점</span>
        </div>
        <div className="Badges">
          
              {killLog()}

          
            {/* <div className="Badge ace">ACE</div>  */}
          
        </div>
      </div>
      <div className="GR4">
        <div className="Level">{`level ${myInfoData.champLevel}`}</div>
        <div className="CS">
          {myInfoData.totalMinionsKilled + myInfoData.neutralMinionsKilled} ({ ((myInfoData.totalMinionsKilled + myInfoData.neutralMinionsKilled) / (matchData.info.gameDuration / 60)).toFixed(1) }) CS
        </div>
        <div className="PKill">
          P/Kill
        </div>
            {
              /* 
                <div className="TierAverage">평균티어</div>
                <div className="Tier"></div>  
              */
            }
      </div>
      <div className="GR5">

        <div className="Items">
            {ItemWrapper(myInfoData.item0,0)}
            {ItemWrapper(myInfoData.item1,1)}
            {ItemWrapper(myInfoData.item2,2)}
            {ItemWrapper(myInfoData.item3,3)}
            {ItemWrapper(myInfoData.item4,4)}
            {ItemWrapper(myInfoData.item5,5)}
            {ItemWrapper(myInfoData.item6,6)}
        </div>
        <div className="ControlWardCount">
          <img className="ControlWard" src={redWard} alt="제어와드" />
          제어와드 {myInfoData.detectorWardsPlaced}
        </div>

      </div>

      <MemoTeamLists matchData={matchData} />
    </div>
  );
};

export default GameRecord;

