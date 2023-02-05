export const httpUrl = {
    /* 
       Auth
    */
    Login : "/api/v1/auth/authenticate",
    Register : "/api/v1/auth/register",
    Refresh  : "/api/v1/user/refresh",

    /* 
        Board
    */
    getBoard : "/api/v1/boards?categoryId=1",
    getBoardDetail : "/api/v1/boards/",
    postBoard : "/api/v1/boards",
    editBoard : "/api/v1/boards/",
    deleteBoard : "/api/v1/boards/",
    updateViewCnt : "/api/v1/boards/",

    /* reply */
    getReplys :  "/api/v1/replys?boardId=",
    postReplys :  "/api/v1/replys",
    editReplys :  "/api/v1/replys/",
    deleteReplys : "/api/v1/replys/",

    /*
        ROL API    
    */
    getSummoner : "/api/lol/getSummoners/", // 소환사 조회
    getLeagueInfo : "/api/lol/getLeagueInfo/", // 리그 정보 조회
    getMatchId : "/api/lol/getMatchId/", // 경기ID 조회
    getMatchDetail : "/api/lol/getMatchDetail/", // 경기상세정보 조회
    getMatchTimeLine : "/api/lol/getMatchTimeLine/", // 경기타임라인 조회
    getMatchesInfo : "/api/lol/getMatchesInfo/", // 최근10경기조회
    getRankingInfo : "/api/lol/getRankingInfo",

    /* Riot proxy Test Api */
    t1 : "/kr/lol/summoner/v4/summoners/by-name/",
    t2 : "/kr/lol/league/v4/entries/by-summoner/",
    t3 : "/asia/lol/match/v5/matches/by-puuid/",
    t4 : "/asia/lol/match/v5/matches/",
};

