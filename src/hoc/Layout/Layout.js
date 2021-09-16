import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Layout.css';

// Import Toolbar
import Toolbar from './Navigation/Toolbar/Toolbar';
// Import SideDrawer
import SideDrawer from './Navigation/SideDrawer/SideDrawer';
// Import Footer
import Footer from './Footer/Footer';

import Aux from '../Auxiliary/Auxiliary';


class Layout extends Component {
    state = {
        // Default
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState(
            {
                showSideDrawer: false
            }
        )
    }

    sideDrawerOpenedHandler = () => {
        this.setState(
            {
                showSideDrawer: true
            }
        )
    }

    render() {
        // useState hook
        // const [showSideDrawer, setSideDrawer] = useState(false);

        // const sideDrawerClosedHandler = () => {
        //     setSideDrawer(false);
        // };

        // const sideDrawerToggleHandler = () => {
        //     setSideDrawer(!showSideDrawer);
        // }
        
        return(
            <Aux>  

            {/* Toolbar and SideDrawer are in Navigation */}
                {/* Toolbar */}
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerOpenedHandler}
                    isSignup={this.props.isSignup}/>
            
                {/* SideDrawer */}
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    isSignup={this.props.isSignup}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>

                {/* Main Content */}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
               
                {/* Footer */}
                <Footer refProps={this.props.refProps}/>
            </Aux>
        )
    }   
};

const mapStateToProps = state => {
    return {
        // pass authenticate to Navigation Items to change UI when user is authenticated 
        isAuthenticated: state.auth.token !== null,
        isSignup: state.auth.isSignup
    }
}

export default connect(mapStateToProps, null)(Layout);