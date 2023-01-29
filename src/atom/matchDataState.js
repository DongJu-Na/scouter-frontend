import { atom, selector } from "recoil";
import { summonerDataState } from "./summonerDataState";

export const matchDataState = atom({
    key : "matchDataState",
    default : []
});

export const matchStatDataState = selector({
    key: 'matchStatDataState', //
    get: ({get}) => {
      const match = get(matchDataState);
      const sd = get(summonerDataState);
      const returnObj = {
        "win" : 0,
        "loss" : 0,
        "kills" : 0,
        "assists" : 0,
        "deaths" : 0,
        "TOP" : 0,
        "JUG" : 0,
        "MID" : 0,
        "ADC" : 0,
        "SUP" : 0,
      }

      for(let x=0;x < match.length; x++){
        for(let y=0; y < match[x].info.participants.length; y++){
          if(match[x].info.participants[y].summonerId === sd.id){
              if(match[x].info.participants[y].win){
                returnObj.win++;
              }else{
                returnObj.loss++;
              }

              returnObj.kills += match[x].info.participants[y].kills;
              returnObj.deaths += match[x].info.participants[y].deaths;
              returnObj.assists += match[x].info.participants[y].assists;
  
              if(match[x].info.participants[y].lane === "TOP"){
                returnObj.TOP++;
              }
              if(match[x].info.participants[y].lane === "JUNGLE"){
                returnObj.JUG++;

              }if(match[x].info.participants[y].lane === "MIDDLE"){
                returnObj.MID++;

              }if(match[x].info.participants[y].lane === "BOTTOM"){
                returnObj.ADC++;

              }if(match[x].info.participants[y].lane === "SUPPORT"){
                returnObj.SUP++;
              }
          }
        }
      }
  
      return returnObj;
    },
});