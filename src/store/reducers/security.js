import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    // for reset password
    isSentRequest: false,
    // for delete account
    isAccountDeleted: false
}

// utility giúp update object immutably mà vẫn giữ mấy properties 
const reducer = (state = initialState, action) => {
    switch(action.type) {
        // START
        case actionTypes.CHANGE_PW_START:
            return updateObject(state, {
                loading: true, 
                error: null
            });

        case actionTypes.CHANGE_PW_SUCCESS:
            return updateObject(state, {
                token: action.newToken,
                loading: false
            })
            
        case actionTypes.CHANGE_PW_FAIL:
            return updateObject(state, {
                error: action.error, 
                loading: false, 
            })


        // RESET PASSWORD
        case actionTypes.SEND_PASSWORD_RESET_EMAIL_START:
            return updateObject(state, {
                loading: true,
                error: null
            })
        
        case actionTypes.SEND_PASSWORD_RESET_EMAIL_SUCCESS:
            return updateObject(state, {
                loading: false,
                isSentRequest: true
            })

        case actionTypes.SEND_PASSWORD_RESET_EMAIL_FAIL:
            return updateObject(state, {
                loading: false,
                error: action.error,
                isSentRequest: true 
            })
        
        // DELETE ACCOUNT
        case actionTypes.DELETE_ACCOUNT_START:
            return updateObject(state, {
                loading: true,
                error: null,
                isAccountDeleted: false
            })
        
        case actionTypes.DELETE_ACCOUNT_SUCCESS:
            return updateObject(state, {
                loading: false,
                isAccountDeleted: true
            })

        case actionTypes.DELETE_ACCOUNT_FAIL:
            return updateObject(state, {
                loading: false,
                error: action.error,
                isAccountDeleted: false
            })

        default:
            return state;
    }
}

export default reducer;