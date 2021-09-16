// Utility
import {updateObject} from '../../shared/utility';
import * as img from '../../assets/Images/index';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    dishes: [
        {
            id: 0,
            label: 'Bún Bò Huế',
            type: 'main',
            price: 12.00,
            // img.dish is source of picture
            image: img.bunbohue,
            stars: 5,
            isLoved: false
        },
        {   
            id: 1,
            label: 'Phở Bò',
            type: 'main',
            price: 12.00,
            image: img.pho,
            stars: 4,
            isLoved: false
        },
        {   
            id: 2,
            label: 'Bún Mắm',
            type: 'main',
            price: 12.00,
            image: img.bunmam,
            stars: 4.5,
            isLoved: false
        },
        {
            id: 3,
            label: 'Cơm Tấm',
            type: 'main',
            price: 12.00,
            image: img.comtam,
            stars: 5,
            isLoved: false
        },
        {
            id: 4,
            label: 'Bánh Bao',
            type: 'dessert',
            price: 5.00,
            image: img.banhbao,
            stars: 4,
            isLoved: false
        },
        {
            id: 5,
            label: 'Bánh Giò',
            type: 'dessert',
            price: 5.00,
            image: img.banhgio,
            stars: 5,
            isLoved: false
        },
        {
            id: 6,
            label: 'Bánh Khoai Mì',
            type: 'dessert',
            price: 25.00,
            image: img.banhkhoaimi,
            stars: 4.5,
            isLoved: false
        },
        {
            id: 7,
            label: 'Bánh Da Lợn', 
            type: 'dessert',
            price: 20.00,
            image: img.banhdalon,
            stars: 5,
            isLoved: false
        },
        {   
            id: 8,
            label: 'Bánh Bò',
            type: 'dessert',
            price: 20.00,
            image: img.banhbo,
            stars: 5,
            isLoved: false
        },
        {   
            id: 9,
            label: 'Chả Giò',
            type: 'main',
            price: 1.00,
            image: img.chagio,
            stars: 5,
            isLoved: false
        },
        {
            id: 10,
            label: 'Rau Câu',
            type: 'dessert',
            price: 20.00,
            image: img.raucau,
            stars: 4.5,
            isLoved: false
        },
        {
            id: 11,
            label: 'Bánh Bột Lọc',
            type: 'main',
            price: 1.50,
            image: img.banhbotloc,
            stars: 4.5,
            isLoved: false
        }
    ],
    isPicking: false,
    pickedDishId: null,
}

/* Tìm trong array dishes, element nào có id trùng với
id của item được love thì cập nhật trạng thái isLoved của
item đó rồi trả về immutable array và immutable state */  
const updateLoveDishes = (dishes, id) => {
    // update object in array immutably
    let updatedDishes = dishes.map(dish => {
        if(dish.id === id) {
            // Chỉnh status isLoved của dish đó immutably
            return Object.assign({}, dish, {isLoved: !dish.isLoved})
        }
        return dish;
    })

    return updatedDishes;
}

// update List of Dishes (which items is loved) after refreshing the page
// return an updated dishes
const updateDishes = (dishes, lovedItems) => {
    return dishes.map(dish => {
        lovedItems.forEach(lovedItemId => {
            if (dish.id === lovedItemId) {
                dish = {
                    ...dish,
                    isLoved: true
                }
            } 
        })
        return dish;
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_LOVED_ITEM:            
            // ## updated localStorage
            let lovedItemsArray = [];

            if (!localStorage.getItem('lovedItems')) {
                localStorage.setItem('lovedItems', JSON.stringify([]))
            }   
            else {
                lovedItemsArray = [...JSON.parse(localStorage.getItem('lovedItems'))]
            };

            let arr = lovedItemsArray.filter(lovedArrayId => lovedArrayId === action.id)

            if (arr.length > 0) {
                lovedItemsArray.forEach((lovedItemId, index) => {
                    if (lovedItemId === action.id) {
                        lovedItemsArray.splice(index, 1);
                    }
                })
            }
            else {
                lovedItemsArray.push(action.id);
            }
            localStorage.setItem('lovedItems', JSON.stringify(lovedItemsArray));
            // #### updated localStorage

            // update global Redux state
            return {
                ...state,
                dishes: updateLoveDishes(state.dishes, action.id)
            }

        case actionTypes.GET_LOVED_ITEMS_SUCCESS:    
            return {
                ...state,
                dishes: updateDishes(state.dishes, action.lovedItems)
            }

        case actionTypes.GET_LOVED_ITEMS_FAIL:    
            return state;
    }
    
    return state;
}




export default reducer;