// actionCreators

import * as actionTypes from '../actionTypes';

export const updateLovedItem = (id) => {
    return {
        type: actionTypes.UPDATE_LOVED_ITEM,
        id: id
    }
}

export const getLovedItemsSuccess = (lovedItems) => {
    return {
        type: actionTypes.GET_LOVED_ITEMS_SUCCESS,
        lovedItems: lovedItems
    }
}

export const getLovedItemsFail = () => {
    return {
        type: actionTypes.GET_LOVED_ITEMS_FAIL
    }
}

export const getLovedItems = () => {
    return dispatch => {
        // success
        // pass lovedItems from localStorage to global state
        if (JSON.parse(localStorage.getItem('lovedItems'))) {
            let lovedItems = JSON.parse(localStorage.getItem('lovedItems'));
            dispatch(getLovedItemsSuccess(lovedItems));
        }
        else {
            dispatch(getLovedItemsFail());
        }
        
    }
}