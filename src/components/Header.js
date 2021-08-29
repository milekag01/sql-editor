import React from "react";

const Header = ({toggleSidebar, toggleSavedQuery, nav}) => {
    return (
        <nav className="navbar">
            <div className="nav_icon" onClick={toggleSidebar}>
                <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
            <div className="navbar__left">
                <span
                    className={nav === 0 ? "active_link" : ""}
                    onClick={() => toggleSavedQuery(0)}
                >
                    Make Query
                </span>
                <span
                    className={nav === 1 ? "active_link" : ""}
                    onClick={() => toggleSavedQuery(1)}
                >
                    Saved Queries
                </span>
                <span
                    className={nav === 2 ? "active_link" : ""}
                    onClick={() => toggleSavedQuery(2)}
                >
                    Query History
                </span>
            </div>
        </nav>
    )
}

export default Header;