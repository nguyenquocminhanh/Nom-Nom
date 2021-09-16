import React from 'react';
import classes from './SideDrawer.css'

import Logo from '../../../../components/UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../../../components/UI/Backdrop/Backdrop';
import Aux from '../../../Auxiliary/Auxiliary';

const sideDrawer = props => {
    // ******
    // Default: SideDrawer Close
    let attachedClasses = [classes.SideDrawer, classes.Close];
    // If open -> SideDrawer Open
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
        {/* Backdrop should be located parallel with SideDrawer */}
            <BackDrop show={props.open} backdropClicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div 
                    // Logo in SideDrawer has margin, not Login in both Toolbar and SideDrawer
                    style={{marginBottom: "25px"}}
                >
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}  isSignup={props.isSignup}/>
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;