import React, { useCallback, useReducer, useState } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { colorOfKDA, colorOfScore, colorOfWinRatio } from "../util/colors";
import { toFloatPrecision as fp } from "../util/numbers";
import { matchDataState, matchStatDataState } from "../atom/index";

import { useRecoilValue } from "recoil";

/*
import SupImg from "../assets/mostpositions/sup.png";
import AdcImg from "../assets/mostpositions/adc.png";
import MidImg from "../assets/mostpositions/mid.png";
import TopImg from "../assets/mostpositions/top.png";
import JngImg from "../assets/mostpositions/jungle.png";
*/

function Summary(){
  const match = useRecoilValue(matchDataState);
  const stat = useRecoilValue(matchStatDataState);
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  const chartDataFactory = useCallback(() => {
    
    return {
      "datasets" : [
        {
          "data" : [stat.loss, stat.win],
          "backgroundColor": ["#ee5a52", "#1f8ecd"],
          "borderWidth": 0,
        },
      ],
    };
  }, [match]);

  /* 
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
*/
  
  return (
    <div className="Summary">
      <div className="OveralWinRate">
        <div className="Left">
          <div className="CurrentTwentyGames">
            {stat.win + stat.loss}G {stat.win}W {stat.loss}L
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
              {fp(stat.win * 100, stat.win + stat.loss, 0)}%
            </div>
          </div>
        </div>
        <div className="Right">
          <div className="AverageKDAs">
            <div className="AverageKill">
              {fp(stat.kills, stat.win + stat.loss)}
            </div>
            /
            <div className="AverageDeath">
            {fp(stat.deaths, stat.win + stat.loss)}
            </div>
            /
            <div className="AverageAssist">
            {fp(stat.assists, stat.win + stat.loss)}
            </div>
          </div>
          <div className="Avg">
            <div
              className={`KDARatio ${colorOfKDA(
                (stat.kills + stat.assists) / stat.deaths
              )}`}
            >
              {fp(stat.kills + stat.assists, stat.deaths, 2)}:1
            </div>
            (
            <div
              className={`WinRatio ${colorOfWinRatio(
                stat.win / (stat.win + stat.loss)
              )}`}
            >
              {fp(stat.win * 100, stat.win + stat.loss, 0)}%
            </div>
            )
          </div>
        </div>
      </div>
      {
        /*    

              <div className="MostChampWinRatios">
                    <div
                      className="MostChampWinRatio"
                      key={`MostChampWinRatio_소환사명_1`}
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
        */
      }

    </div>
  );
};

export default Summary;

