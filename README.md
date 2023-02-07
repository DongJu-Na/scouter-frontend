# <img src="http://1.234.189.11/gitlogo/teemowhite.png">
# Scouter-frontend
🤭스카우터 프로젝트 - 프론트

## 🏁 [Scouter 방문하기](https://dongju-na.github.io/scouter-frontend/) [beta]
## ⚽ [Scouter 방문하기](http://1.234.189.11) [alpha]


롤 전적검색 사이트 [Scouter](http://1.234.189.11/) api 프로젝트 입니다<br/>
`2023.01.01 ~ 2023.02.05` 동안 `React`를 이용해 구현했습니다.

이 프로젝트를 통해 이루고자 한 목표는 <br/>
`내용` <br/>

# 📚 목차
* [사용 기술 및 라이브러리](#-사용-기술-및-라이브러리)
* [구현 기능](#-구현-기능)
* [API 명세서](#-API-명세서)
* [트러블슈팅](#-트러블슈팅)



# 🕹 사용 기술 및 라이브러리
### 📌 FrontEnd
|기술|버전|
|----|----|
|node.js|18.13.0|
|react|18.2.0|
|axios|1.2.1|
|bootstrap|5.2.3|
|jwt-decode|3.1.2|
|proxy-middleware|0.15.0|
|react-bootstrap|2.7.0|
|react-chartjs-2|5.1.0|
|react-dom|18.2.0|
|react-router-dom|6.6.1|
|react-scripts|5.0.1|
|react-tooltip|4.2.19|
|recoil|0.7.6|
|recoil-persist|4.2.0|
|sass|1.57.1|
|sass-loader|13.2.0|
|sweetalert2|11.7.0|
|util|0.12.5|
|web-vitals|2.1.4|

# 🎢 구현 기능
* 롤 API 데이터 파싱 및 바인딩
  * 아이디 조회 [아이콘, 고유id, puuid 레벨]
  * 전적 조회 [최근 10경기]
  * 리그조회 [티어, 포인트, 승, 패]
  * 랭킹조회 [롤 전체랭킹]
  * 프로필 이미지 조회
* 게시판 기능
  * 모든 게시글 조회
  * 게시글 검색 
  * 게시글 작성 [회원]
  * 게시글 수정 [회원, 게시글 작성자]
  * 게시글 삭제 [회원, 게시글 작성자]
  * 게시글 답글 작성 [회원]
* 댓글 기능
  * 댓글 조회
  * 댓글 작성 [회원]
  * 댓글 수정 [회원, 댓글 작성자]
  * 댓글 삭제 [회원, 댓글 작성자]
* 회원 기능
  * 회원가입
  * 로그인/로그아웃

# 🤙🏻 API 명세서
HTTP 메서드를 통해 행위를 명시할 수 있도록 RESTful 방식으로 설계했습니다. <br/><br/>

[회원](http://1.234.189.11/docs/user-guide.html)<br/>
[게시판](http://1.234.189.11/docs/board-guide.html)<br/>
[댓글](http://1.234.189.11/docs/Reply-guide.html)<br/>

# 👾 트러블슈팅
###
