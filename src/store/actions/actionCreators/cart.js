// actionCreators

import * as actionTypes from '../actionTypes';
import axios from '../../../axios/axios-orders';
import {totalCartPriceUpdateHandler} from '../../reducers/cart';

export const addToCart = (dish, amount) => {
    return {
        type: actionTypes.ADD_TO_CART,
        addedDish: dish,        // object
        amount: amount,          // number
    }
}

export const updateCartPrice = () => {
    return {
        type: actionTypes.UPDATE_CART_PRICE
    }
}

export const increaseNumberItem = (idOfEditedItem) => {
    return {
        type: actionTypes.INCREASE_NUMBER_OF_ITEM_IN_CART,
        id: idOfEditedItem
    }
}

export const decreaseNumberItem = (idOfEditedItem) => {
    return {
        type: actionTypes.DECREASE_NUMBER_OF_ITEM_IN_CART,
        id: idOfEditedItem
    }
}

export const removeItem = (idOfRemovedItem) => {
    return {
        type: actionTypes.REMOVE_ITEM_FROM_CART,
        id: idOfRemovedItem
    }
}
 
export const emptyCart = () => {
    return {
        type: actionTypes.EMPTY_CART
    }
}

export const getCartSuccess = (cart, totalCartPrice) => {
    return {
        type: actionTypes.GET_CART_SUCCESS,
        cart: cart,
        totalCartPrice: totalCartPrice
    }
}

export const getCartFail = (error) => {
    return {
        type: actionTypes.GET_USER_PROFILE_FAIL,
        error: error
    }
}

export const getCartFromExternalSource = () => {
    if (localStorage.getItem('token') === null) {
        // GET items in cart from localStorage về lại State
        const cart = JSON.parse(localStorage.getItem('cart')).cart;
        const totalCartPrice = JSON.parse(localStorage.getItem('cart')).totalCartPrice;
        return dispatch => {
            dispatch(getCartSuccess(cart, totalCartPrice))
        }
    }
    
    // chỉ duy nhất get cart của user từ DB về khi localStorage cart empty []
    else {    
        return dispatch => {
            const queryParams = '?auth=' + localStorage.getItem('token') + '&orderBy="userId"&equalTo=' + '"' + localStorage.getItem('userId') + '"';

            axios.get('/carts.json' + queryParams)
                //SUCCESS
                .then(response => {
                    // MAKE SURE EACH USER ONLY HAVE 1 CART
                    const cartInfo = Object.values(response.data)[0];
                    console.log(response.data);
                    dispatch(getCartSuccess(cartInfo.cart.concat(), cartInfo.totalCartPrice))
                })
                //FAIL
                .catch(err => {
                    dispatch(getCartFail(err.response));
                    console.log(err.response);
                })
        }
    }   
}

// combine localstorage to database when user sign in and had items in cart
export const combineLocalStorageToDatabaseSuccess = (combinedCart, totalCartPrice) => {
    return {
        type: actionTypes.COMBINE_LOCAL_STORE_CART_TO_DB_CART_SUCCESS,
        combinedCart: combinedCart,
        totalCartPrice: totalCartPrice
    }
}

export const combineLocalStorageToDatabase = () => {
    return dispatch => {
        const queryParams = '?auth=' + localStorage.getItem('token') + '&orderBy="userId"&equalTo=' + '"' + localStorage.getItem('userId') + '"';
        axios.get('/carts.json' + queryParams)
            .then(response => {
                const uniqueKey = Object.keys(response.data)[0];
                const dbCart = Object.values(response.data)[0].cart ? Object.values(response.data)[0].cart : [];
                const localCart = JSON.parse(localStorage.getItem('cart')).cart;
                
                dbCart.forEach(dbItem => {
                    for (let i = 0; i < localCart.length; i++) {
                        if (localCart[i].id === dbItem.id) {
                            dbItem.quantity = dbItem.quantity + localCart[i].quantity;
                            // delete item in localCart if have the same item ID
                            localCart.splice(i, 1);
                        }
                    }
                })

                const updatedCart = {
                    cart: dbCart.concat(localCart),
                    totalCartPrice: totalCartPriceUpdateHandler(dbCart.concat(localCart))
                }

                axios.patch('/carts/' + uniqueKey + '.json?auth=' + localStorage.getItem('token'), updatedCart)
                    .then(response => {
                        console.log(response);
                        dispatch(combineLocalStorageToDatabaseSuccess(dbCart.concat(localCart), totalCartPriceUpdateHandler(dbCart.concat(localCart))));
                        localStorage.setItem('cart', JSON.stringify({cart: [], totalCartPrice: 0}));
                    })
                    .catch(err => {
                        console.log(err.data)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

// DELETE USER

export const deleteCartStart = () => {
    return {
        type: actionTypes.DELETE_CART_START
    }
}

export const deleteCartSuccess = () => {
    return {
        type: actionTypes.DELETE_CART_SUCCESS
    }
}

export const deleteCartFail = () => {
    return {
        type: actionTypes.DELETE_CART_FAIL
    }
}

export const deleteCart = () => {
    const queryParams = '?auth=' + localStorage.getItem('token') + '&orderBy="userId"&equalTo=' + '"' + localStorage.getItem('userId') + '"';
    return dispatch => {
        dispatch(deleteCartStart());
        
        axios.get('/carts.json' + queryParams)
            .then(response => {
                const uniqueKey = Object.keys(response.data)[0];
                axios.delete('/carts/' + uniqueKey + '.json?auth=' + localStorage.getItem('token'))
                    .then(response => {
                        dispatch(deleteCartSuccess());
                        console.log(response)
                    })
                    .catch(err => {
                        dispatch(deleteCartFail());
                        // null
                        console.log(err.response.data)
                    })
                
            }) 
            .catch(err => {
                dispatch(deleteCartFail(err.data));
                console.log(err.data)
            })
    }
}