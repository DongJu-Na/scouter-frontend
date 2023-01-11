import React from "react";


import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import QuickLook from "../components/QuickLook";
import Summary from "../components/Summary";
import RankGameOverView from "../components/RankGameOverView";
import GameRecordList from "../components/GameRecordList";
import WinRatioSummary from "../components/WinRatioSummary";

import { useRecoilValue } from "recoil";
import { summonerDataState } from "../atom";

function Summoner() {
    const summonerData = useRecoilValue(summonerDataState);


    return (
                <div className="Summoner">
                <SearchBar />
                <QuickLook summonerData={summonerData} />
                <main className="SummonerBody">
                <div className="SideContent">
                    <RankGameOverView rankType="솔로랭크" />
                    <RankGameOverView rankType="자유랭크" />
                    <WinRatioSummary />
                </div>
                <div className="RealContent">
                    <div className="QueueTypes">
                    <div
                        className="QueueType ${gameType === 'Total' ? 'Selected' : ''}"
                        onClick={(e) => {}}
                    >
                        전체
                    </div>
                    <div
                        className={'QueueType ${gameType === "Ranked Solo" ? "Selected" : ""}'}
                        onClick={(e) => {}}
                    >
                        솔로랭크
                    </div>
                    <div
                        className={'QueueType ${ gameType === "Ranked Flex" ? "Selected" : ""}'}
                        onClick={(e) => { 'dispatch(switchGameType({ gameType: "Ranked Flex" }));'
                        }}
                    >
                        자유랭크
                    </div>
                    </div>
                    <Summary />    
                    <GameRecordList />
                    
                    
                </div>
                </main>

                <Footer />
            </div>
         );
};

export default Summoner;