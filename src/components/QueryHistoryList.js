import React from "react";
import BoxHeader from "./BoxHeader";
import EmptyList from './EmptyList';

const QueryHistoryList = ({queryHistoryList, clickQuery}) => {
    return (
        <>
            <BoxHeader 
                title="Query History"
                subtitle="Select a query to execute"
            />            
            
            <div className="block__box__block">
                <div className="block__box__list">
                    {queryHistoryList?.map((query, index) => (
                        <div
                            className="list__item"
                            onClick={() => clickQuery(query)}
                        >
                            <p>{query?.data}</p>
                        </div>
                    ))}
                    {queryHistoryList?.length === 0 ? (
                        <EmptyList title="No query history" />
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default QueryHistoryList;
