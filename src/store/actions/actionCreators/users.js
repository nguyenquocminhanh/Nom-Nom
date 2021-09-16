import * as actionTypes from '../actionTypes';
import axios from '../../../axios/axios-orders';

// CREATE USER
export const createUser = (firstName, lastName, gender, email, userId) => {
    // object to post to firebase
    const user = {
        about: {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            dob: ''
        },
        address: {
            street: '',
            apt: '',
            city: '',
            state: '',
            zipcode: ''
        },
        contact: {
            email: email,
            phone: ''
        },
        userId: userId 
    }

    axios.post('/users.json', user)
                .then(response => {
                    console.log('CREATE USER SUCCESS!! \n' + response)
                })
                .catch(err => {
                    console.log(err)
                });

    return {
        type: actionTypes.CREATE_USER,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        email: email,
        userId: userId
    }
}

// GET USER PROFILE
export const getUserProfileStart = () => {
    return {
        type: actionTypes.GET_USER_PROFILE_START,
    }
}

// mỗi lần f5 sẽ getUserProfile từ Database xuống Global Store 
// giúp cho Global store ko bị mất mỗi khi refresh page
export const getUserProfileSuccess = (firstName, lastName, gender, dob, street, apt, city, state, zipcode, email, phone) => {
    return {
        type: actionTypes.GET_USER_PROFILE_SUCCESS,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        dob: dob,

        street: street,
        apt: apt,
        city: city,
        state: state,
        zipcode: zipcode,

        email: email,
        phone: phone
    }
}

export const getUserProfileFail = (err) => {
    return {
        type: actionTypes.GET_USER_PROFILE_FAIL,
        error: err
    }
}
export const getUserProfile = () => {
    return dispatch => {
        dispatch(getUserProfileStart());

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo=' + '"' + userId + '"';
        axios.get('/users.json' + queryParams)
            .then(response => {
                dispatch(getUserProfileSuccess(
                    Object.values(response.data)[0].about.firstName,
                    Object.values(response.data)[0].about.lastName,
                    Object.values(response.data)[0].about.gender,
                    Object.values(response.data)[0].about.dob,

                    Object.values(response.data)[0].address.street,
                    Object.values(response.data)[0].address.apt,
                    Object.values(response.data)[0].address.city,
                    Object.values(response.data)[0].address.state,
                    Object.values(response.data)[0].address.zipcode,

                    Object.values(response.data)[0].contact.email,
                    Object.values(response.data)[0].contact.phone,
                ))
                console.log(response);
            })
            .catch(err => {
                dispatch(getUserProfileFail(err))
                console.log(err.data)
            })
    } 
}

// CLEAN USER PROFILE
export const cleanUserProfile = () => {
    return {
        type: actionTypes.CLEAN_USER_PROFILE
    }
}

// EDIT DETAILS USER after logout
export const editDetailsUserStart = () => {
    return {
        type: actionTypes.EDIT_DETAILS_USER_START
    }
}

export const editDetailsUserSuccess = (firstName, lastName, gender, dob) => {
    return {
        type: actionTypes.EDIT_DETAILS_USER_SUCCESS,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        dob: dob
    }
}

export const editDetailsUserFail = () => {
    return {
        type: actionTypes.EDIT_DETAILS_USER_FAIL
    }
}

export const editDetailsUser = (firstName, lastName, dob, gender) => {
    return dispatch => {
        dispatch(editDetailsUserStart());

        const queryParams = '?auth=' + localStorage.getItem('token') + '&orderBy="userId"&equalTo=' + '"' + localStorage.getItem('userId') + '"';
        const detailsForm = {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            dob: dob
        }

        // get Unique key from firepase then edit the content
        axios.get('/users.json' + queryParams)
            .then(response => {
                const uniqueKey = Object.keys(response.data)[0];
                console.log(response);
                axios.patch('/users/' + uniqueKey + '/about.json', detailsForm)
                    .then(response => {
                        console.log(response);
                        dispatch(editDetailsUserSuccess(firstName, lastName, gender, dob))
                    })
                    .catch(err => {
                        console.log(err);
                        dispatch(editDetailsUserFail(err))
                    })
            })
            .catch(error => {
                console.log(error);
                dispatch(editDetailsUserFail(error))
            })
    }
}

