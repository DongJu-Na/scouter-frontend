import { atom  } from "recoil";

export const summaryDataState = atom({
    key : "summaryDataState",
    default : {
        "wins" : 0,
        "losses" : 0,
        "kills" : 0,
        "assists" : 0,
        "deaths" : 0

    }
})


