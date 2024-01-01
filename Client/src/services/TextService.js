import { getToken } from "../UTILS/localStorageUtils";
import http from "../http-common";

const getTexts = () =>{
    return http.get(`/text/getTexts`)
}

const TextService = {
    getTexts,
}

export default TextService;