// EDIT ADDRESS USER
export const editAddressUserStart = () => {
    return {
        type: actionTypes.EDIT_ADDRESS_USER_START
    }
}

export const editAddressUserSuccess = (street, apt, city, state, zipcode) => {
    return {
        type: actionTypes.EDIT_ADDRESS_USER_SUCCESS,
        street: street,
        apt: apt,
        city: city,
        state: state,
        zipcode: zipcode
    }
}

export const editAddressUserFail = () => {
    return {
        type: actionTypes.EDIT_ADDRESS_USER_FAIL
    }
}

export const editAddressUser = (street, apt, city, state, zipcode) => {
    return dispatch => {
        dispatch(editAddressUserStart());

        const queryParams = '?auth=' + localStorage.getItem('token') + '&orderBy="userId"&equalTo=' + '"' + localStorage.getItem('userId') + '"';
        const AddressForm = {
            street: street,
            apt: apt,
            city: city,
            state: state,
            zipcode: zipcode
        }

        // get Unique key from firepase then edit the content
        axios.get('/users.json' + queryParams)
            .then(response => {
                const uniqueKey = Object.keys(response.data)[0];
                console.log(response);
                // EDIT user's address in DB
                axios.patch('/users/' + uniqueKey + '/address.json', AddressForm)
                    .then(response => {
                        console.log(response);
                        dispatch(editAddressUserSuccess(street, apt, city, state, zipcode))
                    })
                    .catch(err => {
                        console.log(err);
                        dispatch(editAddressUserFail(err))
                    })
            })
            .catch(error => {
                console.log(error);
                dispatch(editAddressUserFail(error))
            })
    }
}

// EDIT CONTACT USER
export const editContactUserStart = () => {
    return {
        type: actionTypes.EDIT_CONTACT_USER_START
    }
}

export const editContactUserSuccess = (email, phone) => {
    return {
        type: actionTypes.EDIT_CONTACT_USER_SUCCESS,
        email: email,
        phone: phone
    }
}

export const editContactUserFail = () => {
    return {
        type: actionTypes.EDIT_CONTACT_USER_FAIL
    }
}

export const editContactUser = (email, phone) => {
    return dispatch => {
        dispatch(editContactUserStart());

        const queryParams = '?auth=' + localStorage.getItem('token') + '&orderBy="userId"&equalTo=' + '"' + localStorage.getItem('userId') + '"';
        const ContactForm = {
            email: email,
            phone: phone
        }

        // get Unique key from firepase then edit the content
        axios.get('/users.json' + queryParams)
            .then(response => {
                const uniqueKey = Object.keys(response.data)[0];
                console.log(response);
                // EDIT user's contact in DB
                axios.patch('/users/' + uniqueKey + '/contact.json', ContactForm)
                    .then(response => {
                        console.log(response);
                        dispatch(editContactUserSuccess(email, phone))
                    })
                    .catch(err => {
                        console.log(err);
                        dispatch(editContactUserFail(err))
                    })
            })
            .catch(error => {
                console.log(error);
                dispatch(editContactUserFail(error))
            })
    }
}


// DELETE USER

export const deleteUserStart = () => {
    return {
        type: actionTypes.DELETE_USER_START
    }
}

export const deleteUserSuccess = () => {
    return {
        type: actionTypes.DELETE_USER_SUCCESS
    }
}

export const deleteUserFail = () => {
    return {
        type: actionTypes.EDIT_DETAILS_USER_FAIL
    }
}

export const deleteUser = () => {
    const queryParams = '?auth=' + localStorage.getItem('token') + '&orderBy="userId"&equalTo=' + '"' + localStorage.getItem('userId') + '"';
    return dispatch => {
        dispatch(deleteUserStart());
        
        axios.get('/users.json' + queryParams)
            .then(response => {
                const uniqueKey = Object.keys(response.data)[0];
                axios.delete('/users/' + uniqueKey + '.json')
                    .then(response => {
                        dispatch(deleteUserSuccess());
                        console.log(response)
                    })
                    .catch(err => {
                        dispatch(deleteUserFail());
                        // null
                        console.log(err.data)
                    })
                
            }) 
            .catch(err => {
                dispatch(deleteUserFail());
                console.log(err.data)
            })
    }
}