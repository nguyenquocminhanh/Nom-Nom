import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const checkInOrUp = (bool) => {
    return {
        type: actionTypes.IN_OR_UP,
        inOrUp: bool
    }
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, refreshToken, isSignup) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        refreshToken: refreshToken,
        userId: userId,
        isSignup: isSignup,
    }
};   

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

// turn token and userId into null
export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    // async code return a function
    return dispatch => {
        // execute funcion after expirationTime passed
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    };
}

// GET TOKEN, save TOKEN to local store when SUCCESS or FAIL
// https://firebase.google.com/docs/reference/rest/auth
export const auth = (email, password, isSignup) => {
     // async code return a function
    return dispatch => {
        // Spinner is on
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        // Gửi auth(email, password) để nhận lại web token
        // API_KEY can be found in database setting

        // Sign UP API Endpoint
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZNy_WIOBsyt_3Ceu_d4hC0Vli6Q_UM70';
        // Sign In API Endpoint
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZNy_WIOBsyt_3Ceu_d4hC0Vli6Q_UM70';
        }
        axios.post(url, authData)
        //SUCCESS
            .then(response => { 
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
                // save token and expiresTime to local Storage
                // Don't save token if isSignup
                if (!isSignup) {
                    localStorage.setItem('token', response.data.idToken);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId', response.data.localId);
                }
                // response data chính là web token có (idToken, refreshToken, localId, expiresIn)
                // truyền token, userID, expiresTime vào global store
                dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.refreshToken, isSignup));
                // check time out after log in successfully
                // truyền error vào global store
                dispatch(checkAuthTimeout(response.data.expiresIn));  
            })
            //FAIL
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
};


// check token, userId, expirationTime whenever we refresh the web page, 
// should be placed in App.js
export const authCheckState = () => {
    // return dispatch to dispatch multiple actions within
    return dispatch => {
        // get token from localStorage
        const token = localStorage.getItem('token');
        // when logged out or token timeout, dont have token token
        if (!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                // bỏ token vô trong redux store để lúc mình chuyển trang thì vẫn là isAuthenticated, 
                // chỉ khi nào refresh page thì mới dùng tới hàm authCheckState lúc này vẫn update global state để keep login
                dispatch(authSuccess(token, userId, false));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }    
        };
    }
}

export const authResetError = () => {
    return {
        type: actionTypes.AUTH_RESET_ERROR,
    }
}

