import React, {useEffect, Component} from 'react';
import 'animate.css'

// Import Router
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';

// Import connect from React-redux
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';

// Import Component
import MenuBuilder from './containers/MenuBuilder/MenuBuilder';

// Import NotFound
import NotFound from './containers/NotFound/NotFound';

// Import Intro
import Intro from './containers/Intro/Intro';

// Import Shopping Cart
import ShoppingCart from './containers/ShoppingCart/ShoppingCart';

// Import Checkout
import Checkout from './containers/Checkout/Checkout';

// Import Loved Items
import LovedItems from './containers/LovedItems/LovedItems'

// Import SignIn
import SignIn from './containers/Authenticate/SignIn/SignIn';

// Import SignUp
import SignUp from './containers/Authenticate/SignUp/SignUp';

// Import Reset PW
import ResetPassword from './containers/Authenticate/ResetPassword/ResetPassword';

// Import Confirmation Page
import Confirmation from './containers/Confirmation/Confirmation';

// Import Payment
// import Payment from './containers/Payment/Payment';

// Import User
import User from './containers/User/User';

class App extends Component {
  // anytime we refresh the page, 
  // the page will check the auth information from local storage to decide
  // whether the user is logged out or still in
  componentDidMount = () => {
    this.props.onAutoCheckAuth();
    // mỗi lần refresh page thì state mất => getCart của người đó lưu từ database truyền xuống state lại
    // /> sẽ ko bao giờ bị mất cart sau mỗi lần refresh page
    this.props.onGetCartFromExternalSource();  
    this.props.onGetLovedItems();
    
    // check localstoarge
    if (JSON.parse(localStorage.getItem('cart')).expireTimeout && new Date().getTime() > JSON.parse(localStorage.getItem('cart')).expireTimeout) {
      localStorage.setItem('cart', JSON.stringify({cart: [], totalCartPrice: 0}))
    }   
  }

  componentDidUpdate = (prevProps, prevState) => {
    // scroll to top when navigate
    if (this.props.location.pathname !== prevProps.location.pathname && this.props.location.hash === "") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      })
    }

    // when logout or token time out, clean previous user's profile
    if (prevProps.isAuthenticated !== this.props.isAuthenticated && localStorage.getItem('token') === null) {
      this.props.onCleanUserProfile();
    }
    // When log in, get previous user's cart from database
    if (prevProps.isAuthenticated !== this.props.isAuthenticated && localStorage.getItem('token') !== null) {
      // only combine when there are items in cart of localStorage
      if(JSON.parse(localStorage.getItem('cart')).cart.length !== 0) {
        this.props.onCombineToCart();
      }
      // nếu ko có items trong cart ở localStorage thì chỉ cần get về thôi ko cần combine r mới get
      else {
        this.props.onGetCartFromExternalSource();
      }
    }
  }

  componentWillMount = () => {
    // make sure localStorage allways exist 'cart' (at least []) at anytime
    if (JSON.parse(localStorage.getItem('cart')) === null) {
      localStorage.setItem('cart', JSON.stringify({cart: [], totalCartPrice: 0}))
    }
  }
  
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
  }

  render() {
    let routes = (
      // Switch to tell React Router to load ONLY ONE ROUTE AT A TIME 
      // only the first route từ trên xuống match the given path (not render TWO ROUTEs in THE SAME TIME)
      // The order of Routes is important when using Swtich

      // without Link, the application will be reloaded
      // anytime changing route, which will make the previous state be lost
      // Switch help us to stay inside the app when clicking on links

    // Define the Route with paths, which ReactJS can access via paths
      <Switch>
        <Route path="/menu/loved-items" exact component={LovedItems}/>  
        {/* User ko có exact để có thể access tới nested route bên trong User  */}
        {/* <Route path="/payment" exact component={Payment}/> */}
        <Route path="/sign-in" exact component ={SignIn}/>
        <Route path="/sign-up" exact component ={SignUp}/>
        <Route path="/reset-password" component={ResetPassword}/>
        <Route path="/menu" exact component={MenuBuilder}/>
        <Route path="/shopping-cart" exact component={ShoppingCart}/>
        {/* GUARD */}
        <Route path="/confirmation" exact component={Confirmation}/>
        <Route path="/checkout" exact component={Checkout}/>
        {this.props.isAuthenticated ? <Route path="/my-account" component={User}/> : null}
        <Route path="/" exact component={Intro}/>
        {/* Handler 404 */}
        <Route component={NotFound}/>
      </Switch>  
    )

    return (
      <div>
        {routes}
      </div>
    )
  }
}
 
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    cart: state.cart.cart
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    onAutoCheckAuth: () => dispatch(actionCreators.authCheckState()),
    onCleanUserProfile: () => dispatch(actionCreators.cleanUserProfile()),
    onGetCartFromExternalSource: () => dispatch(actionCreators.getCartFromExternalSource()),
    onCombineToCart: () => dispatch(actionCreators.combineLocalStorageToDatabase()),
    onGetLovedItems: () => dispatch(actionCreators.getLovedItems())
  }
}

// hoc withRouter to pass the Router-Related props to other 
// presentational components which are connected with containers
export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(App));
