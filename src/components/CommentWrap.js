import React, { useState } from "react";

const CommentWrap = (props) => {

  const [reply, setReply] = useState([]);
  const storageUserId = parseInt(localStorage.getItem("userId"));

  // 리플 input 감시
  const replyOnChange = (e) => {
    setReply(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("add", props);
    props.addReply(reply);
    setReply("");
  };

  // 리플 삭제 구현

  return (
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
      {localStorage.getItem("jwtToken") !== null &&
        localStorage.getItem("jwtToken") !== undefined && (
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
                className="text"
                placeholder="주제와 무관한 댓글, 타인의 권리를 침해하거나 명예를 훼손하는 게시물은 별도의 통보 없이 제재를 받을 수 있습니다."
              />
              <button
                type="submit"
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

      {props.replies.map((reply) => (
        <div key={reply.id} className="comment-wrap">
          <div
            data-v-0e41a35e=""
            className="comment-meta"
            style={{ marginBottom: "7px" }}
          >
            <span className="comment__name" style={{ color: "black" }}>
              {" "}
              {reply.user.nickname}
            </span>
            <span className="comment__date">
              {moment(reply.createDate).startOf("second").fromNow()}
            </span>
          </div>{" "}
          <div
            className="comment-content"
            style={{ fontSize: "18px", marginBottom: "8px" }}
          >
            <p>{reply.reply}</p>
          </div>{" "}
          {reply.user.id === storageUserId && (
            <div
              className="deleteReplyBtn"
              style={{ color: "red", cursor: "pointer", fontSize: "14px" }}
              onClick={() => {
                if (window.confirm("댓글을 삭제하시겠습니까?") === true) {
                  props.deleteReply(reply.id);
                } else {
                  return;
                }
              }}
            >
              삭제
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentWrap;
