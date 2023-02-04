import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Headers = () => {
  const [auth,setAuth] = useState(sessionStorage.getItem("accessTokenExpirationTime"));
  const navigate = useNavigate();
  const logout = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '알림',
      text: "로그아웃 하시겠습니까?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '취소',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          '알림',
          '로그아웃 처리 되었습니다.',
          'success'
        )
        sessionStorage.clear();
        setAuth(null);
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
  };

  const authCheck = ()=> {
    if(auth === null || auth === undefined){
      return(
        <a href="#!" onClick={()=>navigate("/login")}>로그인</a>
       );
    }else{
      return(
        <a href="#!" onClick={()=>logout()}>로그아웃</a>
       );
    }
    
  }

  return (
    <div className="header1">
      <div className="l-menu1">
        <ul className="menu1">
          <li className="menu__item1">
            <Link to="/">Home</Link>
          </li>

          <li className="menu__item1">
            <Link to="/ranking">랭킹</Link>
          </li>

          <li className="menu__item1">
            <Link to="/community">커뮤니티</Link>
          </li>
          <li className="menu__item1">{authCheck()}</li>
        </ul>
      </div>
    </div>
  );
};

export default Headers;
