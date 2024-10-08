import React from 'react';

const Timer = ({ timeSpent }) => {
    return (
        <div className="timer">
            <p>Time spent: {timeSpent} seconds</p>
        </div>
    );
};

export default Timer;
