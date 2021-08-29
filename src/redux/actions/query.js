import { actionCreator, getErrorMessage } from "../../utils";
import {
    makeQuery,
    fetchAllTables
} from "../../services";
import { QueryTypes } from "../actionTypes";

export const makeQueryAction = (data, callback) => {
    return (dispatch) => {
        dispatch(
            actionCreator(QueryTypes.FETCH_SQL_QUERY_PROCESSING)
        );
        let start = new Date();
        makeQuery(data).then(
            (response) => {
                dispatch(
                    actionCreator(
                        QueryTypes.RECEIVED_SQL_QUERY_DATA,
                        response
                    )
                );
                dispatch(
                    actionCreator(
                        QueryTypes.FETCH_SQL_QUERY_SUCCESS
                    )
                );
                let end = new Date();

                dispatch(
                    actionCreator(
                        QueryTypes.ADD_QUERY_TIME,
                        (end-start)
                    )
                );

                if(callback) {
                    callback(true)
                }
            },
            
            (error) => {
                console.log(error)
                dispatch(
                    actionCreator(
                        QueryTypes.FETCH_SQL_QUERY_ERROR,
                        getErrorMessage(error?.data?.code || "There was some error.")
                    )
                );
                let end = new Date();
                dispatch(
                    actionCreator(
                        QueryTypes.ADD_QUERY_TIME,
                        (end-start)
                    )
                );

                if(callback) {
                    callback(false)
                }
            }
        );
    };
};

export const fetchAllTablesAction = (data, callback) => {
    return (dispatch) => {
        dispatch(
            actionCreator(QueryTypes.FETCH_ALL_TABLES_PROCESSING)
        );
        fetchAllTables(data).then(
            (response) => {
                dispatch(
                    actionCreator(
                        QueryTypes.RECEIVED_ALL_TABLES_DATA,
                        response
                    )
                );
                dispatch(
                    actionCreator(
                        QueryTypes.FETCH_ALL_TABLES_SUCCESS
                    )
                );
                if(callback) {
                    callback(true)
                }
            },
            (error) => {
                dispatch(
                    actionCreator(
                        QueryTypes.FETCH_ALL_TABLES_ERROR,
                        getErrorMessage(error?.data?.code || "There was some error.")
                    )
                );

                if(callback) {
                    callback(false)
                }
            }
        );
    };
};

export const saveQueryAction = (query) => {
    return (dispatch) => {
        dispatch(actionCreator(QueryTypes.SAVE_QUERY, query));
    };
};

export const addQueryHistoryAction = (query) => {
    return (dispatch) => {
        dispatch(actionCreator(QueryTypes.ADD_QUERY_HISTORY, query));
    };
};

export const removeQueryAction = (query) => {
    return (dispatch) => {
        dispatch(actionCreator(QueryTypes.REMOVE_QUERY, query));
    };
};
