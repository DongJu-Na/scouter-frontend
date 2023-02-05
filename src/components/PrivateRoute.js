import React from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";

function PrivateRoute({component: Component}) {
  const navigate = useNavigate();
  
  function loginCheck() {
    if (sessionStorage.getItem("accessToken") === null) {

      Swal.fire({
        title: '알림',
        text: "로그인 후 이용 할 수 있습니다.",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: '확인'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      })
      
    }else{
      return (
        <></>
      );
    }
  }
  

  
  return (
    <>
      {sessionStorage.getItem("accessToken") !== null ?
        Component : loginCheck()
      }
    </>
    
  )
  
}

export default PrivateRoute