import store from '../store'
import { en_en } from "./local";

const dictionary = () => {
    switch (store.getState().language) {
        case "en-en":
            return en_en;
        default:
            return en_en;
    }
};

const _T = (text) => Object.keys(dictionary()).includes(text) ? dictionary()[text] : text;

export default _T;