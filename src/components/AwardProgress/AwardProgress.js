import React from 'react';
import classes from './AwardProgress.css';

const awardProgress = props => {
    return (
        <div className={classes.Container}>
            <h3 style={{textAlign: 'center'}}>Your next award progress</h3>
            <div className={classes.ProgressbarContainer}>
                <div className={classes.ProgressbarComplete} style={{width: `50%`}}>
                    <div className={classes.ProgressbarLiquid}></div>
                </div>
                <span className={classes.Progress}>50%</span>
            </div>
        </div>
    )
};

export default awardProgress;
