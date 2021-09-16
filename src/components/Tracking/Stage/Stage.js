import React from 'react';
import classes from './Stage.css'

const stage = props => {
    return (
        <div className={classes.StageContainer}>
            <div className={classes.Process} style={{minHeight: props.isLastStage ? '2rem' : '7rem'}}>
                {!props.isLastStage ? 
                <div className={classes.Bar}>
                    {/* broken line */}
                    <div className={classes.BarBackground}>

                    </div>

                    {props.isChecked ? 
                        // colored line
                        <div className={classes.BarForeground} style={{height: props.isNextStageChecked ? "100%" : "92%"}}>
                            
                        </div> : null}
                </div> : null}

                <div className={classes.CheckBox} style={{backgroundColor: props.isChecked? '#4DC2B4' : '#fff', border: props.isChecked? '3px solid #4DC2B4' : '3px solid lightgray'}}>
                    {props.isChecked? 
                        <div className={classes.Icon}>
                        
                        </div> : null}
                </div>
            </div>

            <div className={classes.StatusContainer} style={{minHeight: props.isLastStage ? '2rem' : '7rem'}}>
                <span className={classes.Status} style={{color: props.isChecked ? "#002F36" : "#6C7778", fontWeight: props.isChecked? "700" : "0"}}>
                    {props.children}
                </span>
            </div>
        </div>
    )
};

export default stage;
