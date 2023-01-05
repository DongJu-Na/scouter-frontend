import React from "react";
import { useParams } from "react-router-dom";

import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import QuickLook from "../components/QuickLook";
import Summary from "../components/Summary";
import RankGameOverView from "../components/RankGameOverView";

function Summoner() {

    const { userName } = useParams(); // pathVariable = id (경로의 변수 담아서 전달)
    console.log(userName); // id check (콘솔에 출력)

    return (
                <div className="Summoner">
                <SearchBar />
                <QuickLook />
                <main className="SummonerBody">
                <div className="SideContent">
                    <RankGameOverView rankType="Ranked Solo" />
                    <RankGameOverView rankType="Flex 5:5 Rank" />
                    <></>
                </div>
                <div className="RealContent">
                    <div className="QueueTypes">
                    <div
                        className="QueueType ${gameType === 'Total' ? 'Selected' : ''}"
                        onClick={(e) => {}}
                    >
                        Total
                    </div>
                    <div
                        className={'QueueType ${gameType === "Ranked Solo" ? "Selected" : ""}'}
                        onClick={(e) => {}}
                    >
                        Ranked Solo
                    </div>
                    <div
                        className={'QueueType ${ gameType === "Ranked Flex" ? "Selected" : ""}'}
                        onClick={(e) => { 'dispatch(switchGameType({ gameType: "Ranked Flex" }));'
                        }}
                    >
                        Ranked Flex
                    </div>
                    </div>
                    <Summary />
                    {/* 
                        
                        <GameRecordList />
                    */}
                    
                </div>
                </main>

                <Footer />
            </div>
         );
};

export default Summoner;