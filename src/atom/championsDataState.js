import { atom  } from "recoil";

export const championsDataState = atom({
    key : "championsDataState",
    default : {
        "games" : 0,
        "wins" : 0,
        "losses" : 0,
        "kills" : 0,
        "assists" : 0,
        "deaths" : 0
    }
})