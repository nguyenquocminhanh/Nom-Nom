import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Import Router
import {BrowserRouter} from 'react-router-dom';

// Import Redux
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

// Import Reducer
import menuBuilderReducer from './store/reducers/menuBuilder';
import cartReducer from './store/reducers/cart';
import authReducer from './store/reducers/auth';
import securityReducer from './store/reducers/security';
import usersReducer from './store/reducers/users';

// development mode mới có thể xem được redux store, producing mode ko thể xem được redux store
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

// combine reducers:
const rootReducer = combineReducers({
  menuBuilder: menuBuilderReducer,
  cart: cartReducer,
  auth: authReducer,
  security: securityReducer,
  users: usersReducer
})
 

// ONLY USE ONE STORE IN AN APP!!
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
