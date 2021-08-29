import React from 'react';

const BoxHeader = ({title, subtitle, children}) => {
    return (
        <div className="block__box__title">
            <div>
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>

            <div>
                {children}
            </div>
        </div>
    )
}

export default BoxHeader;