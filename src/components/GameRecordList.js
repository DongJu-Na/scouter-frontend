import React, { useEffect } from "react";

import GameRecord from "./GameRecord";


function GameRecordList({matchId}){

    useEffect(()=>{
      console.log("GameRecordList > " + matchId);
    },[])

  if(matchId === undefined || matchId === null){
    return false;
  }
  

  return (
    <div className="GameRecords">
      
        <GameRecord
        />
      
    </div>
  );
};

export default GameRecordList;
