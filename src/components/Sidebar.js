import React from "react";

const Sidebar = ({
    sidebarOpen,
    tableIndex,
    closeSidebar,
    database,
    databaseTables,
    fetchTable,
}) => {
    return (
        <div id="sidebar" className={sidebarOpen ? "sidebar_responsive" : ""}>
            <div className="sidebar__title">
                <div className="sidebar__img">
                    <h1>SQL Query Editor</h1>
                </div>
                <i
                    onClick={closeSidebar}
                    className="fa fa-times"
                    id="sidebarIcon"
                    aria-hidden="true"
                ></i>
            </div>

            <div className="sidebar__menu">
                <h2>Available Database</h2>
                <div className="sidebar__link active_menu_link">
                    <i className="fa fa-database" aria-hidden="true"></i>
                    <span>{database}</span>
                </div>

                <h2>Tables (testdata)</h2>
                {databaseTables?.map((table, index) => (
                    <div
                        className={
                            tableIndex === index
                                ? "active_menu_link sidebar__link"
                                : "sidebar__link"
                        }
                        key={index}
                        onClick={() => fetchTable(table?.name, index)}
                    >
                        <i className="fa fa-table"></i>
                        <span>{table?.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
