export const httpUrl = {
    /* 
        base
    */

    Login : "/api/v1/auth/authenticate",
    Register : "/api/v1/auth/register",

    /*
        ROL API    
    */
    t1 : "/kr/lol/summoner/v4/summoners/by-name/",
    t2 : "/kr/lol/league/v4/entries/by-summoner/",
    t3 : "/asia/lol/match/v5/matches/by-puuid/",
    t4 : "/asia/lol/match/v5/matches/",

    getSummoner : "/api/lol/getSummoners/", // 소환사 조회
    getLeagueInfo : "/api/lol/getLeagueInfo/", // 리그 정보 조회
    getMatchId : "/api/lol/getMatchId/", // 경기ID 조회
    getMatchDetail : "/api/lol/getMatchDetail/", // 경기상세정보 조회
    getMatchTimeLine : "/api/lol/getMatchTimeLine/", // 경기타임라인 조회
    
};

