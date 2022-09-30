import React from 'react';
import './Loading.scss'

const Loading = () => {
    return (
        <div className="mainLoader">
            <div className="loading-container">
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
                <p>ЗАГРУЗКА...</p>
            </div>
        </div>
    );
};

export default Loading;