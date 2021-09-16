import React from 'react';
import classes from './Logo.css'
import {withRouter} from 'react-router-dom'

import nomnomLogo from '../../../assets/Images/Logo/Logo2.jpg'

const logo = props => {
    return (
        <div className={classes.Logo} onClick={() => {props.history.push('/')}}>
            <img src={nomnomLogo} alt="Logo"/>
        </div>
    )
}

export default withRouter(logo);