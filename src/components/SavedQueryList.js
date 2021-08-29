import React from "react";
import BoxHeader from "./BoxHeader";
import EmptyList from './EmptyList';

const SavedQueryList = ({queryList, clickQuery, removeSavedQuery}) => {
    return (
        <>
            <BoxHeader 
                title="Saved Queries"
                subtitle="Select a query to execute"
            />

            <div className="block__box__block">
                <div className="block__box__list">
                    {queryList?.map((query, index) => (
                        <div
                            className="list__item"
                            onClick={() => clickQuery(query)}
                        >
                            <p>{query?.data}</p>
                            <span
                                onClick={(event) =>
                                    removeSavedQuery(event, query)
                                }
                            >
                                <i
                                    className="fa fa-close"
                                    aria-hidden="true"
                                ></i>
                            </span>
                        </div>
                    ))}
                    {queryList?.length === 0 ? (
                        <EmptyList title="No saved query" />
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default SavedQueryList;
