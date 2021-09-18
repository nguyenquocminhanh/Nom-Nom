import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import DatePicker from "react-datepicker"
import {setMinutes, setHours, addDays, subDays} from "date-fns";

import * as actionCreators from '../../../store/actions/index';

import classes from './ShippingInfo.css';

import {FaShippingFast, FaStore} from 'react-icons/fa';
import {MdLocalShipping} from 'react-icons/md';
import {GoLocation} from 'react-icons/go'
import {GrContactInfo} from 'react-icons/gr';
import {FcIdea} from 'react-icons/fc';
import {BsClockHistory} from 'react-icons/bs'
import {valid, invalid} from '../../../assets/Images/index';

import DecoButton from '../../../components/UI/Button/DecoButton/DecoButton';
import Input from '../../../components/UI/Input/Input';
import {checkValidity, getDay, getMonth, getFullMonth, getTime} from '../../../shared/utility';
import {checked} from '../../../assets/Images/index';

class ShippingInfo extends Component {
    state = {
        // 13+
        isChecked: true,

        orderForm: {
            street: {
                type: 'Street',
                value: this.props.street,
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            apt: {
                type: 'Apartment',
                value: this.props.apt,
                validation: {
                    required: false,
                },
                valid: false,
                touched: false,
            },
            city: {
                type: 'City',
                value: this.props.city,
                validation: {
                    required: true,
                    letterAndSpaceOnly: true
                },
                valid: false,
                touched: false,
            },
            state: {
                type: 'State',
                value: this.props.state,
                validation: {
                    required: true,
                    letterOnly: true,
                    minLength: 2
                },
                valid: false,
                touched: false,
            }, 
            zipcode : {
                type: 'Zip Code',
                value: this.props.zipcode,
                validation: {
                    required: true,
                    minLength: 5,
                    numberOnly: true,
                },
                valid: false,
                touched: false,
            },
            
            firstName: {
                type: 'First Name',
                value: this.props.firstName,
                validation: {
                    required: true,
                    letterAndSpaceOnly: true
                },
                valid: false,
                touched: false,
            },
            lastName: {
                type: 'Last Name',
                value: this.props.lastName,
                validation: {
                    required: true,
                    letterAndSpaceOnly: true
                },
                valid: false,
                touched: false,
            },
            email: {
                type: 'E-Mail',
                value: '',
                validation: {
                    required: false,
                    validEmail: true
                },
                valid: false,
                touched: false,
            },
            phone: {
                type: 'Number',
                value: '',
                validation: {
                    required: true,
                    validPhoneNumber: true
                },
                valid: false,
                touched: false,
            }
        },
        isPickUp: false,
        formIsValid: false,
        time: null,
        isValidTime: null
    }

    setDateHandler = (date) => {
        // this.setState({time: date})
        // console.log((new Date()).getHours())

        // set default time to nearset day and hours in case input is cleared
        if (date === null) {
            this.setState({time: setHours(setMinutes(addDays(new Date(), new Date().getHours() > 12 ? 2 : 1), 0), 10), isValidTime: true})
        }

        else {
            if (date.getDate() === (new Date()).getDate()) {
                this.setState({time: addDays(date, new Date().getHours() > 12 ? 2 : 1), isValidTime: true})
            }

            else if (date.getHours() < 10) {
                this.setState({time: setHours(setMinutes(date, 0), 10), isValidTime: true})
            }

            else if (date.getHours() >= 20) {
                this.setState({time: setHours(setMinutes(date, 30), 19), isValidTime: true})
            }

            else {
                this.setState({time: date, isValidTime: true})
            }
        }

        console.log(this.state.time)
    }

    isSevenDayAfter = () => {
        let arr = [];
        let today = (new Date()).getHours() > 12 ? addDays(new Date(), 1) : new Date();
        for (let i = 1; i <= 7; i++) {
            arr.push(addDays(today, i));
        };
        return arr;
    }

    checkBoxClickedHandler = () => {
        this.setState(prevState => {
            return {
                ...this.state,
                isChecked: !prevState.isChecked
            }
        })
    }

    // when user input, save value into state value tương ứng of each fields immutably
    // inputIdentifier (email/ shippingAddress/ phone, firstname/ lastname)

    checkFormValid = (form) => {
        let formIsValid = true;
        if (this.state.isPickUp === false) {
            formIsValid = form.street.valid && form.city.valid && form.state.valid && form.zipcode.valid && form.firstName.valid && form.lastName.valid && form.phone.valid && this.state.isChecked  && formIsValid;
        }
        else {
            formIsValid = form.firstName.valid && form.lastName.valid && form.phone.valid && this.state.isChecked  && formIsValid;
        }

        return formIsValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // event.preventDefault();
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        this.setState({orderForm: updatedOrderForm, formIsValid: this.checkFormValid(updatedOrderForm)});
    } 

    deliverySelected = () => {
        this.props.deliverySelected();

        this.setState({
            isPickUp: false
        })
    }

    pickupSelected = () => {
        this.props.pickUpSelected();

        this.setState({
            isPickUp: true
        })
    }

    updateStateWhenMount = () => {
        this.setState({
            ...this.state,
            orderForm: {
                ...this.state.orderForm,
                street: {
                    ...this.state.orderForm.street,
                    value: this.props.street,
                    valid: this.props.street !== '' ? true : false 
                },
                apt: {
                    ...this.state.orderForm.apt,
                    value: this.props.apt,
                    valid: this.props.apt !== '' ? true : false 
                },
                city: {
                    ...this.state.orderForm.city,
                    value: this.props.city,
                    valid: this.props.city !== '' ? true : false 
                },
                state: {
                    ...this.state.orderForm.state,
                    value: this.props.state,
                    valid: this.props.state !== '' ? true : false 
                },
                zipcode: {
                    ...this.state.orderForm.zipcode,
                    value: this.props.zipcode,
                    valid: this.props.zipcode !== '' ? true : false 
                },
                firstName: {
                    ...this.state.orderForm.firstName,
                    value: this.props.firstName,
                    valid: this.props.firstName !== '' ? true : false 
                },
                lastName: {
                    ...this.state.orderForm.lastName,
                    value: this.props.lastName,
                    valid: this.props.lastName !== '' ? true : false 
                },
                email: {
                    ...this.state.orderForm.email,
                    value: this.props.email,
                    valid: this.props.email !== '' ? true : false
                }
            }
        });
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        // GetUserProfile
        if(prevProps.street !== this.props.street || prevProps.apt !== this.props.apt || prevProps.city !== this.props.city || prevProps.state !== this.props.state || prevProps.zipcode !== this.props.zipcode || prevProps.firstName !== this.props.firstName || prevProps.lastName !== this.props.lastName) {
            this.updateStateWhenMount();
        }

        // delivery method changes, check form again
        if (this.state.isPickUp !== prevState.isPickUp || this.state.isChecked !== prevState.isChecked) {
            this.setState({
                formIsValid: this.checkFormValid(this.state.orderForm)
            })
        }
    }
    
    componentDidMount = () => {
        if (localStorage.getItem('token') !== null) {
            this.props.onGetUserProfile();  
            this.updateStateWhenMount();
        }
    }

    render() {
        const shippingInfo = {
            email: this.state.orderForm.email.value,
            phone: this.state.orderForm.phone.value,
            firstName: this.state.orderForm.firstName.value,
            lastName: this.state.orderForm.lastName.value,
            shippingAddress: {
                street: this.state.orderForm.street.value,
                apt: this.state.orderForm.apt.value,
                city: this.state.orderForm.city.value,
                state: this.state.orderForm.state.value,
                zipcode: this.state.orderForm.zipcode.value
            }
        }

        let shippingAddress = 
            (<div className={classes.ShippingAddress} style={{display: this.props.isPickUp ? 'none' : 'block'}}>
                <p>&nbsp;</p>
                <h4>Shipping Address <GoLocation/></h4>

                {this.props.token !== null ? (!this.props.street ? 
                    <p className={classes.Hint}><FcIdea/> Hint: Update address in Profile to experience faster checkout</p> : null) : 
                    <p className={classes.Hint}><FcIdea/> Hint: Sign up an account to experience faster checkout</p>
                }
                <p>&nbsp;</p>
                
                <div className={classes.AddressForm}>
                    <Input
                        type={'text'}
                        required={true}
                        inputValueChanged={(e) => this.inputChangedHandler(e, 'street')}
                        value={this.state.orderForm.street.value}
                        valid={this.state.orderForm.street.valid}
                        touched={this.state.orderForm.street.touched}
                        identifier={'street'}
                        inputType={'input'}>
                            <span>Street</span>
                            <span style={{color: '#e32b2b'}}> *</span>
                    </Input>

                    <Input
                        type={'text'}
                        required={true}
                        inputValueChanged={(e) => this.inputChangedHandler(e, 'apt')}
                        value={this.state.orderForm.apt.value}
                        valid={this.state.orderForm.apt.valid}
                        touched={this.state.orderForm.apt.touched}
                        identifier={'apt'}
                        inputType={'input'}>
                            <span>Apt/ Suite (optional)</span>
                    </Input>

                    <Input
                        type={'text'}
                        required={true}
                        inputValueChanged={(e) => this.inputChangedHandler(e, 'city')}
                        value={this.state.orderForm.city.value}
                        valid={this.state.orderForm.city.valid}
                        touched={this.state.orderForm.city.touched}
                        identifier={'city'}
                        inputType={'input'}>
                            <span>City</span>
                            <span style={{color: '#e32b2b'}}> *</span>
                    </Input>

                    <Input
                        type={'text'}
                        required={true}
                        inputValueChanged={(e) => this.inputChangedHandler(e, 'state')}
                        value={this.state.orderForm.state.value}
                        valid={this.state.orderForm.state.valid}
                        touched={this.state.orderForm.state.touched}
                        identifier={'state'}
                        inputType={'input'}
                        maxLength={2}>
                            <span>State</span>
                            <span style={{color: '#e32b2b'}}> *</span>
                    </Input>
                    
                    <Input
                        type={'text'}
                        required={true}
                        inputValueChanged={(e) => this.inputChangedHandler(e, 'zipcode')}
                        value={this.state.orderForm.zipcode.value}
                        valid={this.state.orderForm.zipcode.valid}
                        touched={this.state.orderForm.zipcode.touched}
                        identifier={'zipcode'}
                        inputType={'input'}
                        maxLength={5}>
                            <span>Zipcode</span>
                            <span style={{color: '#e32b2b'}}> *</span>
                    </Input>

                    <Input
                        readOnly={true}
                        inputType={'input'}
                        value={'United States of America'}>
                    </Input>

                </div>
            </div>)

        const highlightWithRanges = [
            {
                "react-datepicker__day--highlighted-custom-2": [
                    addDays(new Date(), (new Date()).getHours() > 12 ? 8 : 1),
                    addDays(new Date(), 2),
                    addDays(new Date(), 3),
                    addDays(new Date(), 4),
                    addDays(new Date(), 5),
                    addDays(new Date(), 6),
                    addDays(new Date(), 7)
                ],
            },
        ]

        let attachedClasses = [classes.CalenDarInput, ''];
        if (!this.state.isValidTime) {
            attachedClasses = [classes.CalenDarInput, classes.Error];
        }

        if (this.state.isValidTime) {
            attachedClasses = [classes.CalenDarInput, classes.Correct]
        }

        if (this.state.isValidTime === null) {
            attachedClasses = [classes.CalenDarInput, '']
        }

        let icon = null;

        // if (!this.state.isValidTime) {
        //     icon = (<span className={classes.Icon}>
        //                 <img src={invalid}/>
        //             </span>)
        // }
        if (this.state.isValidTime) {
            icon = (<span className={classes.Icon}>
                <img src={valid}/>
            </span>)
        }

        return (
            <div className={classes.ShippingInfoWrapper}>
                <div className={classes.ShippingInfo}>
                    <div className={classes.Title}>
                        <p>Checkout</p>
                    </div>
            
                    {/* Delivery Options (Delivery/ PickUp) */}
                    <div className={classes.DeliveryOptions}>
                        <p>&nbsp;</p>
                        <h4>Delivery Options <FaShippingFast/></h4>
                        
                        <p>&nbsp;</p>
                        <div className={classes.Options}>
                            {/* Delivery */}
                            <div 
                                className={classes.Delivery} 
                                style={{borderColor: this.props.isPickUp? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.8)', background: this.props.isPickUp?'#ebe9e6' :  'lightgray'}}
                                onClick={() => this.deliverySelected()}
                            >
                                <div className={classes.Content}>
                                    <p style={{fontWeight: 600}}>Standard Delivery</p>
                                    <p>&nbsp;</p>
                                    <p style={{textTransform: 'none'}}><MdLocalShipping/> 0.5 - 2 Hours</p>
                                </div>
                                <div className={classes.Price} style={{paddingTop: '20%', textAlign:'end'}}>
                                    <p>$5</p>
                                </div>
                                {/* Icon */}
                                {!this.props.isPickUp ? 
                                    <span className={classes.Checked}>
                                        <img src={checked}/>
                                    </span>
                                : null}
                            </div>

                            {/* Pick up */}
                            <div 
                                className={classes.PickUp} 
                                style={{borderColor: this.props.isPickUp? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)', background: this.props.isPickUp ?'lightgray' : '#ebe9e6'}}
                                onClick={() => this.pickupSelected()}
                            >
                                <div className={classes.Content}>
                                    <p style={{fontWeight: 600}}>Pick Up at Address</p>
                                    <p>&nbsp;</p>
                                    <p style={{textTransform: 'none'}}><FaStore/> 9 Lonsdale St, Boston, MA 02124, USA</p>
                                </div>
                                <div className={classes.Price} style={{paddingTop: '20%', textAlign:'end'}}>
                                    <p>Free</p>
                                </div>

                                {/* Icon */}
                                {this.props.isPickUp ? 
                                    <span className={classes.Checked}>
                                        <img src={checked}/>
                                    </span>
                                : null}
                            </div>
                        </div>
                    </div>


                    {/* FORM SUBMITION */}
                    <form 
                        className={classes.ContactInfo} 
                    >
                        {/* (Shipping Address / PickUp Address) */}
                        {shippingAddress}
                        

                        <div className={classes.TimeDetails}>
                            <p>&nbsp;</p>
                            <h4>{this.props.isPickUp ? 'Pick up' : 'Delivery'} time <BsClockHistory/></h4>
                            <p className={classes.Hint}><FcIdea/> Our working hours: 10:00 AM - 7:30 PM</p> 
                            <p>&nbsp;</p>

                            <div className={classes.TimeForm}>
                                <div className={classes.DateTimePicker}>
                                    <DatePicker 
                                        showTimeSelect 
                                        value={this.state.time !== null ? getDay(this.state.time.getDay()) + ', ' + getMonth(this.state.time.getMonth()) + ' ' + this.state.time.getDate() + ', ' + this.state.time.getFullYear() + ' at ' + getTime(this.state.time)  : null}
                                        // showPopperArrow={false} 
                                        selected={this.state.time} 
                                        onChange={(time) => this.setDateHandler(time)} 
                                        dateFormat="MMMM dd, yyyy hh:mm aa" 
                                        timeIntervals={30} 
                                        minTime={setHours(setMinutes(new Date(), 0), 10)}
                                        maxTime={setHours(setMinutes(new Date(), 30), 19)}
                                        includeDates={this.isSevenDayAfter()}
                                        placeholderText="Click to select date and time" 

                                        className={attachedClasses.join(' ')}
                                        calendarClassName={classes.CalenDar}
                                        wrapperClassName={classes.Wrapper}

                                        disabledKeyboardNavigation
                                        // showDisabledMonthNavigation                                    
                                        showMonthDropdown
                                        // shouldCloseOnSelect={false}
                                        highlightDates={highlightWithRanges}
                                    />
                                    {icon}
                                </div>
                            </div>
                        </div>
                        

                        {/* Contact Details */}
                        <div className={classes.ContactDetails}>
                            <p>&nbsp;</p>
                            <h4>Contact Details <GrContactInfo/></h4>
                            <p>&nbsp;</p>

                            <div className={classes.ContactForm}>
                                <Input
                                    type={'text'}
                                    required={true}
                                    inputValueChanged={(e) => this.inputChangedHandler(e, 'firstName')}
                                    value={this.state.orderForm.firstName.value}
                                    valid={this.state.orderForm.firstName.valid}
                                    touched={this.state.orderForm.firstName.touched}
                                    identifier={'First Name'}
                                    inputType={'input'}>
                                        <span>First Name</span>
                                        <span style={{color: '#e32b2b'}}> *</span>
                                </Input>

                                <Input
                                    type={'text'}
                                    required={true}
                                    inputValueChanged={(e) => this.inputChangedHandler(e, 'lastName')}
                                    value={this.state.orderForm.lastName.value}
                                    valid={this.state.orderForm.lastName.valid}
                                    touched={this.state.orderForm.lastName.touched}
                                    identifier={'Last Name'}
                                    inputType={'input'}>
                                        <span>Last Name</span>
                                        <span style={{color: '#e32b2b'}}> *</span>
                                </Input>

                                <Input
                                    type={'text'}
                                    required={true}
                                    inputValueChanged={(e) => this.inputChangedHandler(e, 'email')}
                                    value={this.state.orderForm.email.value}
                                    valid={this.state.orderForm.email.valid}
                                    touched={this.state.orderForm.email.touched}
                                    identifier={'email'}
                                    inputType={'input'}>
                                        <span>E-mail (optional)</span>
                                </Input>

                                <Input
                                    type={'text'}
                                    required={true}
                                    inputValueChanged={(e) => this.inputChangedHandler(e, 'phone')}
                                    value={this.state.orderForm.phone.value}
                                    valid={this.state.orderForm.phone.valid}
                                    touched={this.state.orderForm.phone.touched}
                                    identifier={'phone number'}
                                    inputType={'input'}
                                    maxLength={10}>
                                        <span>Phone Number</span>
                                        <span style={{color: '#e32b2b'}}> *</span>
                                </Input>
                                
                            </div>
                        </div>
                    </form>

                    {/* checkbox */}
                    <div className={classes.CheckBox}>
                        <div className={classes.Age}>
                            <input type='checkbox' className={classes.CheckBoxBtn} checked={this.state.isChecked} onClick={this.checkBoxClickedHandler}/> 
                            <label>I'm 13+ years old.</label>
                            <p>&nbsp;</p>
                            {!this.state.isChecked?
                                (<p className={classes.ErrorMessage}>YOU CAN NOT PURCHASE IF YOU ARE NOT 13 YEARS OLD OR ELDER</p>)    
                            : null}
                            
                            <p style={{display: this.state.isChecked? 'none' : 'block'}}>&nbsp;</p>
                        </div>
                        <div className={classes.Adv}>
                            <input type='checkbox' className={classes.CheckBoxBtn}/>  
                            <label>Yes, I’d like to receive emails about exclusive sales and more.</label>
                        </div>
                        <p>&nbsp;</p>
                    </div>

                    {/* Review & Pay */}
                    <div className={classes.SubmitButton}>
                        <DecoButton 
                            disabled={!this.state.formIsValid || this.props.totalCartPrice === 0 || !this.state.isValidTime} 
                            buttonClicked={(event) => this.props.submitFormClicked(event, shippingInfo, getFullMonth(this.state.time.getMonth()) + ' ' + this.state.time.getDate() + ', ' + this.state.time.getFullYear() + ', ' + getTime(this.state.time))}>
                                <span style={{cursor: this.state.formIsValid? 'pointer' : 'not-allowed'}}>REVIEW AND PAY</span>
                        </DecoButton> 
                    </div>
                    {/* test222 */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        totalCartPrice: state.cart.totalCartPrice,
        token: state.auth.token,

        firstName: state.users.firstName,
        lastName: state.users.lastName,

        street: state.users.street,
        apt: state.users.apt,
        city: state.users.city,
        state: state.users.state,
        zipcode: state.users.zipcode,

        email: state.users.email
    }
 }

const mapDispatchToProps = dispatch => {
    return {
        onGetUserProfile: () => dispatch(actionCreators.getUserProfile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShippingInfo));