import { getToken } from "../UTILS/localStorageUtils";
import http from "../http-common";

const saveResults = (results) => {
    return http.post(`/latest/save` , results, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}

const getResults = (userId) => {
    return http.get(`/res/getRes?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}

const ResultsService = {
    saveResults,
    getResults
}

export default ResultsService;

