import { combineReducers } from "redux";
import { handleRequest, initialRequestState } from "../../../utils";
import { QueryTypes } from "../../actionTypes";

const makeQuery = (state = initialRequestState(), action) => {
    return handleRequest(
        QueryTypes.FETCH_SQL_QUERY_PROCESSING,
        QueryTypes.FETCH_SQL_QUERY_SUCCESS,
        QueryTypes.FETCH_SQL_QUERY_ERROR,
        state,
        action
    );
};

const fetchAllTables = (state = initialRequestState(), action) => {
    return handleRequest(
        QueryTypes.FETCH_ALL_TABLES_PROCESSING,
        QueryTypes.FETCH_ALL_TABLES_SUCCESS,
        QueryTypes.FETCH_ALL_TABLES_ERROR,
        state,
        action
    );
};

export default combineReducers({
    makeQuery,
    fetchAllTables
});
