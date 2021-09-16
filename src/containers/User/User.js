import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import classes from './User.css';

import {Route, Switch, withRouter} from 'react-router-dom';

import Layout from '../../hoc/Layout/Layout';
import NavItems from './NavItems/NavItems';

// import Default Interface
import DefaultUser from './DefaultUser/DefaultUser';

// import OrderHistory
import OrderHistory from './OrderHistory/OrderHistory';

// import Security
import Security from './Security/Security';

// import Profile
import Profile from './Profile/Profile';

class User extends Component {
    // when logout, redirect to logout page & clean cart in UI and remove cart in localStorage!! 
    logoutHandler = () => {
        this.props.onCleanCart();
        this.props.onLogout();

        // delete cart in localStorage when click on the logout() button
        localStorage.setItem('cart', JSON.stringify({cart: [], totalCartPrice: 0}));
        localStorage.removeItem('orderHistoryPageNumber');
    }

    render() {
        return(
            <Layout>
                <div className={classes.User}>
                    {/* Toolbar */}
                    <div className={classes.Toolbar}>
                        {/* Navigation Items */}
                        <nav>
                            <NavItems logout={this.logoutHandler}/>
                        </nav>
                    </div>

                    {/* Main Content - Nested Route */}
                    <div className={classes.UserContent}>
                        <Switch>
                            <Route path='/my-account/order-history' component={OrderHistory}/>
                            <Route path='/my-account/security' component={Security}/>
                            <Route path="/my-account/profile" component={Profile}/>
                            <Route path='/my-account' component={DefaultUser}/> 
                        </Switch>
                    </div>   
                </div>
            </Layout>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionCreators.logout()),
        onCleanCart: () => dispatch(actionCreators.emptyCart())
    }
}

export default connect(null, mapDispatchToProps)(withRouter(User));