import React, { useEffect, useState } from "react";


import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import QuickLook from "../components/QuickLook";
import Summary from "../components/Summary";
import RankGameOverView from "../components/RankGameOverView";
import GameRecordList from "../components/GameRecordList";
import WinRatioSummary from "../components/WinRatioSummary";

import { useRecoilState, useRecoilValue } from "recoil";
import { summonerDataState , summonerLeagueDataState , matchDataState , matchIdDataState } from "../atom";

import { httpUrl } from "../util/urlMapper";
import axios from "axios";

function Summoner() {
    const summonerData = useRecoilValue(summonerDataState);
    const [leaugeData,setLeaugeData] = useRecoilState(summonerLeagueDataState);
    const [matchId,setMatchId] = useRecoilState(matchIdDataState);
    const [match,setMatch] = useRecoilState(matchDataState);

    const [gameType , setGameType] = useState('Total');

    useEffect(()=>{
        getLeagueInfo(summonerData.id);
    },[summonerData])

    const getLeagueInfo = (query) => {
        if(query === "") return false;
        
        axios({
            method: 'get',
            url: httpUrl.getLeagueInfo + query,
            withCredentials: true,
            data: { }
          }).then((res)=>{
            console.log("getLeagueInfo",res);
            
            if(res.status === 200){
                setLeaugeData(res.data);
            }
            
          }).catch((err)=>{
            console.log(err);
          });
    }

    const getMatchId = async (query) => {
        if(query === "") return false;
        
        await axios({
            method: 'get',
            url: httpUrl.getMatchId + query,
            withCredentials: true,
            data: { }
          }).then((res)=>{
            console.log("getMatchId",res);
            
            if(res.status === 200){
                setLeaugeData(res.data);
            }
            
          }).catch((err)=>{
            console.log(err);
          });
    }

    const getMatchDetail = async (query) => {
        if(query === "") return false;
        
        await axios({
            method: 'get',
            url: httpUrl.getMatchDetail + query,
            withCredentials: true,
            data: { }
          }).then((res)=>{
            console.log("getMatchDetail",res);
            
            if(res.status === 200){
                setLeaugeData(res.data);
            }
            
          }).catch((err)=>{
            console.log(err);
          });
    }

    


    return (
                <div className="Summoner">
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
                    <WinRatioSummary />
                </div>
                <div className="RealContent">
                    <div className="QueueTypes">
                    <div
                        className={`QueueType ${gameType === "Total" ? "Selected" : ""}`}
                        onClick={(e) => {setGameType('Total')}}
                    >
                        전체
                    </div>
                    <div
                        className={`QueueType ${gameType === "Ranked Solo" ? "Selected" : ""}`}
                        onClick={(e) => {setGameType('Ranked Solo')}}
                    >
                        솔로랭크
                    </div>
                    <div    
                        className={`QueueType ${gameType === "Ranked Flex" ? "Selected" : ""}`}
                        onClick={(e) => {setGameType('Ranked Flex')}}
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