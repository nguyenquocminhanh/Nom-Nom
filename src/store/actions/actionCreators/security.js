import * as actionTypes from '../actionTypes';
import axios from 'axios';

// CHANGE PASSWORD
export const changePasswordStart = () => {
    return {
        type: actionTypes.CHANGE_PW_START
    };
};

export const changePasswordSuccess = (token) => {
    return {
        type: actionTypes.CHANGE_PW_SUCCESS,
        newToken: token
    }
};

export const changePasswordFail = (error) => {
    return {
        type: actionTypes.CHANGE_PW_FAIL,
        error: error
    }
};

export const changePassword = (newPassword) => {
    return dispatch => {
        // START
        dispatch(changePasswordStart());

        // Get Token from local Storage
        const token = localStorage.getItem('token');

        const bodyPayload = {
            idToken: token,
            password: newPassword,
            returnSecureToken: true
        };

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAZNy_WIOBsyt_3Ceu_d4hC0Vli6Q_UM70', bodyPayload)
            // SUCCESS
            .then(response => {
                dispatch(changePasswordSuccess(response.data.idToken))
                localStorage["token"] = response.data.idToken;
                localStorage["password"] = newPassword;
            })
            // FALSE
            .catch(err => {
                dispatch(changePasswordFail(err.response.data.error));
            })
    }
}

// SEND EMAIL to RESET PASSWORD
export const sendEmailStart = () => {
    return {
        type: actionTypes.SEND_PASSWORD_RESET_EMAIL_START
    };
};

export const sendEmailSuccess = () => {
    return {
        type: actionTypes.SEND_PASSWORD_RESET_EMAIL_SUCCESS,
    }
};

export const sendEmailFail = (error) => {
    return {
        type: actionTypes.SEND_PASSWORD_RESET_EMAIL_FAIL,
        error: error
    }
};

export const sendEmail = (email) => {
    return dispatch => {
        // START
        dispatch(sendEmailStart());

        const bodyPayload = {
            requestType: "PASSWORD_RESET",
            email: email
        }
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAZNy_WIOBsyt_3Ceu_d4hC0Vli6Q_UM70", bodyPayload)
            .then(response => {
                dispatch(sendEmailSuccess())
            })
            .catch(error => {
                dispatch(sendEmailFail(error.response.data.error))
            })
    }
}


// DELETE ACCOUNT

export const deleteAccountStart = () => {
    return {
        type: actionTypes.DELETE_ACCOUNT_START
    }
};

export const deleteAccountSuccess = (token) => {
    return {
        type: actionTypes.DELETE_ACCOUNT_SUCCESS,
        token: token
    }
};

export const deleteAccountFail = (error) => {
    return {
        type: actionTypes.DELETE_ACCOUNT_FAIL,
        error: error
    }
};

export const deleteAccount = () => {
    return dispatch => {
        dispatch(deleteAccountStart());

        const bodyPayload = {
            idToken: localStorage.getItem('token')
        }

        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyAZNy_WIOBsyt_3Ceu_d4hC0Vli6Q_UM70", bodyPayload)
            .then(response => {
                dispatch(deleteAccountSuccess());
            })
            .catch(error => {
                dispatch(deleteAccountFail(error))
            })
    }
}
