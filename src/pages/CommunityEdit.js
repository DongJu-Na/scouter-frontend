import React, { useEffect, useRef, useState } from "react";
import MainForm from "../components/MainForm";
import Headers from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { httpPost, httpPut } from "../util/apiClient";
import { httpUrl } from "../util/urlMapper";
import Swal from "sweetalert2";

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const CommunityEdit = () => {
  const location = useLocation();
  const editorRef = useRef();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(()=>{
    if(location.state.type === "write"){
      setTitle("");
      setContent("");
    }else{
      setTitle(location.state.title||"");
      setContent(location.state.content||"");
    }

  },[])

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContent(editorRef.current.getInstance().getHTML());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(title === ""){
      Swal.fire('제목을 입력해주세요.');
      return false;
    }

    if(content === ""){
      Swal.fire('내용을 입력해주세요.');
      return false;
    }

    if(location.state.type === "write"){
      httpPost(httpUrl.postBoard , {"boardTitle" : title , "boardContent" : content , "categoryId" : "1"})
      .then((res) => {
        if(res.status === 201){
          navigate("/community");
        }
      })
      .catch((e) => { 
        console.error(e);       
      });
    }else{
      httpPut(httpUrl.editBoard + location.state.boardId , {"boardTitle" : title , "boardContent" : content })
      .then((res) => {
        if(res.status === 201){
          navigate("/community");
        }
      })
      .catch((e) => { 
        console.error(e);       
      });
    }


  };



  return (
        <div className="CommunityWrap">
        <Headers />
        <div className="communityWrite-conatiner">
          <MainForm />
          <div>
            <div className="WriteBox">
              <div className="content">
                <form onSubmit={handleSubmit}>
                  <div className="article-write">
                    <div className="article-write-header">
                      <div className="article-write__title">글쓰기</div>
                    </div>
                    <div className="article-write-input">
                      <input
                        onChange={(e)=>handleChangeTitle(e)}
                        value={title}
                        type="text"
                        name="title"
                        className="article-write__text"
                        placeholder="제목"
                        autoComplete="off"
                      />
                    </div>
                    <div className="article-write-content">
                    <Editor
                        ref={editorRef}
                        placeholder="내용을 입력해주세요."
                        initialValue={location.state.content||""}
                        previewStyle="vertical" // 미리보기 스타일 지정
                        height="447px" // 에디터 창 높이
                        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
                        toolbarItems={[
                          // 툴바 옵션 설정
                          ['heading', 'bold', 'italic', 'strike'],
                          ['hr', 'quote'],
                          ['ul', 'ol', 'task', 'indent', 'outdent'],
                          ['table', 'image', 'link'],
                          ['code', 'codeblock']
                        ]}
                        language="ko-KR"
                        onChange={(e)=>handleChangeContent(e)}
                      ></Editor>
                    </div>
                    <div className="article-write__btn">
                      <button
                        className="article-write__button article-write__button--cancel"
                        type="button"
                        onClick={() => navigate("/community")}
                      >
                        취소
                      </button>
                      <button
                        className="article-write__button article-write__button--submit"
                        type="submit"
                      >
                        작성완료
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
  );
};

export default CommunityEdit;
