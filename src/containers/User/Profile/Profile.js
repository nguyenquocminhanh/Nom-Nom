import React, {Component} from 'react';
import axios from '../../../axios/axios-orders';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';

import classes from './Profile.css';

import Spinner from '../../../components/UI/Spinner/Spinner';
import EditedDeatil from '../../../components/UI/EditedDetail/EditedDetail';
import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';

import {checkValidity, changeDateFormat} from '../../../shared/utility';

import {BiFemaleSign, BiMaleSign} from 'react-icons/bi';
import {GoLocation} from 'react-icons/go'

class Profile extends Component {
    state = {
        isAboutClicked: true,
        isAddressClicked: false,
        isContactClicked: false,

        controls: {
            // About
            firstName: {
                type: 'First Name',
                value: '',
                validation: {
                    required: true,
                    letterAndSpaceOnly: true
                },
                valid: false,
                touched: false
            },
            lastName: {
                type: 'Last Name',
                value: '',
                validation: {
                    required: true,
                    letterAndSpaceOnly: true
                },
                valid: false,
                touched: false
            },
            gender : {
                type: 'Gender',
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            dob: {
                type: 'DOB',
                value: '',
                validation: {
                    required: false,
                    validDate: true
                },
                valid: false,
                touched: false
            },

            // Contact
            email: {
                type: 'E-Mail',
                value: '',
                validation: {
                    required: false,
                    validEmail: true
                },
                valid: false,
                touched: false
            },
            phone: {
                type: 'Number',
                value: '',
                validation: {
                    required: false,
                    validPhoneNumber: true
                },
                valid: false,
                touched: false,
            },

            // Address
            street: {
                type: 'Street',
                value: '',
                validation: {
                    required: false,
                    letterAndSpaceOnly: true
                },
                valid: false,
                touched: false,
            },
            apt: {
                type: 'Apartment',
                value: '',
                validation: {
                    required: false,
                },
                valid: false,
                touched: false,
            },
            city: {
                type: 'City',
                value: '',
                validation: {
                    required: false,
                    letterAndSpaceOnly: true
                },
                valid: false,
                touched: false,
            },
            state: {
                type: 'State',
                value: '',
                validation: {
                    required: false,
                    letterAndSpaceOnly: true,
                },
                valid: false,
                touched: false,
            }, 
            zipcode : {
                type: 'Zip Code',
                value: '',
                validation: {
                    required: false,
                    minLength: 5,
                    numberOnly: true,
                },
                valid: false,
                touched: false,
            },
        },

        isDetailChanged: false,
        isModalShown: false,
        isSubmit: false,
        editingInputName: 'gender'
    }

    // Check invalid and feedback to input
    invalidFeedBack = (valid, touched) => {
        let inputClasses = [classes.Inputtext];
        if (!valid && touched) {
            inputClasses.push(classes.Invalid);
        }
        return inputClasses.join(' ')
    }

    errorMessageHandler = (valid, touched, type) => {
        if (!valid && touched) {
            return <p className={classes.ErrorMessage}>Please enter a valid {type}!</p>
        }
        return null;
    }

    // When user type
    inputChangedHandler = (event, controlName) => {
        // value of each state field will be changed when user input
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls, isDetailChanged: true, editingInputName: controlName})
    }

    submitEditDetailsHandler = (firstName, lastName, dob, gender) => {
        (async () => {
            await this.props.onEditDetailsUser(firstName, lastName, dob, gender);
            this.setState({
                isDetailChanged: false,
            })
        })();
    }

    submitEditAddressHandler = (street, apt, city, state, zipcode) => {
        (async() => {
            await this.props.onEditAddressUser(street, apt, city, state, zipcode);
            this.setState({
                isDetailChanged: false,
            })
        })()
    }

    submitEditContactHandler = (email, phone) => {
        (async() => {
            await this.props.onEditContactUser(email, phone);
            this.setState({
                isDetailChanged: false
            })
        })()
    }

    checkInputChanged = () => {
        if (this.state.controls.firstName.value !== this.props.firstName || this.state.controls.lastName.value !== this.props.lastName || this.state.controls.gender.value !== this.props.gender || this.state.controls.dob.value !== this.props.dob || this.state.controls.street.value !== this.props.street || this.state.controls.apt.value !== this.props.apt || this.state.controls.city.value !== this.props.city || this.state.controls.state.value !== this.props.state || this.state.controls.zipcode.value !== this.props.zipcode || this.state.controls.email.value !== this.props.email || this.state.controls.phone.value !== this.props.phone) {
            return true;
        }

        return false;
    }

    addressClickedHandler = () => {
        if (this.state.isAboutClicked) {
            // Correct Details
            if (this.state.controls.firstName.valid && this.state.controls.lastName.valid && this.state.controls.gender.valid && this.state.isDetailChanged && (this.props.firstName !== this.state.controls.firstName.value || this.props.lastName !== this.state.controls.lastName.value || this.props.dob !== this.state.controls.dob.value || this.props.gender !== this.state.controls.gender.value)) {
                this.setState({
                    isModalShown: true
                })
            }
            // Incorrect Details
            else {
                const updatedControls = {
                    ...this.state.controls,
                    firstName: {
                        ...this.state.controls.firstName,
                        value: this.props.firstName,
                        valid: checkValidity(this.props.firstName, this.state.controls.firstName.validation),
                        touched: this.state.controls.firstName.touched
                    },
                    lastName: {
                        ...this.state.controls.lastName,
                        value: this.props.lastName,
                        valid: checkValidity(this.props.lastName, this.state.controls.lastName.validation),
                        touched: this.state.controls.lastName.touched
                    },
                    dob: {
                        ...this.state.controls.dob,
                        value: this.props.dob !== '' ? this.props.dob : '',
                        valid: this.props.dob !== '' ? checkValidity(this.props.dob, this.state.controls.dob.validation) : true,
                        touched: this.state.controls.dob.touched
                    },
                    gender: {
                        ...this.state.controls.gender,
                        value: this.props.gender !== '' ? this.props.gender : '',
                        valid: true,
                        // valid: checkValidity(this.props.dob !== '' ? this.props.dob : 'Not Available', this.state.controls.dob.validation),
                        touched: this.state.controls.gender.touched
                    },
                }
                this.setState({
                    isAddressClicked: true,
                    isAboutClicked: false,
                    isDetailChanged: false,
                    controls: updatedControls,
                    isSubmit: false
                })
            }
        }

        if (this.state.isAddressClicked) {
            return
        }

        if (this.state.isContactClicked) {
            if (this.state.controls.email.valid && this.state.controls.phone.valid && this.state.isDetailChanged && (this.props.email !== this.state.controls.email.value || this.props.phone !== this.state.controls.phone.value)) {
                this.setState({
                    isModalShown: true
                })
            }
            else {
                const updatedControls = {
                    ...this.state.controls,
                    email: {
                        ...this.state.controls.email,
                        value: this.props.email,
                        valid: checkValidity(this.props.email, this.state.controls.email.validation),
                        touched: this.state.controls.email.touched
                    },
                    phone: {
                        ...this.state.controls.phone,
                        value: this.props.phone !== '' ? this.props.phone : '',
                        valid: this.props.phone !== '' ? checkValidity(this.props.phone, this.state.controls.phone.validation) : true,
                        touched: this.state.controls.phone.touched,
                    },
                }

                this.setState({
                    isAddressClicked: true,
                    isContactClicked: false,
                    isDetailChanged: false,
                    controls: updatedControls,
                    isSubmit: false
                })
            }
        }
    }

    contactClickedHandler = () => {
        if (this.state.isAboutClicked) {
            if (this.state.controls.firstName.valid && this.state.controls.lastName.valid && this.state.controls.gender.valid && this.state.isDetailChanged && (this.props.firstName !== this.state.controls.firstName.value || this.props.lastName !== this.state.controls.lastName.value || this.props.dob !== this.state.controls.dob.value || this.props.gender !== this.state.controls.gender.value)) {
                this.setState({
                    isModalShown: true
                })
            }
            else {
                const updatedControls = {
                    ...this.state.controls,
                    firstName: {
                        ...this.state.controls.firstName,
                        value: this.props.firstName,
                        valid: checkValidity(this.props.firstName, this.state.controls.firstName.validation),
                        touched: this.state.controls.firstName.touched
                    },
                    lastName: {
                        ...this.state.controls.lastName,
                        value: this.props.lastName,
                        valid: checkValidity(this.props.lastName, this.state.controls.lastName.validation),
                        touched: this.state.controls.lastName.touched
                    },
                    dob: {
                        ...this.state.controls.dob,
                        value: this.props.dob !== '' ? this.props.dob : '',
                        valid: this.props.dob !== '' ? checkValidity(this.props.dob, this.state.controls.dob.validation) : true,
                        touched: this.state.controls.dob.touched
                    },
                    gender: {
                        ...this.state.controls.gender,
                        value: this.props.gender !== '' ? this.props.gender : '',
                        valid: true,
                        // valid: checkValidity(this.props.dob !== '' ? this.props.dob : 'Not Available', this.state.controls.dob.validation),
                        touched: this.state.controls.gender.touched
                    },
                }

                this.setState({
                    controls: updatedControls,
                    isAboutClicked: false,
                    isContactClicked: true,
                    isDetailChanged: false,
                    isSubmit: false
                })
            }
        }

        if (this.state.isContactClicked) {
            return
        }

        if (this.state.isAddressClicked) {
            if (this.state.controls.street.valid && this.state.controls.city.valid && this.state.controls.state.valid && this.state.controls.zipcode.valid && this.state.isDetailChanged && (this.props.street !== this.state.controls.street.value || this.props.apt !== this.state.controls.apt.value || this.props.city !== this.state.controls.city.value || this.props.state !== this.state.controls.state.value || this.props.zipcode !== this.state.controls.zipcode.value)) {
                this.setState({
                    isModalShown: true
                })
            }
            else {
                const updatedControls = {
                    ...this.state.controls,
                    street: {
                        ...this.state.controls.street,
                        value: this.props.street !== '' ? this.props.street : '',
                        valid: this.props.street !== '' ? checkValidity(this.props.street, this.state.controls.street.validation) : true,
                        touched: this.state.controls.street.touched
                    },
                    apt: {
                        ...this.state.controls.apt,
                        value: this.props.apt !== '' ? this.props.apt : '',
                        valid: this.props.apt !== '' ? checkValidity(this.props.apt, this.state.controls.apt.validation) : true,
                        touched: this.state.controls.apt.touched
                    },
                    city: {
                        ...this.state.controls.city,
                        value: this.props.city !== '' ? this.props.city : '',
                        valid: this.props.city !== '' ? checkValidity(this.props.city, this.state.controls.city.validation) : true,
                        touched: this.state.controls.city.touched
                    },
                    state: {
                        ...this.state.controls.state,
                        value: this.props.state !== '' ? this.props.state : '',
                        valid: this.props.state !== '' ? checkValidity(this.props.state, this.state.controls.state.validation) : true,
                        touched: this.state.controls.state.touched
                    },
                    zipcode: {
                        ...this.state.controls.zipcode,
                        value: this.props.zipcode !== '' ? this.props.zipcode : '',
                        valid: this.props.zipcode !== '' ? checkValidity(this.props.zipcode, this.state.controls.zipcode.validation) : true,
                        touched: this.state.controls.zipcode.touched
                    }
                }

                this.setState({
                    isContactClicked: true,
                    isAddressClicked: false,
                    isDetailChanged: false,
                    controls: updatedControls,
                    isSubmit: false
                })
            }
        }
    }

    aboutClickedHandler = () => {
        if (this.state.isAboutClicked) {
            return
        }

        if (this.state.isContactClicked) {
            if (this.state.controls.email.valid && this.state.controls.phone.valid && this.state.isDetailChanged && (this.props.email !== this.state.controls.email.value || this.props.phone !== this.state.controls.phone.value)) {
                this.setState({
                    isModalShown: true
                })
            }
            else {
                const updatedControls = {
                    ...this.state.controls,
                    email: {
                        ...this.state.controls.email,
                        value: this.props.email,
                        valid: checkValidity(this.props.email, this.state.controls.email.validation),
                        touched: this.state.controls.email.touched
                    },
                    phone: {
                        ...this.state.controls.phone,
                        value: this.props.phone !== '' ? this.props.phone : '',
                        valid: this.props.phone !== '' ? checkValidity(this.props.phone, this.state.controls.phone.validation) : true,
                        touched: this.state.controls.phone.touched,
                    },
                }

                this.setState({
                    isAboutClicked: true,
                    isContactClicked: false,
                    isDetailChanged: false,
                    isSubmit: false,
                    controls: updatedControls
                })
            }
        }

        if (this.state.isAddressClicked) {
            if (this.state.controls.street.valid && this.state.controls.city.valid && this.state.controls.state.valid && this.state.controls.zipcode.valid && this.state.isDetailChanged  && (this.props.street !== this.state.controls.street.value || this.props.apt !== this.state.controls.apt.value || this.props.city !== this.state.controls.city.value || this.props.state !== this.state.controls.state.value || this.props.zipcode !== this.state.controls.zipcode.value)) {
                this.setState({
                    isModalShown: true
                })
            }
            else {
                const updatedControls = {
                    ...this.state.controls,
                    street: {
                        ...this.state.controls.street,
                        value: this.props.street !== '' ? this.props.street : '',
                        valid: this.props.street !== '' ? checkValidity(this.props.street, this.state.controls.street.validation) : true,
                        touched: this.state.controls.street.touched
                    },
                    apt: {
                        ...this.state.controls.apt,
                        value: this.props.apt !== '' ? this.props.apt : '',
                        valid: this.props.apt !== '' ? checkValidity(this.props.apt, this.state.controls.apt.validation) : true,
                        touched: this.state.controls.apt.touched
                    },
                    city: {
                        ...this.state.controls.city,
                        value: this.props.city !== '' ? this.props.city : '',
                        valid: this.props.city !== '' ? checkValidity(this.props.city, this.state.controls.city.validation) : true,
                        touched: this.state.controls.city.touched
                    },
                    state: {
                        ...this.state.controls.state,
                        value: this.props.state !== '' ? this.props.state : '',
                        valid: this.props.state !== '' ? checkValidity(this.props.state, this.state.controls.state.validation) : true,
                        touched: this.state.controls.state.touched
                    },
                    zipcode: {
                        ...this.state.controls.zipcode,
                        value: this.props.zipcode !== '' ? this.props.zipcode : '',
                        valid: this.props.zipcode !== '' ? checkValidity(this.props.zipcode, this.state.controls.zipcode.validation) : true,
                        touched: this.state.controls.zipcode.touched
                    }
                }

                
                this.setState({
                    isAboutClicked: true,
                    isAddressClicked: false,
                    isDetailChanged: false,
                    controls: updatedControls,
                    isSubmit: false
                })
            }
        }
    }

    onRadioChangeValueHandler = (event) => {
        const updatedControls = {
            ...this.state.controls,
            gender: {
                ...this.state.controls.gender,
                value: event.target.value,
                touched: this.state.controls.gender.touched
            }
        }
        
        this.setState({controls: updatedControls, isDetailChanged: true})
    } 

    declineSaveChangesHandler = () => {
        const updatedControls = {
            ...this.state.controls,
            firstName: {
                ...this.state.controls.firstName,
                value: this.props.firstName,
                valid: checkValidity(this.props.firstName, this.state.controls.firstName.validation),
                touched: false
            },
            lastName: {
                ...this.state.controls.lastName,
                value: this.props.lastName,
                valid: checkValidity(this.props.lastName, this.state.controls.lastName.validation),
                touched: false
            },
            dob: {
                ...this.state.controls.dob,
                value: this.props.dob !== '' ? this.props.dob : '',
                valid: this.props.dob !== '' ? checkValidity(this.props.dob, this.state.controls.dob.validation) : true,
                touched: false
            },
            gender: {
                ...this.state.controls.gender,
                value: this.props.gender !== '' ? this.props.gender : '',
                valid: true,
                // valid: checkValidity(this.props.dob !== '' ? this.props.dob : 'Not Available', this.state.controls.dob.validation),
                touched: false
            },

            email: {
                ...this.state.controls.email,
                value: this.props.email,
                valid: checkValidity(this.props.email, this.state.controls.email.validation),
                touched: false
            },
            phone: {
                ...this.state.controls.phone,
                value: this.props.phone !== '' ? this.props.phone : '',
                valid: this.props.phone !== '' ? checkValidity(this.props.phone, this.state.controls.phone.validation) : true,
                touched: false
            },

            street: {
                ...this.state.controls.street,
                value: this.props.street !== '' ? this.props.street : '',
                valid: this.props.street !== '' ? checkValidity(this.props.street, this.state.controls.street.validation) : true,
                touched: false
            },
            apt: {
                ...this.state.controls.apt,
                value: this.props.apt !== '' ? this.props.apt : '',
                valid: this.props.apt !== '' ? checkValidity(this.props.apt, this.state.controls.apt.validation) : true,
                touched: false
            },
            city: {
                ...this.state.controls.city,
                value: this.props.city !== '' ? this.props.city : '',
                valid: this.props.city !== '' ? checkValidity(this.props.city, this.state.controls.city.validation) : true,
                touched: false
            },
            state: {
                ...this.state.controls.state,
                value: this.props.state !== '' ? this.props.state : '',
                valid: this.props.state !== '' ? checkValidity(this.props.state, this.state.controls.state.validation) : true,
                touched: false
            },
            zipcode: {
                ...this.state.controls.zipcode,
                value: this.props.zipcode !== '' ? this.props.zipcode : '',
                valid: this.props.zipcode !== '' ? checkValidity(this.props.zipcode, this.state.controls.zipcode.validation) : true,
                touched: false
            }
        }
        this.setState({controls: updatedControls, isModalShown: false, isDetailChanged: false});
    }

    acceptSaveChangesHandler = () => {
        if (this.state.isAboutClicked) {
            this.submitEditDetailsHandler(this.state.controls.firstName.value, this.state.controls.lastName.value, this.state.controls.dob.value, this.state.controls.gender.value);
        }

        if (this.state.isAddressClicked) {
            this.submitEditAddressHandler(this.state.controls.street.value, this.state.controls.apt.value, this.state.controls.city.value, this.state.controls.state.value, this.state.controls.zipcode.value);
        }

        if (this.state.isContactClicked) {
            this.submitEditContactHandler(this.state.controls.email.value, this.state.controls.phone.value);
        }

        this.setState({
            isDetailChanged: false,
            isModalShown: false,
            isSubmit: true,
        })
    }

    closeModalHandler = () => {
        this.setState({
            isModalShown: false
        })
    }

    // Get User Info in Redux store when componentDidMount
    componentDidMount = () => {
       this.props.onGetUserProfile();
    }

    
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.isDetailsLoading !== prevProps.isDetailsLoading && this.props.isDetailsLoading === true) {
        this.setState({
            isSubmit: false
        })
    }

    if (this.props.isDetailsLoading !== prevProps.isDetailsLoading && this.props.isDetailsLoading === false) {
        this.setState({
            isSubmit: true
        })
    }

    if (this.props.isAddressLoading !== prevProps.isAddressLoading && this.props.isAddressLoading === true) {
        this.setState({
            isSubmit: false
        })
    }

    if (this.props.isAddressLoading !== prevProps.isAddressLoading && this.props.isAddressLoading === false) {
        this.setState({
            isSubmit: true
        })
    }

    if (this.props.isContactLoading !== prevProps.isContactLoading && this.props.isContactLoading === true) {
        this.setState({
            isSubmit: false
        })
    }

    if (this.props.isContactLoading !== prevProps.isContactLoading && this.props.isContactLoading === false) {
        this.setState({
            isSubmit: true
        })
    }

    if (this.state.isDetailChanged !== prevState.isDetailChanged && this.state.isDetailChanged === true) {
        this.setState({
            isSubmit: false
        })
    }

    if ((this.props.firstName !== prevProps.firstName && this.props.firstName !== '') || (this.props.isLoading !== prevProps.isLoading && this.props.isLoading === false)) {
        const updatedControls = {
            ...this.state.controls,
            firstName: {
                ...this.state.controls.firstName,
                value: this.props.firstName,
                valid: checkValidity(this.props.firstName, this.state.controls.firstName.validation),
                touched: this.state.controls.firstName.touched
            },
            lastName: {
                ...this.state.controls.lastName,
                value: this.props.lastName,
                valid: checkValidity(this.props.lastName, this.state.controls.lastName.validation),
                touched: this.state.controls.lastName.touched
            },
            dob: {
                ...this.state.controls.dob,
                value: this.props.dob !== '' ? this.props.dob : '',
                valid: this.props.dob !== '' ? checkValidity(this.props.dob, this.state.controls.dob.validation) : true,
                touched: this.state.controls.dob.touched
            },
            gender: {
                ...this.state.controls.gender,
                value: this.props.gender !== '' ? this.props.gender : '',
                valid: true,
                // valid: checkValidity(this.props.dob !== '' ? this.props.dob : 'Not Available', this.state.controls.dob.validation),
                touched: this.state.controls.gender.touched
            },

            email: {
                ...this.state.controls.email,
                value: this.props.email,
                valid: checkValidity(this.props.email, this.state.controls.email.validation),
                touched: this.state.controls.email.touched
            },
            phone: {
                ...this.state.controls.phone,
                value: this.props.phone !== '' ? this.props.phone : '',
                valid: this.props.phone !== '' ? checkValidity(this.props.phone, this.state.controls.phone.validation) : true,
                touched: this.state.controls.phone.touched,
            },

            street: {
                ...this.state.controls.street,
                value: this.props.street !== '' ? this.props.street : '',
                valid: this.props.street !== '' ? checkValidity(this.props.street, this.state.controls.street.validation) : true,
                touched: this.state.controls.street.touched
            },
            apt: {
                ...this.state.controls.apt,
                value: this.props.apt !== '' ? this.props.apt : '',
                valid: this.props.apt !== '' ? checkValidity(this.props.apt, this.state.controls.apt.validation) : true,
                touched: this.state.controls.apt.touched
            },
            city: {
                ...this.state.controls.city,
                value: this.props.city !== '' ? this.props.city : '',
                valid: this.props.city !== '' ? checkValidity(this.props.city, this.state.controls.city.validation) : true,
                touched: this.state.controls.city.touched
            },
            state: {
                ...this.state.controls.state,
                value: this.props.state !== '' ? this.props.state : '',
                valid: this.props.state !== '' ? checkValidity(this.props.state, this.state.controls.state.validation) : true,
                touched: this.state.controls.state.touched
            },
            zipcode: {
                ...this.state.controls.zipcode,
                value: this.props.zipcode !== '' ? this.props.zipcode : '',
                valid: this.props.zipcode !== '' ? checkValidity(this.props.zipcode, this.state.controls.zipcode.validation) : true,
                touched: this.state.controls.zipcode.touched
            },
        }
        this.setState({controls: updatedControls})
    }}

    render() {
        let attachedAboutClasses = [classes.NavItem, ''];
        let attachedAddressClasses = [classes.NavItem, ''];
        let attachedContactClasses = [classes.NavItem, ''];

        if (this.state.isAboutClicked) {
            attachedAboutClasses = [classes.NavItem, classes.Active];
        }

        if (this.state.isAddressClicked) {
            attachedAddressClasses = [classes.NavItem, classes.Active];
        }

        if (this.state.isContactClicked) {
            attachedContactClasses = [classes.NavItem, classes.Active];
        }

        let infoContent = this.state.isAboutClicked ?
        (<div className={classes.InfoContent}>

            {/* Row 1 */}
            <div className={classes.Row}>
                <div className={classes.Col}>
                    <p className={classes.Title}>
                        First Name
                    </p>
                    <div className={classes.Input}>        
                        <EditedDeatil
                            key={'firstname'}
                            type={'text'}
                            required={false}
                            inputValueChanged={(event) => this.inputChangedHandler(event, 'firstName')}
                            value={this.state.controls['firstName'].value}
                            valid={this.state.controls.firstName.valid}
                            touched={this.state.controls.firstName.touched}
                            identifier={'first name'}
                            inputType={'input'}
                            detail={this.state.controls['firstName'].value}
                            isDetailChanged={this.state.isDetailChanged}
                            isValueChanged={this.props.firstName !== this.state.controls.firstName.value}
                            />
                    </div>
                </div>
                <div className={classes.Col}>
                    <p className={classes.Title}>
                        Last Name
                    </p>
                    <div className={classes.Input}> 
                        <EditedDeatil
                            key={'lastname'}
                            type={'text'}
                            required={false}
                            inputValueChanged={(event) => this.inputChangedHandler(event, 'lastName')}
                            value={this.state.controls['lastName'].value}
                            valid={this.state.controls.lastName.valid}
                            touched={this.state.controls.lastName.touched}
                            identifier={'last name'}
                            inputType={'input'}
                            detail={this.state.controls['lastName'].value}
                            isDetailChanged={this.state.isDetailChanged}
                            isValueChanged={this.props.lastName !== this.state.controls.lastName.value}
                            />
                    </div>
                </div>
            </div>
            {/* Row 2 */}
            <div className={classes.Row}>
                <div className={classes.Col}>
                    <p className={classes.Title}>
                         Date of Birth
                    </p>
                    <div className={classes.Input}> 
                        <EditedDeatil
                            key={'dob'}
                            type={'date'}
                            required={false}
                            inputValueChanged={(event) => this.inputChangedHandler(event, 'dob')}
                            value={this.state.controls['dob'].value === '' ? '' : this.state.controls.dob.value}
                            valid={this.state.controls.dob.valid}
                            touched={this.state.controls.dob.touched}
                            identifier={'DOB'}
                            inputType={'input'}
                            detail={this.state.controls['dob'].value !== '' ? this.state.controls['dob'].value : 'Not Available'}
                            isDetailChanged={this.state.isDetailChanged}
                            isDateType={true}
                            isValueChanged={this.props.dob !== this.state.controls.dob.value}
                            />
                    </div>
                </div>
                <div className={classes.Col}>
                    <p className={classes.Title}>
                        Gender
                    </p>

                    
                    <EditedDeatil
                        isRadio={true}
                        radioName={'gender'}
                        radioArr={['male', 'female', 'other']}
                        onRadioChangeValue={this.onRadioChangeValueHandler}
                        isCapitalize={true}
                        isChecked={this.state.controls.gender.value}
                        key={'gender'}
                        controlName={'gender'}
                        // inputValueChanged={(event) => this.inputChangedHandler(event, 'dob')}
                        valid={this.state.controls.dob.valid}
                        touched={this.state.controls.gender.touched}
                        identifier={'gender'}
                        // inputType={'input'}
                        detail={this.state.controls['gender'].value}
                        isDetailChanged={this.state.isDetailChanged}
                        isValueChanged={this.props.gender !== this.state.controls.gender.value}/>
                </div>
            </div>
            {/* Row 3 */}
            <div className={classes.Row}>
                <div className={classes.Col}>

                </div>
                <div className={classes.Col}>

                </div>
            </div>
        </div>) : this.state.isAddressClicked ? 

        (<div className={classes.InfoContent}>
   
            {/* Row 1 */}
            <div className={classes.Row}>
                <div className={classes.Col}>
                    <p className={classes.Title}>
                        Street
                    </p>
                    <div className={classes.Input}> 
                        <EditedDeatil
                            key={'street'}
                            type={'text'}
                            required={false}
                            inputValueChanged={(event) => this.inputChangedHandler(event, 'street')}
                            value={this.state.controls['street'].value === '' ? '' : this.state.controls['street'].value}
                            valid={this.state.controls.street.valid}
                            touched={this.state.controls.street.touched}
                            identifier={'street'}
                            inputType={'input'}
                            detail={this.state.controls['street'].value !== '' ? this.state.controls['street'].value : 'Not Available'}
                            isDetailChanged={this.state.isDetailChanged}
                            isValueChanged={this.props.street !== this.state.controls.street.value}
                            />
                    </div>
                </div>
                <div className={classes.Col}>
                    <p className={classes.Title}>
                        Apt/ Suite (optional)
                    </p>
                    <div className={classes.Input}> 
                        <EditedDeatil
                            key={'apt'}
                            type={'text'}
                            required={false}
                            inputValueChanged={(event) => this.inputChangedHandler(event, 'apt')}
                            value={this.state.controls['apt'].value === '' ? '' : this.state.controls['apt'].value}
                            valid={this.state.controls.apt.valid}
                            touched={this.state.controls.apt.touched}
                            identifier={'apt/ suite'}
                            inputType={'input'}
                            detail={this.state.controls['apt'].value !== '' ? this.state.controls['apt'].value : 'Not Available'}
                            isDetailChanged={this.state.isDetailChanged}
                            isValueChanged={this.props.apt !== this.state.controls.apt.value}
                            />
                    </div>
                </div>
            </div>
            {/* Row 2 */}
            <div className={classes.Row}>
                <div className={classes.Col}>
                    <p className={classes.Title}>
                        City
                    </p>
                    <div className={classes.Input}> 
                        <EditedDeatil
                            key={'city'}
                            type={'text'}
                            required={false}
                            inputValueChanged={(event) => this.inputChangedHandler(event, 'city')}
                            value={this.state.controls['city'].value === '' ? '' : this.state.controls['city'].value}
                            valid={this.state.controls.city.valid}
                            touched={this.state.controls.city.touched}
                            identifier={'city'}
                            inputType={'input'}
                            detail={this.state.controls['city'].value !== '' ? this.state.controls['city'].value : 'Not Available'}
                            isDetailChanged={this.state.isDetailChanged}
                            isValueChanged={this.props.city !== this.state.controls.city.value}
                            />
                    </div>
                </div>
                <div className={classes.Col}>
                    <p className={classes.Title}>
                        State
                    </p>
                    <div className={classes.Input}> 
                        <EditedDeatil
                            key={'state'}
                            type={'text'}
                            required={false}
                            inputValueChanged={(event) => this.inputChangedHandler(event, 'state')}
                            value={this.state.controls['state'].value === '' ? '' : this.state.controls['state'].value}
                            valid={this.state.controls.state.valid}
                            touched={this.state.controls.state.touched}
                            identifier={'state'}
                            inputType={'input'}
                            detail={this.state.controls['state'].value !== '' ? this.state.controls['state'].value : 'Not Available'}
                            isDetailChanged={this.state.isDetailChanged}
                            isValueChanged={this.props.state !== this.state.controls.state.value}
                            />
                    </div>
                </div>
            </div>
            {/* Row 3 */}
            <div className={classes.Row}>
                <div className={classes.Col}>
                    <p className={classes.Title}>
                        Zipcode
                    </p>
                    <div className={classes.Input}> 
                        <EditedDeatil
                            key={'zipcode'}
                            type={'text'}
                            required={false}
                            inputValueChanged={(event) => this.inputChangedHandler(event, 'zipcode')}
                            value={this.state.controls['zipcode'].value === '' ? '' : this.state.controls['zipcode'].value}
                            valid={this.state.controls.zipcode.valid}
                            touched={this.state.controls.zipcode.touched}
                            identifier={'zipcode'}
                            inputType={'input'}
                            detail={this.state.controls['zipcode'].value !== '' ? this.state.controls['zipcode'].value : 'Not Available'}
                            isDetailChanged={this.state.isDetailChanged}
                            isValueChanged={this.props.zipcode !== this.state.controls.zipcode.value}
                           />
                    </div>
                </div>
                <div className={classes.Col}>
                    <p className={classes.Title}>
                        Country
                    </p>
                    <p className={classes.Content}>
                        United States of America
                    </p>
                </div>
            </div>
        </div>) :
        (<div className={classes.InfoContent}>
            {/* Row 1 */}
            <div className={classes.Row}>
                <div className={classes.Col}>
                    <p className={classes.Title}>
                        Email
                    </p>
                    <div className={classes.Input}>        
                        <EditedDeatil
                            key={'email'}
                            type={'text'}
                            required={false}
                            inputValueChanged={(event) => this.inputChangedHandler(event, 'email')}
                            value={this.state.controls['email'].value}
                            valid={this.state.controls.email.valid}
                            touched={this.state.controls.email.touched}
                            identifier={'email'}
                            inputType={'input'}
                            detail={this.state.controls['email'].value}
                            isDetailChanged={this.state.isDetailChanged}
                            isValueChanged={this.props.email !== this.state.controls.email.value}/>
                    </div>
                </div>
                <div className={classes.Col}>
                    <p className={classes.Title}>
                        Phone
                    </p>
                    <div className={classes.Input}>        
                        <EditedDeatil
                            key={'phone'}
                            type={'text'}
                            required={false}
                            inputValueChanged={(event) => this.inputChangedHandler(event, 'phone')}
                            value={this.state.controls['phone'].value === '' ? '' : this.state.controls['phone'].value}
                            valid={this.state.controls.phone.valid}
                            touched={this.state.controls.phone.touched}
                            identifier={'phone'}
                            inputType={'input'}
                            detail={this.state.controls['phone'].value !== '' ? this.state.controls['phone'].value : 'Not Available'}
                            isDetailChanged={this.state.isDetailChanged}
                            isValueChanged={this.props.phone !== this.state.controls.phone.value}
                            />
                    </div>
                </div>
            </div>
            {/* Row 2 */}
            <div className={classes.Row}>
                <div className={classes.Col}>
                    <p className={classes.Title}>
                        
                    </p>
                    <p className={classes.Content}>
                        
                    </p>
                </div>
                <div className={classes.Col}>
                    <p className={classes.Title}>
                        
                    </p>
                    <p className={classes.Content}>
                           
                    </p>
                </div>
            </div>
            {/* Row 3 */}
            <div className={classes.Row}>
                <div className={classes.Col}>
                    <p className={classes.Title}>
                        
                    </p>
                    <p className={classes.Content}>
                        
                    </p>
                </div>
                <div className={classes.Col}>
                    <p className={classes.Title}>
                        
                    </p>
                    <p className={classes.Content}>
                        
                    </p>
                </div>
            </div>
        </div>);



        // Spinner
        let spinner = this.props.isLoading ? <Spinner/> : null;
        

        let modal = 
            <Modal
                show={this.state.isModalShown}
                closeButtonExist={false}
                backdropClicked={this.closeModalHandler}> 
                    <div className={classes.IsSavedConfirmation}> 
                        <p>Save changes you have made?</p>
                        <div className={classes.Buttons}>
                            <Button btnType='Danger' clicked={this.declineSaveChangesHandler}>NO</Button>
                            <Button btnType='Success' clicked={() => this.acceptSaveChangesHandler()}>YES</Button>
                        </div>
                    </div>
            </Modal>
        return (
            <div className={classes.ProfileContainer}>
                {spinner}
                {modal}
                {!this.props.isLoading ?
                <div className={classes.ProfileCard}>
                    <div className={classes.Profile}>
                        <div className={classes.CircleBorder}>
                            <div className={classes.Img}>

                            </div>
                            <div className={classes.ChangePhotoButton}>
                                Change Photo
                            </div>
                        </div>
                        <div className={classes.ProfileInfo}>
                            <p>{this.props.firstName} {this.props.lastName}</p>
                            <p className={classes.AccountHolder}>Account holder</p>
                            <p>{this.props.gender === 'male' ? <BiMaleSign className={classes.Male}/> : this.props.gender === 'female' ? <BiFemaleSign className={classes.Female}/> : null}</p>
                            <p>{this.props.dob ? changeDateFormat(this.props.dob) : null}</p>
                            <p>{this.props.city? <GoLocation className={classes.Location}/> : null} {this.props.city ? this.props.city : null} {this.props.zipcode ? this.props.zipcode : null}</p>
                        </div>
                    </div>

                    <div className={classes.Info}>
                        {/* Nav Bar */}
                        <nav className={classes.NavigationBar}>
                            <ul>
                                {/* <li onClick={() => this.setState({isAboutClicked: true, isAddressClicked: false, isContactClicked: false, isDetailChanged: false})}> */}
                                <li onClick={() => this.aboutClickedHandler()}>
                                    <a className={attachedAboutClasses.join(' ')}>
                                        About
                                    </a>
                                </li>

                                {/* <li onClick={() => this.setState({isAboutClicked: false, isAddressClicked: true, isContactClicked: false, isDetailChanged: false})}> */}
                                <li onClick={() => this.addressClickedHandler()}>
                                    <a className={attachedAddressClasses.join(' ')}>
                                        Address
                                    </a>
                                </li>

                                {/* <li onClick={() => this.setState({isAboutClicked: false, isAddressClicked: false, isContactClicked: true, isDetailChanged: false})}> */}
                                <li onClick={() => this.contactClickedHandler()}>
                                    <a className={attachedContactClasses.join(' ')}>
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        
                        {infoContent}

                        <div className={classes.SubmitButtonWrapper}>
                            {this.state.isAboutClicked ?
                                <button 
                                    className={classes.SubmitButton} 
                                    disabled={(this.state.controls.firstName.valid && this.state.controls.lastName.valid && this.state.controls.gender.valid && this.state.controls.dob.valid && this.state.isDetailChanged && this.checkInputChanged() === true) ? false : true}
                                    onClick={() => this.submitEditDetailsHandler(this.state.controls.firstName.value, this.state.controls.lastName.value, this.state.controls.dob.value, this.state.controls.gender.value)}>
                                        Save changes
                                </button> : 

                            this.state.isAddressClicked ?
                                <button 
                                    className={classes.SubmitButton} 
                                    disabled={(this.state.controls.street.valid && this.state.controls.city.valid && this.state.controls.state.valid && this.state.controls.zipcode.valid && this.state.isDetailChanged && this.checkInputChanged() === true) ? false : true}
                                    onClick={() => this.submitEditAddressHandler(this.state.controls.street.value, this.state.controls.apt.value, this.state.controls.city.value, this.state.controls.state.value, this.state.controls.zipcode.value)}>
                                        Save changes
                                </button> :

                                <button 
                                    className={classes.SubmitButton}
                                    disabled={(this.state.controls.email.valid && this.state.controls.phone.valid && this.state.isDetailChanged && this.checkInputChanged() === true) ? false : true}
                                    onClick={() => this.submitEditContactHandler(this.state.controls.email.value, this.state.controls.phone.value)}>
                                        Save changes
                                </button>}
                        </div>

                        <div className={classes.Notification}>
                            <p style={{visibility: this.state.isSubmit ? 'visible' : 'hidden'}}>You updated your profile successfully!</p>
                        </div>
                    </div>
                </div> :null}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoading: state.users.isLoading,
        isDetailsLoading: state.users.isDetailsLoading,
        isAddressLoading: state.users.isAddressLoading,
        isContactLoading: state.users.isContactLoading,

        firstName: state.users.firstName,
        lastName: state.users.lastName,
        gender: state.users.gender,
        dob: state.users.dob,

        street: state.users.street,
        apt: state.users.apt,
        city: state.users.city,
        state: state.users.state,
        zipcode: state.users.zipcode,

        email: state.users.email,
        phone: state.users.phone
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUserProfile: () => dispatch(actionCreators.getUserProfile()),
        onEditDetailsUser: (firstName, lastName, dob, gender) => dispatch(actionCreators.editDetailsUser(firstName, lastName, dob, gender)),
        onEditAddressUser: (street, apt, city, state, zipcode) => dispatch(actionCreators.editAddressUser(street, apt, city, state, zipcode)),
        onEditContactUser: (email, phone) => dispatch(actionCreators.editContactUser(email, phone))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);