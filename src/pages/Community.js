import React, { useState, useEffect } from "react";

import Headers from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import MainForm from "../components/MainForm";

import { httpGet } from "../util/apiClient";
import { httpUrl } from "../util/urlMapper";
import { useRecoilState } from "recoil";
import { BoardState } from "../atom";

const Community = () => {
  const [board,setBoard] = useRecoilState(BoardState);
  const [postPage, setPostPage] = useState(0);
  const [statusCode, setStatusCode] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    getBoard(0);
  }, []);

  const handlePrevPage = () => {
    let prevPage = postPage - 1;
    if (postPage === 0) {
      return;
    }
    getBoard(prevPage);
  };

  const handleNextPage = () => {
    let nextPage = postPage + 1;
    getBoard(nextPage);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

  };

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
    setTimeout(400);
  };

  const getBoard = (_page) => {
      httpGet(httpUrl.getBoard + `&size=5&page=${_page}`, {})
      .then((res) => {
          if(res.status === 200){
            setBoard(res.data.data);
            setPostPage(res.data.data.page);
          }
      })
      .catch((e) => { 
        console.error(e);       
      });
  }


  return (
    <div>
      <div className="community">
        <Headers />
        <div className="community-container">
          <MainForm />

          <div className="contentBox">
            <div className="content-header">
              <div className="content-header-wrap">
                <h2 className="header-text">자유게시판</h2>
                <div style={{ marginRight: "24px" }}>
                  {sessionStorage.getItem("accessToken") !== null &&
                    sessionStorage.getItem("accessToken") !== undefined && (
                      <Link to="/write">
                        <img
                          src="img/iconWrite.png"
                          style={{ width: "24px" }}
                          alt="글쓰기"
                        />
                      </Link>
                    )}
                </div>
              </div>

              <div
                className="content-header-sub"
                style={{ height: "48px", position: "relative" }}
              >
                <div className="sub-search-wrap">
                  <form className="sub-search" onSubmit={handleOnSubmit}>
                    <select className="sub-header-search__select">
                      <option>제목+내용</option>
                    </select>
                    <input
                      onChange={handleOnChange}
                      tpye="text"
                      value={inputValue}
                      className="sub-header-search__input"
                      placeholder="검색"
                    />
                    <button className="sub-header-search__button">
                      <img
                        className="sub-header-search__img"
                        src="img/iconSearch.png"
                        alt="검색"
                      />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="article-list">
              {/* 여기서 부터 반복 */}
              { board !== [] && board.content !== null && board.content !== undefined ?
                board.content.map((item,idx) =>
                  {return(
                    <div className="article-box" key={`board${item.boardId}_${idx}`}>
                      <div
                        className="article-item"
                        style={{ display: "contents" }}
                      >
                        <div
                          className="article-number"
                          style={{ alignSelf: "center", width: "72px" }}
                        >
                          {item.boardId}
                        </div>
                        <div
                          className="article-list-item__content"
                          style={{ alignSelf: "center" }}
                        >
                          <Link
                            to={"/community/" + item.boardId}
                            state={{ boardId : item.boardId }}
                            style={{ cursor: "pointer" , textDecoration: 'none'}}
                          >
                            <div
                              className="aritcle-list-item__title"
                              style={{ textAlign: "left" }}
                            >
                              <span className="post-title">
                                {item.boardTitle}
                              </span>
                              <em
                                style={{
                                  color: "#16ae81",
                                  fontStyle: "normal",
                                }}
                              >
                                [{item.replyCount}]
                              </em>
                            </div>
                          </Link>
                          <div className="article-list-item-meta">
                            <div className="article-list-item-meta__item">
                              <span style={{ color: "#98a0a7" }}>
                                {item.createdDt}
                              </span>
                              <span className="article-list-author">
                                {item.boardUserNickName}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              )
              :
              <div className="article-box">
                    <div
                        className="article-item"
                        style={{ display: "contents" }}>작성된 글이 없습니다.
                  </div>
              </div>
              }

              <div>
                <div className="article-list-paging">
                  <div>
                    {postPage > 0 && (
                      <div style={{ display: "inline-block" }}>
                        <button
                          style={{ marginRight: "6px" }}
                          onClick={handlePrevPage}
                          className="article-list-paging__button"
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

                    {statusCode !== 204 ? (
                      <div style={{ display: "inline-block" }}>
                        <button
                          style={{ marginLeft: "6px" }}
                          onClick={handleNextPage}
                          className="article-list-paging__button"
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
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Community;
