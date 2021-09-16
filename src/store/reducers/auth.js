import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,

    inOrUp: false,
    refreshToken: null
}

// utility giúp update object immutably mà vẫn giữ mấy properties 
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.IN_OR_UP:
            return updateObject(state, {
                inOrUp: action.inOrUp
            })
        case actionTypes.AUTH_START:
            return updateObject(state, {error: null, loading: true});
        case actionTypes.AUTH_SUCCESS:
                // Sign up, keep token null
            if (action.isSignup) {
                return updateObject(state, {
                    loading: false,
                    // when sign up successfully, automatically redirect to /sign-in page
                    refreshToken: action.refreshToken,
                    userId: action.userId
                });
            } else {
                // Sign in, update token
                return updateObject(state, {
                    token: action.idToken,
                    userId: action.userId,
                    error: null,
                    loading: false,
            })};
        case actionTypes.AUTH_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false
            })
        case actionTypes.AUTH_LOGOUT:
                //remove login state from local Storage
                localStorage.removeItem('token');
                localStorage.removeItem('expirationDate');
                localStorage.removeItem('userId');
                localStorage.removeItem('password');
                // localStorage.removeItem('cart');
            return updateObject(state, {
                // clear token and userID
                token: null,
                userId: null
            })
        case actionTypes.AUTH_RESET_ERROR:
            return updateObject(state, {
                error: null
            })
        default:
            return state;
    }
}

export default reducer;