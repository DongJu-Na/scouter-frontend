import { atom  } from "recoil";
import { recoilPersist } from "recoil-persist";



const {persistAtom} = recoilPersist({
    key: "sessionState",
    storage: localStorage,
});

export const summonerState = atom({
    key : "summonerState",
    default : {
        recent : [],
        favorites : []
    },
    effects_UNSTABLE : [persistAtom]
})
