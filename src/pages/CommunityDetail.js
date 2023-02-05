import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Headers from "../components/Header";
import MainForm from "../components/MainForm";
import { httpGet , httpPost , httpDelete , httpPut } from "../util/apiClient";
import { httpUrl } from "../util/urlMapper";
import Swal from "sweetalert2";

const CommunityDetail = () => {
  const navigate = useNavigate();
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState([]);
  const [resp, setResp] = useState({});
  const [refreshFlag , setRefreshFlag] = useState(false);
  const location = useLocation();
  const [postPage, setPostPage] = useState(0);
  
  useEffect(() => {
    updateViewCnt(location.state.boardId);
    getBoardDetail(location.state.boardId);
  },[]);

  useEffect(() => {
    if(refreshFlag){
      getReplys(location.state.boardId,0);
      setRefreshFlag(false);
    }
  },[refreshFlag]);

  const replyOnChange = (e) => {
    setReply(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReply("");
  };

  const getBoardDetail = (_boardId) => {
    httpGet(httpUrl.getBoardDetail + _boardId, {})
    .then((res) => {
        setResp(res.data);
        getReplys(_boardId,0);
    })
    .catch((e) => { 
      console.error(e);       
    });
  }

  const deletePost = (_boardId) => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '알림',
      text: "작성한 게시물을 삭제 하시겠습니까?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '취소',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          '알림',
          '삭제 처리 되었습니다.',
          'success'
        )
        httpDelete(httpUrl.deleteBoard + _boardId, {})
        .then((res) => {
          if(res.status === 201){
            navigate(-1);
          }
        })
        .catch((e) => { 
          console.error(e);       
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '알림',
          '취소 처리 되었습니다.',
          'error'
        )
      }
    })

  }

  const getReplys = (_boardId , _page) => {
    httpGet(httpUrl.getReplys + _boardId + `&size=10&page=${_page}`, {})
    .then((res) => {
        if(res.status === 200)
           setReplies(res.data);
    })
    .catch((e) => { 
      console.error(e);       
    });
  }

  const addReply = (_boardId) => {
    httpPost(httpUrl.postReplys, {
      "boardId" : _boardId,
      "replyContent" : reply
    })
    .then((res) => {
        if(res.status === 201){
          setRefreshFlag(true);
        }
    })
    .catch((e) => { 
      console.error(e);       
    });
  };

  const deleteReply = (_replyId) => {
    httpDelete(httpUrl.deleteReplys + _replyId, {})
    .then((res) => {
      if(res.status === 201){
        setRefreshFlag(true);
      }
    })
    .catch((e) => { 
      console.error(e);       
    });
  };
  
  const updateViewCnt = (_boardId) => {
    let boardNo = _boardId+ "";
    httpPut(httpUrl.updateViewCnt + boardNo  + "/viewCount", {})
    .then((res) => {
      console.debug(res);
    })
    .catch((e) => { 
      console.error(e);       
    });
  }

  const handlePrevPage = () => {
    let prevPage = postPage - 1;
    if (postPage === 0) {
      return false;
    }
    setPostPage(postPage-1);
    getReplys(location.state.boardId,prevPage);
  };

  const handleNextPage = () => {
    let nextPage = postPage + 1;
    if(replies.data.last){
      return false;
    }
    setPostPage(postPage+1);
    getReplys(location.state.boardId,nextPage);
  };

  return (
      <div className="community">
        <Headers />

        <div className="community-container">
          <MainForm />
          <div className="CommunityContentBox">
            {resp.code}
    
            {resp !== {} && resp.code === "AA0000" 
              ?  (
                  <div key={resp.data.boardId}>
                    <div className="article">
                      <div className="article-header">
                        <div className="article__title">
                          {resp.data.boardTitle}
                        </div>
                        <div className="article-meta">
                          <div className="article-meta-list">
                            <div className="article-meta__item">
                              <span>
                                {resp.data.createdDt}
                              </span>
                            </div>
                            <div className="article-meta__item article-meta__item--name">
                              {resp.data.boardUserNickName}
                            </div>
                          </div>
                          <div className="article-meta-list article-meta-list--right">
                            <div className="article-meta__item">
                              <span>조회 {resp.data.boardViewCnt}</span>
                            </div>
                            <div className="article-meta__item">
                              <span>댓글 {resp.data.replyCount}</span>
                            </div>
                          </div>
                        </div>

                        {sessionStorage.getItem("email") === resp.data.boardUserEmail && (
                          <div className="article-action">
                            <div className="article-action__item">
                              <button
                                onClick={()=>deletePost(resp.data.boardId)}
                                className="article-action__button button button--red button--red--border"
                              >
                                삭제
                              </button>
                            </div>
                            <div className="article-action__item">
                              <Link
                                to={{
                                  pathname: "/edit",
                                  state: {
                                    postId: resp.data.boardId,
                                    title: resp.data.boardTitle,
                                    content:resp.data.boardContent,
                                  },
                                }}
                                className="article-action__button__button"
                              >
                                수정
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="article-content-wrap">
                        <div className="article-content">
                          <p>{resp.data.boardContent}</p>
                        </div>
                      </div>
                      
                      <div className="comment">
                      <div
                        style={{
                          paddingTop: "5px",
                          marginTop: "9px",
                          lineHeight: "21px",
                          fontSize: "20px",
                          color: "#1e2022",
                          fontWeight: "bold",
                        }}
                      >
                        댓글
                      </div>
                      {sessionStorage.getItem("accessToken") !== null &&
                        sessionStorage.getItem("accessToken") !== undefined && (
                          <div>
                            <form
                              onSubmit={handleSubmit}
                              style={{ paddingBottom: "15px", paddingTop: "15px" }}
                            >
                              <input
                                style={{
                                  display: "inline-block",
                                  width: "88%",
                                  backgroundColor: "#fff",
                                  border: "1px solid #dddfe4",
                                  overflow: "hidden",
                                  overflowWrap: "break-word",
                                  height: "44px",
                                }}
                                id="input1"
                                type="text"
                                onChange={replyOnChange}
                                value={reply}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    addReply(resp.data.boardId)
                                  }
                                }}
                                className="text"
                                placeholder="주제와 무관한 댓글, 타인의 권리를 침해하거나 명예를 훼손하는 게시물은 별도의 통보 없이 제재를 받을 수 있습니다."
                              />
                              <button
                                type="button"
                                onClick={()=>addReply(resp.data.boardId)}
                                style={{
                                  display: "inline-block",
                                  width: "92px",
                                  padding: "10px 9px",
                                  lineHeight: "20px",
                                  fontSize: "16px",
                                  borderRadius: "0",
                                  borderColor: "#46cfa7",
                                  backgroundColor: "#46cfa7",
                                  marginLeft: "8px",
                                  color: "#fff",
                                }}
                              >
                                작성
                              </button>
                            </form>
                          </div>
                        )}

                      {replies !== [] && replies.code === "AA0000" ? replies.data.content.map((item,idx) => (
                        <div key={`rp_${idx}`} className="comment-wrap">
                          <div
                            className="comment-meta"
                            style={{ marginBottom: "7px" }}
                          >
                            <span className="comment__name" style={{ color: "black" }}>
                              {" "}
                              {item.replyUserNickName}
                            </span>
                            <span className="comment__date">
                              {item.createdDt}
                            </span>
                          </div>{" "}
                          <div
                            className="comment-content"
                            style={{ fontSize: "18px", marginBottom: "8px" }}
                          >
                            <p>{item.replyContent}</p>
                          </div>{" "}
                          {sessionStorage.getItem("email") === item.replyUserEmail && (
                            <>
                              <div
                                  className="deleteReplyBtn"
                                  style={{ color: "red", cursor: "pointer", fontSize: "14px" , width : "28px" }}
                                  onClick={() => {
                                    const swalWithBootstrapButtons = Swal.mixin({
                                      customClass: {
                                        confirmButton: 'btn btn-success',
                                        cancelButton: 'btn btn-danger'
                                      },
                                      buttonsStyling: false
                                    })
                                    
                                    swalWithBootstrapButtons.fire({
                                      title: '알림',
                                      text: "작성한 댓글을 삭제 하시겠습니까?",
                                      icon: 'warning',
                                      showCancelButton: true,
                                      confirmButtonText: '네',
                                      cancelButtonText: '취소',
                                      reverseButtons: true
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        swalWithBootstrapButtons.fire(
                                          '알림',
                                          '삭제 처리 되었습니다.',
                                          'success'
                                        )
                                        deleteReply(item.replyId);
                                      } else if (
                                        result.dismiss === Swal.DismissReason.cancel
                                      ) {
                                        swalWithBootstrapButtons.fire(
                                          '알림',
                                          '취소 처리 되었습니다.',
                                          'error'
                                        )
                                      }
                                    })
                                  }}
                                >
                                  삭제
                                </div>
                            </>
                            
                          )}
                        </div>
                      )) : <></>}    

                            <div className="article-list-paging">
                                 <div style={{ display: "inline-block" }}>
                                      <button
                                        style={{ marginRight: "6px" }}
                                        onClick={handlePrevPage}
                                        className="article-list-paging__button"
                                      >
                                        <img
                                          src="../../img/iconArrowLeft.png"
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

                                                                       
                                    <div style={{ display: "inline-block" }}>
                                            <button
                                              style={{ marginLeft: "6px" }}
                                              onClick={handleNextPage}
                                              className="article-list-paging__button"
                                            >
                                              다음
                                              <img
                                                src="../../img/iconArrowRight.png"
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
                              </div>
                    </div>
                    </div>
                  </div>
                )
                              : ""}
          

          </div>
        </div>
        <Footer />
      </div>
  );
};

export default CommunityDetail;
