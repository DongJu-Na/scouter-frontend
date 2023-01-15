import React, { useCallback, useReducer, useState } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { colorOfKDA, colorOfScore, colorOfWinRatio } from "../util/colors";
import { toFloatPrecision as fp } from "../util/numbers";
import { matchDataState, summonerDataState } from "../atom/index";

import { useRecoilValue } from "recoil";

import SupImg from "../assets/mostpositions/sup.png";
import AdcImg from "../assets/mostpositions/adc.png";
import MidImg from "../assets/mostpositions/mid.png";
import TopImg from "../assets/mostpositions/top.png";
import JngImg from "../assets/mostpositions/jungle.png";


function Summary(){
  const match = useRecoilValue(matchDataState);
  const summonerData = useRecoilValue(summonerDataState);
  const [total,setTotal] = useState({
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
  });

  const totalData = useCallback(()=>{
    let win=0,loss=0,kills=0,deaths=0,assists=0,TOP=0,JUG=0,MID=0,ADC=0,SUP=0;
    for(let x=0;x < match.length; x++){
      for(let y=0; y < match[x].participants.length; y++){
        if(match[x].participants[y].summonerId === summonerData.id){
            if(match[x].participants[y].win){
              win++;
            }else{
              loss++;
            }

            if(match[x].participants[y].teamPosition === "TOP"){
              TOP++;
            }else if(match[x].participants[y].teamPosition === "JUG"){
              JUG++;
            }else if(match[x].participants[y].teamPosition === "MID"){
              MID++;
            }else if(match[x].participants[y].teamPosition === "ADC"){
              ADC++;
            }else if(match[x].participants[y].teamPosition === "SUP"){
              SUP++;
            }
        }
      }
    }

    return {
      "data" : {
        "win" : win,
        "loss" : loss,
        "kills" : kills,
        "assists" : assists,
        "deaths" : deaths,
        "TOP" : TOP,
        "JUG" : JUG,
        "MID" : MID,
        "ADC" : ADC,
        "SUP" : SUP,
      }
    }
  },[match]);

  ChartJS.register(ArcElement, Tooltip, Legend);
  const chartDataFactory = useCallback(() => {
    
    return {
      "datasets" : [
        {
          "data" : [total.win, total.loss],
          "backgroundColor": ["#ee5a52", "#1f8ecd"],
          "borderWidth": 0,
        },
      ],
    };
  }, [match]);

  const positionImgFactory = (position) => {
    if (position === "ADC")
        return AdcImg;
    if (position === "JNG")
        return JngImg;
    if (position === "MID")
        return MidImg;
    if (position === "SUP")
        return SupImg;
    if (position === "TOP")
        return TopImg;
  };
  
  return (
    <div className="Summary">
      <div className="OveralWinRate">
        <div className="Left">
          <div className="CurrentTwentyGames">
            {total.win + total.loss}G {total.win}W {total.loss}L
          </div>
          <div className="ChartContainer">
            <Pie
              type
              data={chartDataFactory()}
              options={{
                tooltips: { enabled: false },
                // hover: { mode: null },
              }}
            />
            <div className="CurrentWinRatio">
              {fp(total.win * 100, total.win + total.loss, 0)}%
            </div>
          </div>
        </div>
        <div className="Right">
          <div className="AverageKDAs">
            <div className="AverageKill">
              {fp(total.kills, total.win + total.loss)}
            </div>
            /
            <div className="AverageDeath">
            {fp(total.deaths, total.win + total.loss)}
            </div>
            /
            <div className="AverageAssist">
            {fp(total.assists, total.win + total.loss)}
            </div>
          </div>
          <div className="Avg">
            <div
              className={`KDARatio ${colorOfKDA(
                (total.kills + total.assists) / total.deaths
              )}`}
            >
              {fp(total.kills + total.assists, total.deaths, 2)}:1
            </div>
            (
            <div
              className={`WinRatio ${colorOfWinRatio(
                total.win / (total.win + total.loss)
              )}`}
            >
              {fp(total.win * 100, total.win + total.loss, 0)}%
            </div>
            )
          </div>
        </div>
      </div>
      <div className="MostChampWinRatios">
        {/*champions.map((champ, idx) => {
          return (     );
        })*/}
            <div
              className="MostChampWinRatio"
              key={`MostChampWinRatio_소환사명_1`}
              /* Key 안전하지 않을 수 있음 */
            >
              <img className="ChampAvatar" src="" alt="" />
              <div className="RContainer">
                <div className="Up">""</div>
                <div className="Down">
                  <span
                    className={`WinRatio ${colorOfWinRatio(
                      100 / 50
                    )}`}
                  >
                    {fp(100 * 100, 150, 0)}%
                  </span>
                  <span className="WinLoose">
                    (0W 0L)
                  </span>
                  <span
                    className={`KDA ${colorOfScore(
                      (0 + 0) / 0
                    )}`}
                  >
                    {fp(0 + 0, 0, 0)} KDA
                  </span>
                </div>
              </div>
            </div>
     
      </div>
      <div className="PreferredPosition">
        <div className="Title">Preferred Position(Rank)</div>
        { /* positions.map((position, idx) => {
          return (
            );
          })
        */}
            <div
              className="LaneInfo"
              key={`LaneInfo_Top_1`}
            >
              <img
                className="LaneIcon"
                src={positionImgFactory("TOP")}
                alt="Top"
              />
              <div className="Right">
                <div className="Up">Top</div>
                <div className="Down">
                  <span className="PickRatio">
                    {fp(0 * 0, 0, 0)}%
                  </span>
                  <span className="WRPrefix">Win Ratio</span>
                  <span
                    className={`WinRatio ${colorOfWinRatio(
                      0 / 0
                    )}`}
                  >
                    {fp(0 * 0, 0, 0)}%
                  </span>
                </div>
              </div>
            </div>
     
      </div>
    </div>
  );
};

export default Summary;

