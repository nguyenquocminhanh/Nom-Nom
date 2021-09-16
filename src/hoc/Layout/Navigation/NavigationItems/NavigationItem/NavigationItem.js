import React from 'react';
import classes from './NavigationItem.css';
import {withRouter, NavLink} from 'react-router-dom';

const navigationItem = props => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink
                // Để lúc Hover chuột vào sẽ gợi ý
                title={props.type}
                to={props.targerLink}
                // only exactly to the path link, activeStyle mới đc applied active
                //  cho NavLink đó
                exact={props.exact}
                activeStyle={{color: 'white', backgroundColor: '#BF5C2C'}}
                className={classes.Nav}>
                    {props.children}
                    <div className={classes.Type}>{props.type}</div>
            </NavLink>
        </li>
    )
}
export default withRouter(navigationItem); 