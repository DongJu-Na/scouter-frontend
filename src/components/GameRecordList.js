import React from "react";

import { useRecoilValue } from "recoil";
import { summonerDataState } from "../atom";

import GameRecord from "./GameRecord";


function GameRecordList({matchData}){
  const summonerData = useRecoilValue(summonerDataState);  
  let returnVal;

  if(matchData === undefined || matchData === null){
    return false;
  }

  for(let x=0; x < matchData.info.participants.length ; x++){
    if(summonerData.id === matchData.info.participants[x].summonerId){
        returnVal = matchData.info.participants[x];
      break;
    }
  }

  return (
    <div className="GameRecords">
      
        <GameRecord matchData={matchData}
                    myInfoData={returnVal}
        />
      
    </div>
  );
};

export default GameRecordList;
