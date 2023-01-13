import React, { useCallback } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { colorOfKDA, colorOfScore, colorOfWinRatio } from "../util/colors";
import { toFloatPrecision as fp } from "../util/numbers";
import { summaryDataState  , championsDataState , summonerDataState } from "../atom/index";

import { useRecoilState } from "recoil";

import SupImg from "../assets/mostpositions/sup.png";
import AdcImg from "../assets/mostpositions/adc.png";
import MidImg from "../assets/mostpositions/mid.png";
import TopImg from "../assets/mostpositions/top.png";
import JngImg from "../assets/mostpositions/jungle.png";


function Summary(){
  const [summary,setSummary] = useRecoilState(summaryDataState);
  const [champions,setChampions] = useRecoilState(championsDataState);
  const [positions,setPositions] = useRecoilState(summonerDataState);

  ChartJS.register(ArcElement, Tooltip, Legend);
  const chartDataFactory = useCallback(() => {
    return {
      "datasets" : [
        {
          "data" : [80, 20],
          "backgroundColor": ["#ee5a52", "#1f8ecd"],
          "borderWidth": 0,
        },
      ],
    };
  }, [summary]);

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

  if (
    summary === undefined ||
    champions === undefined ||
    positions === undefined
  ) {
    return <div className="Summary" />;
  }

  return (
    <div className="Summary">
      <div className="OveralWinRate">
        <div className="Left">
          <div className="CurrentTwentyGames">
            {100 + 50}G {100}W {50}L
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
              {fp(100 * 100, 100 + 50, 0)}%
            </div>
          </div>
        </div>
        <div className="Right">
          <div className="AverageKDAs">
            <div className="AverageKill">
              {fp(200, 100 + 50)}
            </div>
            /
            <div className="AverageDeath">
              {fp(50, 100 + 50)}
            </div>
            /
            <div className="AverageAssist">
              {fp(50, 100 + 50)}
            </div>
          </div>
          <div className="Avg">
            <div
              className={`KDARatio ${colorOfKDA(
                (200 + 50) / 50
              )}`}
            >
              {fp(200 + 50, 50, 2)}:1
            </div>
            (
            <div
              className={`WinRatio ${colorOfWinRatio(
                100 / (100 + 50)
              )}`}
            >
              {fp(100 * 100, 100 + 50, 0)}%
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
                    (100W 50L)
                  </span>
                  <span
                    className={`KDA ${colorOfScore(
                      (100 + 20) / 50
                    )}`}
                  >
                    {fp(50 + 50, 30, 2)} KDA
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
                    {fp(100 * 100, 20, 0)}%
                  </span>
                  <span className="WRPrefix">Win Ratio</span>
                  <span
                    className={`WinRatio ${colorOfWinRatio(
                      150 / 20
                    )}`}
                  >
                    {fp(130 * 100, 30, 0)}%
                  </span>
                </div>
              </div>
            </div>
     
      </div>
    </div>
  );
};

export default Summary;
