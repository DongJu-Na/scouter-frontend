import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import QuickLook from "../components/QuickLook";
import Summary from "../components/Summary";
import RankGameOverView from "../components/RankGameOverView";
import GameRecordList from "../components/GameRecordList";
import WinRatioSummary from "../components/WinRatioSummary";

import { useRecoilState, useRecoilValue } from "recoil";
import { summonerDataState , summonerLeagueDataState , matchDataState } from "../atom";

import { httpGet } from "../util/apiClient";
import { httpUrl } from "../util/urlMapper";

function Summoner() {
    const summonerData = useRecoilValue(summonerDataState);
    const [leaugeData,setLeaugeData] = useRecoilState(summonerLeagueDataState);
    const [match,setMatch] = useRecoilState(matchDataState);

    const [gameType , setGameType] = useState('Total');

    useEffect(()=>{
        console.log("useEffect", summonerData);
        if(summonerData){
            getLeagueInfo(summonerData.id);
            getMatchesInfo(summonerData.puuid);
        }
    },[summonerData]);

    const getLeagueInfo = (query) => {
        if(query === "") return false;

        httpGet(httpUrl.getLeagueInfo + query, {})
        .then((res) => {
            console.log(res);
            if(res.status === 200){
                if(res.data.length ===0){
                    setLeaugeData([]);
                }else if(res.data.length > 0){
                    setLeaugeData(res.data);
                }
            }
        })
        .catch((e) => { 
          console.error(e);       
        });
    }

    const getMatchesInfo = (query) => {
        if(query === "") return false;
        
        httpGet(httpUrl.getMatchesInfo + query, {})
        .then((res) => {
            console.log(res);
            if(res.status === 200){
                if(res.data.length ===0){
                    setMatch([]);
                }else if(res.data.length > 0){
                    setMatch(res.data);
                }
            }
        })
        .catch((e) => { 
          console.error(e);       
        });

    }

    return (
                <div className="Summoner">
                <Header />
                <SearchBar />
                <QuickLook />
                <main className="SummonerBody">
                <div className="SideContent">
                    {
                        leaugeData.length === 0 ? 
                        <>
                            <RankGameOverView rankType="RANKED_SOLO_5x5" data={undefined} />
                            <RankGameOverView rankType="RANKED_FLEX_SR" data={undefined} />
                        </>
                        :
                        leaugeData.map((item,idx)=>{
                            return (
                                <RankGameOverView key={`RankGameOverView${idx}`} rankType={item.queueType} data={item} />
                            );
                        })
                    }
                    {/*<WinRatioSummary />*/}
                    <Summary/>
                </div>
                <div className="RealContent">
                   
                            <div className="QueueTypes">
                                <div
                                    className={`QueueType ${gameType === "Total" ? "Selected" : ""}`}
                                    onClick={() => {setGameType('Total')}}
                                >
                                    전체
                                </div>
                                <div
                                    className={`QueueType ${gameType === "Ranked Solo" ? "Selected" : ""}`}
                                    onClick={() => {setGameType('Ranked Solo')}}
                                >
                                    솔로랭크
                                </div>
                                <div    
                                    className={`QueueType ${gameType === "Ranked Flex" ? "Selected" : ""}`}
                                    onClick={() => {setGameType('Ranked Flex')}}
                                >
                                    자유랭크
                                </div>
                            </div>   
                    
                    
                    {
                        match.map((item,idx)=>{
                            return(
                                <GameRecordList key={idx} matchData={item} />
                            )
                        })
                    }    
                </div>
                </main>

                <Footer />
            </div>
         );
};

export default Summoner;