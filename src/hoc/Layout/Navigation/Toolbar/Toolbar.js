import React from 'react';

import classes from './Toolbar.css';

import Logo from '../../../../components/UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle drawerToggleClicked={props.drawerToggleClicked}/>
            <div className={classes.Name}>Ăn Gì Nom Nom</div>
            <Logo/>
            {/* navigation buttons*/}
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}  isSignup={props.isSignup}/>
            </nav>
        </header>
    )
}

export default toolbar;