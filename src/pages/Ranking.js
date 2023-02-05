import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Headers from "../components/Header";
import Footer from "../components/Footer";

import { httpGet } from "../util/apiClient";
import { httpUrl } from "../util/urlMapper";

const Ranking = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [respDto, setRespDto] = useState({});
  const [postPage, setPostPage] = useState(1);

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

  };
  const handleNextPage = () => {
    //첫페이지면서 마지막페이지
    // if (postpage < 1) {
    // }
    let nextPage = postPage + 1;
  };

  const getRankingInfo = () =>{
    httpGet(httpUrl.getRankingInfo, {})
    .then((res) => {
        console.log(res);
    })
    .catch((e) => { 
      console.error(e);       
    });
  }

  return (
    <div className="ranking">
      <Headers/>
      {/*<Header1 />*/}
        <div className="wrap-container">
          <div className="pageHeaderWrap">
            <div className="menu">
              <div style={{ fontSize: "28px" }}>랭킹</div>
              <div className="actions">
                <div className="searchItem">
                  <form
                    id="search_summoner"
                    className="formItem"
                    onSubmit={handleOnSubmit}
                  >
                    <div className="inputText">
                      <input
                        onChange={handleOnChange}
                        type="text"
                        className="input"
                        placeholder="소환사명"
                        name="summonerName"
                      />
                    </div>
                    <button className="button-SemiRound-Blue" type="submit">
                      소환사 검색
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="pageDescription" style={{ paddingBottom: "32px" }}>
              {respDto.statusCode === 200 && (
                <span className="text">
                  {console.log(11, respDto)}
                  챌린저~다이아IV 구간에 총 {respDto.data[0].allUser}명의
                  소환사가 있습니다.
                </span>
              )}
              <small className="small">
                랭킹은 다이아IV 이상 소환사만 표시. 랭킹은 주기적으로
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
                          <th className="ranking-table__header"></th>
                          <th className="ranking-table__header">소환사</th>
                          <th className="ranking-table__header">티어</th>
                          <th className="ranking-table__header"></th>
                          <th className="ranking-table__header">LP</th>
                          <th className="ranking-table__header">승률</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* 1등 */}
                        {respDto.statusCode === 200 &&
                          respDto.data.map(
                            (userDto) =>
                              userDto.type === 1 && (
                                <tr
                                  key={userDto.rankingModel.id}
                                  className="ranking-table__row"
                                  id="summoner-41780873"
                                >
                                  <td className="ranking-table__cellranking-table__cell--rank">
                                    {userDto.rankingModel.id}
                                  </td>
                                  <td className="select_summoner ranking-table__cell ranking-table__cell--summoner">
                                    <Link
                                      to={
                                        "/summoner/" +
                                        userDto.rankingModel.summonerName
                                      }
                                    >
                                      <img
                                        src={
                                          userDto.type === 1 &&
                                          userDto.summonerModel !== null
                                            ? "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/profileicon/" +
                                              userDto.summonerModel
                                                .profileIconId +
                                              ".png"
                                            : "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/profileicon/1.png"
                                        }
                                        alt=""
                                      />
                                      <span style={{ fontSize: "15px" }}>
                                        {userDto.rankingModel.summonerName}
                                      </span>
                                    </Link>
                                  </td>
                                  <td
                                    className="ranking-table__cell ranking-table__cell--tier"
                                    style={{ fontSize: "12px" }}
                                  >
                                    {userDto.rankingModel.tier}
                                  </td>
                                  <td className="ranking-table__cell ranking-table__cell--lp"></td>
                                  <td className="ranking-table__cell ranking-table__cell--level">
                                    {userDto.rankingModel.leaguePoints}
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
                                                (userDto.rankingModel.win /
                                                  (userDto.rankingModel.win +
                                                    userDto.rankingModel.lose))
                                            ),
                                          }}
                                        >
                                          <div className="winratio-graph__text--left">
                                            {userDto.rankingModel.win}
                                          </div>
                                          {/* {userDto.rankingModel.win} */}
                                        </div>

                                        <div className="winratio-graph__fill winratio-graph__fill--right">
                                          {userDto.rankingModel.lose}
                                        </div>
                                        <div className="winratio-graph__text winratio-graph__text--right">
                                          {userDto.rankingModel.lose}
                                        </div>
                                      </div>
                                      <span className="winratio__text">
                                        {Math.floor(
                                          (userDto.rankingModel.win /
                                            (userDto.rankingModel.win +
                                              userDto.rankingModel.lose)) *
                                            100
                                        )}{" "}
                                        %
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              )
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

                            {respDto.statusCode !== 204 ? (
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
                        {respDto.statusCode === 200 && (
                          <span>총 {respDto.data[0].allUser} </span>
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
