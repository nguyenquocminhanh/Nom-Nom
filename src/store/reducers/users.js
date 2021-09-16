import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
    userId: null,

    isDetailsLoading: false,
    isAddressLoading: false,
    isContactLoading: false,
    isLoading: false,
    error: null,

    // details
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    // address
    street: '',
    apt: '',
    city: '',
    state: '',
    zipcode: '',
    // contact
    email: '',
    phone: ''
}

// utility giúp update object immutably mà vẫn giữ mấy properties 
const reducer = (state = initialState, action) => {
    switch(action.type) {
        // CREATE USER
        case actionTypes.CREATE_USER:
            return updateObject(state, {
                firstName: action.firstName,
                lastName: action.lastName,
                gender: action.gender,
                email: action.email,
                userId: action.userId
            })

        // GET PROFILE
        case actionTypes.GET_USER_PROFILE_START: 
            return updateObject(state, {
                isLoading: true
            })   

        case actionTypes.GET_USER_PROFILE_SUCCESS:
            return updateObject(state, {
                isLoading: false,
                firstName: action.firstName,
                lastName: action.lastName,
                gender: action.gender,
                dob: action.dob,

                street: action.street,
                apt: action.apt,
                city: action.city,
                state: action.state,
                zipcode: action.zipcode,

                email: action.email,
                phone: action.phone
            })

        case actionTypes.GET_USER_PROFILE_FAIL:
            return updateObject(state, {
                isLoading: false,
                error: action.error
            })
        
        // CLEAN PROFILE after log out
        case actionTypes.CLEAN_USER_PROFILE:
            return updateObject(state, {
                firstName: '',
                lastName: '',
                gender: '',
                dob: '',

                street: '',
                apt: '',
                city: '',
                state: '',
                zipcode: '',

                email: '',
                phone: ''
            })

        // EDIT DETAILS
        case actionTypes.EDIT_DETAILS_USER_START:
            return updateObject(state, {
                isDetailsLoading: true,
            })

        case actionTypes.EDIT_DETAILS_USER_SUCCESS:
            return updateObject(state, {
                isDetailsLoading: false,
                
                firstName: action.firstName,
                lastName: action.lastName,
                gender: action.gender,
                dob: action.dob
            })

        case actionTypes.EDIT_DETAILS_USER_FAIL:
            return updateObject(state, {
                isDetailsLoading: false,
                error: action.error
            })

        // EDIT ADDRESS
        case actionTypes.EDIT_ADDRESS_USER_START:
            return updateObject(state, {
                isAddressLoading: true,
            })

        case actionTypes.EDIT_ADDRESS_USER_SUCCESS:
            return updateObject(state, {
                isAddressLoading: false,
                
                street: action.street,
                apt: action.apt,
                city: action.city,
                state: action.state,
                zipcode: action.zipcode
            })

        case actionTypes.EDIT_ADDRESS_USER_FAIL:
            return updateObject(state, {
                isAddressLoading: false,
                error: action.error
            })


        // EDIT CONTACT
        case actionTypes.EDIT_CONTACT_USER_START:
            return updateObject(state, {
                isContactLoading: true,
            })

        case actionTypes.EDIT_CONTACT_USER_SUCCESS:
            return updateObject(state, {
                isContactLoading: false,

                email: action.email,
                phone: action.phone
            })

        case actionTypes.EDIT_CONTACT_USER_FAIL:
            return updateObject(state, {
                isContactLoading: false,
                error: action.error
            })

        // Delete User
        case actionTypes.DELETE_USER_START: 
            return updateObject(state, {
                isLoading: true
            })

        case actionTypes.DELETE_USER_SUCCESS: 
            return updateObject(state, {
                isLoading: false
            })

        case actionTypes.DELETE_USER_FAIL: 
            return updateObject(state, {
                isLoading: false
            })

        default:
            return state;
    }
}

export default reducer;