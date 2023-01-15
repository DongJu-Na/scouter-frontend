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

import { httpGet } from "../util/apiClient";
import { httpUrl } from "../util/urlMapper";
import axios from "axios";

function Summoner() {
    const summonerData = useRecoilValue(summonerDataState);
    const [leaugeData,setLeaugeData] = useRecoilState(summonerLeagueDataState);
    const [matchId,setMatchId] = useRecoilState(matchIdDataState);
    const [match,setMatch] = useRecoilState(matchDataState);

    const [gameType , setGameType] = useState('Total');

    useEffect(()=>{
        console.log("useEffect", summonerData);
        if(summonerData){
            getLeagueInfo(summonerData.id);
            getMatchId(summonerData.puuid);
        }
    },[summonerData]);

    /*
    useEffect(()=>{
        console.log("useEffect - 2");
            for(let x=0;x < matchId.length; x++){
                getMatchDetail(matchId[x]);
            }
            console.log("match",match);
    },[matchId]);
    */
    

    const getLeagueInfo = (query) => {
        if(query === "") return false;

        httpGet(httpUrl.t2 + query, {})
        .then((res) => {
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

    const getMatchId = (query) => {
        if(query === "") return false;

        httpGet(httpUrl.t3 + query + "/ids", {})
        .then((res) => {
            if(res.status === 200){
                if(res.data.length ===0){
                    setMatchId([]);
                }else if(res.data.length > 0){
                    setMatchId(res.data);
                }
            }
        })
        .catch((e) => { 
          console.error(e);       
        });

    }

    const getMatchDetail = (query) => {
        if(query === "") return false;
        
         axios({
            method: 'get',
            url: httpUrl.getMatchDetail + query,
            withCredentials: true,
            data: { }
          }).then((res)=>{
            
            if(res.status === 200){
                setMatch(res.data);
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
                    <Summary />
                    {
                        matchId.map((item,idx)=>{
                            return(
                                <GameRecordList key={idx} matchId={item} />
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