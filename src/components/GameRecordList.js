import React from "react";

import GameRecord from "./GameRecord";

function GameRecordList(){
  const gameType = [];
  const games = [];

  if (games === undefined) {
    return <div className="GameRecords" />;
  }

  const filteredGames = games.filter((game) => {
    if (gameType === "Total") return true;
    if (gameType === "Ranked Flex") {
      return game.gameType === "Flex 5:5 Rank";
    }

    return game.gameType === gameType;
  });

  if (1 === 2) return null;

  return (
    <div className="GameRecords">
      {/*filteredGames.map((game) => (
        ))*/}
        <GameRecord
          //key={`GameRecord_${game.summonerId}_${game.createDate}`}
        />
      
    </div>
  );
};

export default GameRecordList;
