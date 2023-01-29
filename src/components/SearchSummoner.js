import React, { useRef, useState , useEffect  } from "react";

import GGSvg from "../assets/GG.svg";
import {StarIcon , CloseIcon} from "../assets/svgIcon"

import useOnClickOutside from "../util/useOnClickOutside";

import { useRecoilState, useSetRecoilState } from "recoil";
import { summonerState , summonerDataState, matchDataState, summonerLeagueDataState} from "../atom/index";

import { useNavigate } from "react-router-dom";

import { httpGet } from "../util/apiClient";
import { httpUrl } from "../util/urlMapper";

function SearchSummoner(){
    const wrapperRef = useRef(null);
    const [focus,setFocus] = useState(false);
    const [keyword,setKeyword] = useState('');
    const [tabKey, setTabKey] = useState("recent");
    const [list , setList] = useRecoilState(summonerState);
    const setSummoner = useSetRecoilState(summonerDataState);
    const setMatch = useSetRecoilState(matchDataState);
    const setLeaugeData = useSetRecoilState(summonerLeagueDataState);

    const navigate = useNavigate();
    
    useEffect(()=>{

    },[])

    const onKeyDown = (e) =>{
        if (e.key === "Enter") {
            if (e.target.value === "")
              return false;

            onSearch(keyword,"recent");
          }
    }
    const onChange = (e) => {
        setKeyword(e.target.value);
    }

    const onSearch = (query,sType) => {
        let findIndex = list[sType].findIndex(data => data.name === query);
        let copyArray = [...list[sType]];

        if(copyArray.length > 5){
            copyArray.splice(copyArray.length - 1);
        }  
 
        if(findIndex === -1 ){
            copyArray.unshift({ "name" : query, "favoritesFlag" : false });
        }else if(findIndex !== -1 ){    
            // copyArray.splice(0, 0, copyArray[findIndex]);
            
            getSummoner(query,sType,copyArray);          
            return false;    
        }
        getSummoner(query,sType,copyArray);                
    }

    const  getSummoner =  (query,sType,copyArray) => {
        if(query === "") return false;

        httpGet(httpUrl.getSummoner + query, {})
        .then((res) => {
            if(res.status === 200){
                setList((prevVal)=>({
                    ...prevVal,
                    [sType] :  copyArray
                }));
                setMatch([]);
                setLeaugeData([]);
                setSummoner(res.data);
                navigate(`/summoner/userName=${query}`);
            }
        })
        .catch((e) => { 
          console.error(e);       
        });

    }

    const onFavorites = (rowData) => {
        let copyArray = [...list["recent"]];
        let findIndex = copyArray.findIndex(data => data.name === rowData.name);
    
        if(findIndex !== -1 ){            
            let _flag = !copyArray[findIndex].favoritesFlag;
            copyArray[findIndex] = {...copyArray[findIndex] , "favoritesFlag" : _flag};

            setList((prevVal)=>({
                ...prevVal,
                "recent" : copyArray
            }));

            let fCopyArray = [...list["favorites"]];                
            let fFindIndex = fCopyArray.findIndex(data => data.name === copyArray[findIndex].name);
            
            if(_flag){    
                fCopyArray.unshift(copyArray[findIndex]);
                setList((prevVal)=>({
                    ...prevVal,
                    "favorites" : fCopyArray
                }));
            }else if(!_flag && fFindIndex !== -1){
                setList((prevVal)=>({
                    ...prevVal,
                    "favorites" : fCopyArray.filter((data) => data.name !== copyArray[findIndex].name)
                }));
            }    
        }
    }

    const onDelete = (rowData , sType) => {
        let copyArray = [...list[sType]];

        setList((prevVal)=>({
            ...prevVal,
            [sType] : copyArray.filter((data) => 
                data.name !== rowData.name
            )
        }));

        if(sType === "favorites"){
            let rCopyArray = [...list["recent"]];
            let rFindIndex = rCopyArray.findIndex(subData => subData.name === rowData.name);
            if(rFindIndex !== -1 ){ 
                rCopyArray[rFindIndex] = {...rCopyArray[rFindIndex] , "favoritesFlag" : false};
                setList((prevVal)=>({
                    ...prevVal,
                    "recent" : rCopyArray
                }));
            }
        }
    }

    useOnClickOutside(wrapperRef, ()=>setFocus(false));

    const GetSearchList = () => {
        return (
            tabKey === "recent" ? 
                // 최근검색
                 list[tabKey].length > 0 ?
                    list[tabKey].map((item, idx) => {
                        //
                                return(
                                    <div className="SummonerSearched" key={"div"+idx}>
                                        <span className="SummonerName" style={{"flex" : "1"}} onClick={() => onSearch(item.name,"recent")}>{item.name}</span>
                                        <span className="SummonerBtn">
                                            <button onClick={()=>onFavorites(item)}><StarIcon className={ item.favoritesFlag ? "active" : "" } /></button>
                                            <button onClick={()=>onDelete(item,tabKey+"")}><CloseIcon /></button>
                                        </span>
                                    </div>
                                )
                            })
                            :
                            <div className="SummonerSearched">
                                <span className="SummonerName">최근에 본 소환사가 없습니다.</span>
                            </div>

                    :
                    // 즐겨찾기
                    list[tabKey].length > 0 ?
                        list[tabKey].map((item, idx) => {
                            return(
                                <div className="SummonerSearched" key={"div"+idx}>
                                    <span className="SummonerName" style={{"flex" : "1"}} onClick={() => onSearch(item.name,"favorites")}>{item.name}</span>
                                    <span className="SummonerBtn">
                                        <button onClick={()=>onDelete(item,tabKey+"")}><CloseIcon /></button>
                                    </span>
                                </div>
                            )
                        })
                        :
                        <div className="SummonerSearched">
                            <span className="SummonerName">관심있는 소환사에 즐겨찾기
                                <span className="SummonerBtn" style={{"paddingRight" : 0 }}>
                                    <button>
                                        <StarIcon className="active" />
                                    </button>
                                </span>를 하여 편리하게 정보를 받아보세요.
                            </span>
                        </div>

        )
    }
    


    return (
        <div className="SummonerSearchInputWrapper" 
            ref={wrapperRef} 
            onFocus={()=>setFocus(true)}
        >
            <div className="SummonerSearchInput">
            <input 
                placeholder="소환사명,소환사명, ..."
                onKeyDown={onKeyDown}
                onChange={onChange}
            />
            <img height="14" src={GGSvg} alt="GG" />
            </div>

            {
                focus ? 
                <>
                    <div className="SummonerSearchSuggestsContainer">
                        <div className="TabContainer">
                            <div className={"SearchTabItemBtn " + (tabKey === "recent" ? "selected" : "")} onClick={()=>setTabKey("recent")}>최근검색</div>
                            <div className={"SearchTabItemBtn " + (tabKey === "favorites" ? "selected" : "")} onClick={()=>setTabKey("favorites")}>즐겨찾기</div>
                        </div>
                        <GetSearchList/>
                    </div>
                    
                </>
                    
                :
                <></>
            }

            
        </div>
    )
}

export default SearchSummoner;