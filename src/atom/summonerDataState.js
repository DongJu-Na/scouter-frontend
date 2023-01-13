import { atom  } from "recoil";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist({
    key: "sessionState",
    storage: sessionStorage,
});


export const summonerDataState = atom({
    key : "summonerDataState",
    default : null,
    effects_UNSTABLE : [persistAtom]
})
