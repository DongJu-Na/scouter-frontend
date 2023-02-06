import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Headers from "../components/Header";
import Footer from "../components/Footer";

import { httpGet } from "../util/apiClient";
import { httpUrl } from "../util/urlMapper";
import { useRecoilState, useSetRecoilState } from "recoil";
import { matchDataState, rankingState , summonerDataState, summonerLeagueDataState, summonerState } from "../atom/";
import { toFloatPrecision as fp } from "../util/numbers";
import ProfileIcon from "../components/ProfileIcon";
import SearchSummoner from "../components/SearchSummoner";

const Ranking = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [respDto, setRespDto] = useState({});
  const [postPage, setPostPage] = useState(1);
  const [ranking,setRanking] = useRecoilState(rankingState);
  const [list , setList] = useRecoilState(summonerState);
  const setSummoner = useSetRecoilState(summonerDataState);
  const setMatch = useSetRecoilState(matchDataState);
  const setLeaugeData = useSetRecoilState(summonerLeagueDataState);

  useEffect(() => {
    getRankingInfo();
  }, []);

  const handleOnChange = (e) => {
    setUsername(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    navigate("/summoner/" + username);
  };

  const handlePrevPage = () => {
    let prevPage = postPage - 1;
    if (postPage < 1) {
      return;
    }
    setPostPage(prevPage);
  };
  const handleNextPage = () => {
    let nextPage = postPage + 1;
    setPostPage(nextPage);
  };

  const getRankingInfo = () =>{
    httpGet(httpUrl.getRankingInfo, {})
    .then((res) => {
      if(res.status === 200){
        setRanking(res);
      }
    })
    .catch((e) => { 
      console.error(e);       
    });
  }

  const searchSummoner=(_summonerName)=>{
    let findIndex = list["recent"].findIndex(data => data.name === _summonerName);
    let copyArray = [...list["recent"]];

    if(copyArray.length > 5){
      copyArray.splice(copyArray.length - 1);
    }  

    if(findIndex === -1 ){
      copyArray.unshift({ "name" : _summonerName, "favoritesFlag" : false });
    }

    httpGet(httpUrl.getSummoner + _summonerName, {})
    .then((res) => {
        if(res.status === 200){
            setList((prevVal)=>({
                ...prevVal,
                ["recent"] :  copyArray
            }));
            setMatch([]);
            setLeaugeData([]);
            setSummoner(res.data);
            navigate(`/summoner/userName=${_summonerName}`);
        }
    })
    .catch((e) => { 
      console.error(e);       
    });
  }

  return (
    <div className="ranking">
      <Headers/>
        <div className="wrap-container">
          <div className="pageHeaderWrap">
            <div className="menu">
              <div style={{ fontSize: "28px" , color : "white"}}>랭킹</div>
              <div className="SearchBar">
                <div className="SearchInputContainer">
                  <SearchSummoner />
                </div>
              </div>
            </div>
            <div className="pageDescription" style={{ paddingBottom: "32px" }}>
              {ranking.status === 200 && (
                <span className="text">
                  챌린저~마스터 구간에 총 {ranking.data.length}명의
                  소환사가 있습니다.
                </span>
              )}
              <small className="small">
                랭킹은 마스터 이상 소환사만 표시. 랭킹은 주기적으로
                갱신됩니다.
              </small>
            </div>

            <div className="LadderRankingLayoutWrap">
              <div className="LadderRankingLayout">
                <div className="ContentWrap">
                  <div className="Content">
                    <div className="ranking-highest"></div>
                    <table className="ranking-table">
                      <colgroup>
                        <col width="100" />
                        <col width="230" />
                        <col width="90" />
                        <col width="90" />
                        <col width="90" />
                        <col width="198" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th className="ranking-table__header">No</th>
                          <th className="ranking-table__header">소환사</th>
                          <th className="ranking-table__header">티어</th>
                          <th className="ranking-table__header"></th>
                          <th className="ranking-table__header">LP</th>
                          <th className="ranking-table__header">승률</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* 1등 */}
                        {ranking.status === 200 &&
                        
                        ranking.data.slice((postPage - 1) * 10, (postPage - 1) * 10 + 10).map((userDto,idx) =>{
                            return (
                              <tr
                                key={`${userDto.summonerId}_${idx}`}
                                className="ranking-table__row"
                                id="summoner-41780873"
                              >
                                <td className="ranking-table__cellranking-table__cell--rank">
                                  {(postPage-1)*10+idx+1}
                                </td>
                                <td className="select_summoner ranking-table__cell ranking-table__cell--summoner">
                                  <a  href="#!" onClick={()=>searchSummoner(userDto.summonerName)}> 
                                    <ProfileIcon data={userDto.summonerName}/>
                                    <span style={{ fontSize: "15px" }}>
                                      {userDto.summonerName}
                                    </span>
                                  </a>
                                </td>
                                <td
                                  className="ranking-table__cell ranking-table__cell--tier"
                                  style={{ fontSize: "12px" }}
                                >
                                  {userDto.tier}
                                </td>
                                <td className="ranking-table__cell ranking-table__cell--lp"></td>
                                <td className="ranking-table__cell ranking-table__cell--level">
                                  {userDto.leaguePoints.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </td>
                                <td className="ranking-table__cell ranking-table__cell--winratio">
                                  <div className="winratio">
                                    <div className="winratio-graph">
                                      <div
                                        className="winratio-graph__fill winratio-graph__fill--left"
                                        style={{
                                          lineHeight: "15px",
                                          fontSize: "12px",
                                          width: Math.floor(
                                            150 *
                                              (userDto.wins /
                                                (userDto.wins +
                                                  userDto.losses))
                                          ),
                                        }}
                                      >
                                        <div className="winratio-graph__text--left">
                                          {userDto.wins}
                                        </div>
                                      </div>

                                      <div className="winratio-graph__fill winratio-graph__fill--right">
                                        {userDto.losses}
                                      </div>
                                      <div className="winratio-graph__text winratio-graph__text--right">
                                        {userDto.losses}
                                      </div>
                                    </div>
                                    <span className="winratio__text">
                                      {fp(userDto.wins * 100, userDto.wins + userDto.losses, 0)}%
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            )
                          }
                          )}
                      </tbody>
                    </table>

                    <div className="ranking-pagination">
                      <div>
                        <div className="ranking-list-paging">
                          <div>
                            {postPage > 1 && (
                              <div style={{ display: "inline-block" }}>
                                <button
                                  style={{ marginRight: "6px" }}
                                  onClick={handlePrevPage}
                                  className="ranking-list-paging__button"
                                >
                                  <img
                                    src="img/iconArrowLeft.png"
                                    alt="이전"
                                    style={{
                                      width: "24px",
                                      height: "24px",
                                      verticalAlign: "middle",
                                      cursor: "pointer",
                                    }}
                                  />
                                  이전
                                </button>
                              </div>
                            )}

                            {postPage !== 250 ? (
                              <div style={{ display: "inline-block" }}>
                                <button
                                  style={{ marginLeft: "6px" }}
                                  onClick={handleNextPage}
                                  className="ranking-list-paging__button"
                                >
                                  다음
                                  <img
                                    src="img/iconArrowRight.png"
                                    alt="다음"
                                    style={{
                                      width: "24px",
                                      height: "24px",
                                      verticalAlign: "middle",
                                      cursor: "pointer",
                                    }}
                                  />
                                </button>
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="ranking-pagination__desc">
                        <span>1 ~ 10</span> 등 /{" "}
                        {ranking.status === 200 && (
                          <span>총 {ranking.data.length} </span>
                        )}
                        소환사
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<Footer2 />*/}
            <Footer />
          </div>
        </div>
    </div>
  );
};

export default Ranking;
