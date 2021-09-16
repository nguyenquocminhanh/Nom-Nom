import React from 'react';

import classes from './ModalImages.css';

const modalImages = props => {
    return (
        <div className={classes.ModalImages}>
            {/* Close Button */}
            <span className={classes.Close} onClick={() => props.closeClicked()}>&times;</span>
            {/* Image */}
            <img src={props.src} alt=""/>
            {/* Next Prev Button */}
            <span className={classes.Prev} onClick={() => props.prevImageCliked()} style={{display: props.isPrevHidden? 'none' : 'block'}}>&#8249;</span>
            <span className={classes.Next} onClick={() => props.nextImageCliked()} style={{display: props.isNextHidden? 'none' : 'block'}}>&#8250;</span>
        </div>
    )
}

export default modalImages;