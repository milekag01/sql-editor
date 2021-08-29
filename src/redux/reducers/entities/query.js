import { combineReducers } from "redux";
import { QueryTypes } from "../../actionTypes";

const queryResults = (state = [], action) => {
    switch (action.type) {
        case QueryTypes.RECEIVED_SQL_QUERY_DATA: {
            return action.payload;
        }
        default:
            return state;
    }
};

const allTables = (state = [], action) => {
    switch (action.type) {
        case QueryTypes.RECEIVED_ALL_TABLES_DATA: {
            return action.payload;
        }
        default:
            return state;
    }
};

const queryList = (state = [], action) => {
    switch (action.type) {
        case QueryTypes.SAVE_QUERY: {
            return [action.payload, ...state];
        }
        case QueryTypes.REMOVE_QUERY: {

            let newState = state.filter(query=>{
                return query.data!==action.payload.data
            })
            
            return [...newState]
        }
        default:
            return state;
    }
};

const queryHistoryList = (state = [], action) => {
    switch (action.type) {
        case QueryTypes.ADD_QUERY_HISTORY: {
            return [action.payload, ...state];
        }
        default:
            return state;
    }
};

const queryTime = (state = '', action) => {
    switch (action.type) {
        case QueryTypes.ADD_QUERY_TIME: {
            console.log(action.payload)
            return action.payload;
        }
        default:
            return state;
    }
};

export default combineReducers({
	queryResults,
    allTables,
    queryList,
    queryHistoryList,
    queryTime
});
