import React, {Component} from 'react';
import classes from './NavigationItems.css'
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

// React-icons
import {FaUtensils, FaHeart, FaHome} from 'react-icons/fa';
import {BiShoppingBag, BiUserCircle} from 'react-icons/bi';
import {FiLogIn} from 'react-icons/fi';

import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component {
    numberOfItemAddedToCartHandler = (cart) => {
        let totalItemsAdded = 0;
        
        // Cart is hided in database
        if (!cart) {
            return 0;
        }

        // Cart is Empty
        else if (cart.length === 0) {
            return totalItemsAdded;
        }
        // Cart has items
        else {
            cart.map(item => {
                totalItemsAdded = totalItemsAdded + item.quantity;
            })
            return totalItemsAdded;
        }
    }

    numberOfItemLovedtHandler = (dishes) => {
        return dishes.filter(dish => dish.isLoved == true).length;
    }

    
    render() {
        return (
            <ul className={classes.NavigationItems}>
                {/* Home Page */}
                <NavigationItem exact targerLink='/' type='Home Page' exact={true}>  
                    <FaHome className={classes.Icon}/>
                </NavigationItem>

                {/* Menu */}
                <NavigationItem targerLink='/menu' type='Menu' exact={true}>  
                    <FaUtensils className={classes.Icon}/>
                </NavigationItem>
                
                {/* Loved Items/ Wish List */}
                <NavigationItem targerLink={'/menu/loved-items'} type='Wish List'>  
                    <FaHeart className={classes.Icon}/>
                    {this.numberOfItemLovedtHandler(this.props.dishes) >0 ? 
                        <div className={classes.NumberOfItem} style={{top: '30%', left: '65%'}}>
                            <span>{this.numberOfItemLovedtHandler(this.props.dishes)}</span>
                        </div> : null}
                </NavigationItem>
                
                {/* Shopping Cart */}
                <NavigationItem targerLink='/shopping-cart' type='Cart'>
                    <BiShoppingBag className={classes.Icon}/>
                    { this.numberOfItemAddedToCartHandler(this.props.cart) >0 ? 
                        <div className={classes.NumberOfItem}>
                            <span>{this.numberOfItemAddedToCartHandler(this.props.cart)}</span> 
                        </div> : null}
                </NavigationItem>
                
                {/* User Info*/}
                {/* change UI when authenticated */}
                {this.props.isAuthenticated
                    ? <NavigationItem targerLink='/my-account' type='User'>
                        <BiUserCircle className={classes.Icon}/>
                    </NavigationItem>
                    : <NavigationItem targerLink='/sign-in' type='Log In'>
                        <FiLogIn className={classes.Icon}/>
                    </NavigationItem>}
            </ul>
    )
    } 
}
 
const mapStateToProps = state => {
    return {
        dishes: state.menuBuilder.dishes,
        cart: state.cart.cart,
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps, null)(withRouter(NavigationItems));