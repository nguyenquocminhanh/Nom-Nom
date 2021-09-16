import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import classes from './NavItem.css';

const navItem = props => {
    return (
        <li className={classes.NavItem}>
            <NavLink 
                onClick={props.clicked}
                className={classes.Nav}
                title={props.type}
                to={props.targetLink}
                exact
                activeStyle={{fontWeight: 'bold', backgroundColor:'darkgoldenrod'}}
            >
                    {props.children}
                    {/* Hint */}
                    <div className={classes.Type}>{props.type}</div>
            </NavLink>
        </li>
    )
}

export default withRouter(navItem);
