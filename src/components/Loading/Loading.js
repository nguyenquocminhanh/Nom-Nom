import React from 'react';
import classes from './Loading.css'
import {logo} from '../../assets/Images/index';

import {Fade} from 'react-awesome-reveal';

const loading = props => {
    return (
        <div className={classes.Loading}>
            <Fade duration="300">
                <img src={logo}/>
            </Fade>
        </div>
    )
}

export default loading;