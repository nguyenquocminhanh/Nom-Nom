import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios/axios-orders';

const initialState = {
    cart: [],
    totalCartPrice: 0,
    error: null
}

// EDIT CART ON DATABASE
const patchCartToExternal = (updateCartHandler) => {
    // ưu tiên update cart localStorage trước, nếu localStorage ko có item nào trong cart thì mới tới fetch database
    // update increase, decrease, empty, remove (not involved add) items của cart trong localStorage khi localStorage.cart.length !== 0
    if (JSON.parse(localStorage.getItem('cart')).cart.length !== 0) {
        const updatedCart = {
            cart: updateCartHandler,
            totalCartPrice: totalCartPriceUpdateHandler(updateCartHandler)
        }
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
    else {
        // updateCartHandler return updated cart
        const queryParams = '?auth=' + localStorage.getItem('token') + '&orderBy="userId"&equalTo=' + '"' + localStorage.getItem('userId') + '"';
                
        //get unique key của cart trong database dựa theo userId
        // MAKE SURE EACH USER HAS ONLY 1 CART!!
        axios.get('/carts.json' + queryParams)
            .then(response => {
                const uniqueKey = Object.keys(response.data)[0]
                
                const updatedCart = {
                    cart: updateCartHandler,
                    totalCartPrice: totalCartPriceUpdateHandler(updateCartHandler),
                }

                axios.patch('/carts/' + uniqueKey + '.json?auth=' + localStorage.getItem('token'), updatedCart)
                    .then(response => {
                        console.log(response);
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


// function add item to cart and check whether item pre-exist or not
// if yes -> increase quantity, otherwise add to cart 
const addItemToCartHandler = (item, cart) => {
    // If it finds an array element where first duplicate ID element,
    // findIndex() returns the value of that array element (and does not check the remaining values)
    // Otherwise it returns undefined
    
    // Case: empty cart in Database after checkout or removing all items from cart
    if (!cart) {
        return [].concat(item);
    }

    else {
        let duplicatedItem = cart.find(prevOder => prevOder['id'] === item['id']);
        let duplicatedIndex = cart.findIndex(prevOder => prevOder['id'] === item['id']);
        if (duplicatedItem === undefined) {
            return cart.concat(item);
        }
        else {
            // **** REMEMBER UPDATE ARRAY IMMUTABLY ***
            // let updatedCart = [...cart];
            // updatedCart[duplicatedIndex]['quantity'] = updatedCart[duplicatedIndex]['quantity'] + item['quantity'];
            // return updatedCart;
            return cart.map((itemm, index) => {
                if (index !== duplicatedIndex) {
                    return itemm
                }
                return {
                    ...itemm,
                    quantity: itemm['quantity'] + item['quantity']
                }
            })
        }
    }
}

/* Tìm trong array cart, element nào có id trùng với
id của item bị removed thì xóa item đó khỏi array rồi
trả về immutable array và immutable state */  
const removeItemFromCartHandler = (cart, id) => {
    // Dùng filter để update array immutably
    let updatedCart = cart.filter(item => item.id !== id);
    return updatedCart;
}

/* Tìm trong array cart, element nào có id trùng với
id của item được increase quantity thì
cập nhật quantity +1 item đó rồi trả về
immutable array và immutable state */  
const increaseNumberOfItemHandler = (cart, id) => {
    let updatedCart = cart.map(item => {
        if (item.id === id) {
            return Object.assign({}, item, {quantity: item.quantity + 1})
        }
        // map return new array (put each element in function to run)
        return item;
    })
    return updatedCart;
}

/* Tìm trong array cart, element nào có id trùng với
id của item bị decrease quantity thì
cập nhật quantity -1 item đó rồi trả về
immutable array và immutable state */ 
const decreaseNumberOfItemHandler = (cart, id) => {
    let updatedCart = cart.map(item => {
        if (item.id === id) {  
            return Object.assign({}, item, {quantity: item.quantity - 1})   
        }
        return item;
    })
    return updatedCart;
}

// Empty Cart
const emptyCartHandler = (cart) => {
    // Case: empty cart in Database after checkout or removing all items from cart
    if (!cart) {
        return [];
    }
    else {
        cart.length = 0;
        return cart;
    }  
}

// Update Cart Price anytime Cart is updated(DELETE, ADD, EDIT)
export const totalCartPriceUpdateHandler = (cart) => {
    // Case: empty cart in Database after checkout or removing all items from cart
    if (!cart) {
        return 0;
    }

    else {
        // input variable is array
        let totalCartPrice = 0;
        //  Calls a function for each array element
        cart.forEach(item => {
            totalCartPrice = totalCartPrice + item['price'] * item['quantity'];
        })
        return totalCartPrice;
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            // addedDish: object
            const item = {
                id: action.addedDish.id,
                label: action.addedDish.label,
                price: action.addedDish.price.toFixed(2),
                image: action.addedDish.image,
                isLoved: action.addedDish.isLoved,

                quantity: action.amount
            }

            if
            // (JSON.parse(localStorage.getItem('cart')).cart.length !== 0 ||
            // unauthenticated
            (localStorage.getItem('token') === null) {
                const updatedCart = {
                    cart: addItemToCartHandler(item, state.cart),
                    totalCartPrice: totalCartPriceUpdateHandler(addItemToCartHandler(item, state.cart)),
                    expireTimeout: (new Date()).getTime() + 10 * 30 * 1000 // 30 minutes, time is calculated since the last time user put item to cart
                }
                localStorage.setItem('cart', JSON.stringify(updatedCart))
            }

            else {
                // ############## PUT UPDATED CART ON DATABASE IN CASE DID NOT HAVE ANY ITEMS IN CART YET
                // SET DATABASE ONLY AUTHENTICATED USER mới có thể post lên
                const queryParams = '?auth=' + localStorage.getItem('token') + '&orderBy="userId"&equalTo=' + '"' + localStorage.getItem('userId') + '"';
                
                //get unique key của cart trong database dựa theo userId
                // MAKE SURE EACH USER HAS ONLY 1 CART!!
                axios.get('/carts.json' + queryParams)
                    .then(response => {
                        const uniqueKey = Object.keys(response.data)[0]

                        if (uniqueKey === undefined) {
                            const newCart = {
                                cart: addItemToCartHandler(item, state.cart),
                                totalCartPrice: totalCartPriceUpdateHandler(addItemToCartHandler(item, state.cart)),
                                userId: localStorage.getItem('userId')
                            }
                            // tạo cart mới trong database cho user
                            axios.post('/carts.json?auth=' + localStorage.getItem('token'), newCart)
                                .then(response => {
                                    console.log(response.data)
                                })
                                .catch(err => {
                                    console.log(err.data)
                                })
                        }
                        else {       
                            const updatedCart = {
                                cart: addItemToCartHandler(item, state.cart),
                                totalCartPrice: totalCartPriceUpdateHandler(addItemToCartHandler(item, state.cart))
                            }
                            // edit cart có sẵn cho database của user
                            axios.patch('/carts/' + uniqueKey + '.json?auth=' + localStorage.getItem('token'), updatedCart)
                                .then(response => {
                                    console.log(response);
                                })
                                .catch(err => {
                                    console.log(err.data)
                                })
                        }
                    })
                    .catch(err => {
                        console.log(err.data);
                    })
                // ###############
            }
            // Xong hết rồi mới update redux state
            return {
                ...state,
                cart: addItemToCartHandler(item, state.cart)
            }
           

        case actionTypes.UPDATE_CART_PRICE:
            const updatedTotalCartPrice = totalCartPriceUpdateHandler(state.cart)
            return {
                ...state,
                totalCartPrice: updatedTotalCartPrice
            }

        case actionTypes.REMOVE_ITEM_FROM_CART:
            patchCartToExternal(removeItemFromCartHandler(state.cart, action.id));

            return {
                ...state,
                cart: removeItemFromCartHandler(state.cart, action.id)
            }

        case actionTypes.INCREASE_NUMBER_OF_ITEM_IN_CART:
            patchCartToExternal(increaseNumberOfItemHandler(state.cart, action.id));

            return {
                ...state,
                cart: increaseNumberOfItemHandler(state.cart, action.id)
            }

        case actionTypes.DECREASE_NUMBER_OF_ITEM_IN_CART:
            patchCartToExternal(decreaseNumberOfItemHandler(state.cart, action.id));

            return {
                ...state,
                cart: decreaseNumberOfItemHandler(state.cart, action.id)
            }

        case actionTypes.EMPTY_CART:
            patchCartToExternal(emptyCartHandler(state.cart));

            return {
                ...state,
                cart: emptyCartHandler(state.cart),
                totalCartPrice: totalCartPriceUpdateHandler(state.cart)
            }
        
        // GET CART FROM DATABASE AND PASTE TO REDUX STATE
        case actionTypes.GET_CART_SUCCESS:
            return {
                cart: action.cart,
                totalCartPrice: action.totalCartPrice,
                error: null
            }

        case actionTypes.GET_CART_FAIL:
            return {
                ...state,
                error: action.error
            } 

        case actionTypes.COMBINE_LOCAL_STORE_CART_TO_DB_CART_SUCCESS:
            return {
                ...state,
                cart: action.combinedCart,
                totalCartPrice: action.totalCartPrice
            }

        case actionTypes.DELETE_CART_START: 
            return updateObject(state, {
                error: null
            })

        case actionTypes.DELETE_CART_SUCCESS: 
            return updateObject(state, {
                error: null
            })

        case actionTypes.DELETE_CART_FAIL: 
            return updateObject(state, {
                error: action.error
            })
    }
    return state;
}

export default reducer;