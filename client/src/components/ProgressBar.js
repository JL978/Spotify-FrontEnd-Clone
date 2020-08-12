import React from 'react';

const ProgressBar = ({extraClass, progress}) => {
    return (
        <div className="progress-wrapper">
            <div className="progress-bar">
                <div className={`progress ${extraClass}`} style={{transform: `translate(-${((1-progress)*100).toFixed(2)}%)`}}></div>
            </div>
            <button className={`progress-slider ${extraClass}`} style={{left: `${(progress*100).toFixed(2)}%`}}></button>
        </div>
    );
}

export default ProgressBar;
