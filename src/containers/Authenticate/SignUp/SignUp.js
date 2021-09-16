import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';
import axios from '../../../axios/axios-orders';
import {Fade} from 'react-awesome-reveal';
import Switch from 'react-switch';

import * as actionCreators from '../../../store/actions/index';

import classes from './SignUp.css';
import Layout from '../../../hoc/Layout/Layout';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class SignUp extends Component {
    state = {
        isShownPassword: false,
        isSignUp: true,
        controls: {
            firstName: {
                type: 'First Name',
                value: '',
                validation: {
                    required: true,
                }
            },
            lastName: {
                type: 'Last Name',
                value: '',
                validation: {
                    required: true,
                }
            },
            gender : {
                type: 'Gender',
                value: '',
                validation: {
                    required: true,
                }
            },
            email: {
                type: 'E-Mail',
                value: '',
                validation: {
                    required: true,
                    validEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                type: 'Password',
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },  
        },
        /// Gender
        checked: ''
    }

    checkValidity = (value, rules) => {
        // Kết hợp isValid với điều kiện để tránh trường hợp user chưa nhập gì vào input mà
        // valid đã báo false và check tất cả điều kiện chứ ko phải chỉ riêng điều kiện cuối

        let isValid = true;

        // If validation has required in it
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.validEmail) {
            isValid = (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value);
        }

        return isValid;
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
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls})
    }

    // Show Password
    toggltShowingPasswordHandler = () => {
        this.setState(prevState => {
            return {
                ...this.state,
                isShownPassword: !prevState.isShownPassword
            }
        })
    }

    // Control checkbox
    checkboxHandler = (checkedItem) => {
        this.setState({checked: checkedItem});
    }

    submitHandler = () => {
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }
 
    componentDidUpdate = (prevProps, prevState) => {
        // After Sign Up successfully, token changed, isAuthenticated changed
        if (prevProps.refreshToken !== this.props.refreshToken) {
            this.props.onCheckInOrUp(true);
            // create user in DB
            this.props.onCreateUser(this.state.controls.firstName.value, this.state.controls.lastName.value, this.state.controls.gender.value, this.state.controls.email.value, this.props.userId);
            this.props.history.push({pathname: '/sign-in'});
        }

        // Hanlde Gender value
        if (prevState.checked !== this.state.checked) {
            const updatedControls = {
                ...this.state.controls,
                gender: {
                    ...this.state.gender,
                    value: this.state.checked
                }
            }
            this.setState({controls: updatedControls});
        }
    }

    componentDidMount = () => {
        if (this.props.error !== null) {
            this.props.onAuthResetError();
        }
    }

    render() {
        let form = (
            <form method="post" onSubmit={() => this.submitHandler()} className={classes.Form}>
                <h2>Your Name</h2>
                {/* First Name */}
                {/* <input 
                    type="text" 
                    placeholder="First Name" 
                    required="required" 
                    autoComplete="off"
                    value={this.state.controls['firstName'].value} 
                    onChange={(event) => this.inputChangedHandler(event, 'firstName')} 
                    className={this.invalidFeedBack(this.state.controls.firstName.valid, this.state.controls.firstName.touched)}
                /> */}
                <div className={classes.Inputs}>
                    <Input
                        type={'text'}
                        required={true}
                        inputValueChanged={(event) => this.inputChangedHandler(event, 'firstName')}
                        value={this.state.controls['firstName'].value}
                        valid={this.state.controls.firstName.valid}
                        touched={this.state.controls.firstName.touched}
                        identifier={'First name'}
                        inputType={'input'}>
                            <span>First Name</span>
                            <span style={{color: '#e32b2b'}}> *</span>
                    </Input>

                    <Input
                        type={'text'}
                        required={true}
                        inputValueChanged={(event) => this.inputChangedHandler(event, 'lastName')}
                        value={this.state.controls['lastName'].value}
                        valid={this.state.controls.lastName.valid}
                        touched={this.state.controls.lastName.touched}
                        identifier={'Last name'}
                        inputType={'input'}>
                            <span>Last Name</span>
                            <span style={{color: '#e32b2b'}}> *</span>
                    </Input>
                </div>

                {/* GENDER */}
                <h2>Gender</h2>
                <div className={classes.GenderContainer}>
                    <div className={classes.Gender}>
                        <label>
                            <input 
                                type='checkbox' 
                                checked={this.state.checked==='male'} 
                                onChange={() => this.checkboxHandler('male')}
                            />
                            <span>Male</span>
                        </label>
                        <label>
                            <input 
                                type='checkbox' 
                                checked={this.state.checked==='female'}
                                onChange={() => this.checkboxHandler('female')}
                            />
                            <span>Female</span>
                        </label>
                        <label>
                            <input 
                                type='checkbox' 
                                checked={this.state.checked==='other'}
                                onChange={() => this.checkboxHandler('other')}
                            />
                            <span>Other</span>
                        </label>
                    </div>
                </div>
                
                {/* LOGIN DETAILS */}
                <h2>Login Details</h2>
                {/* Email */}
                <div className={classes.Inputs}>
                    {/* <input 
                        type="text" 
                        placeholder="E-mail" 
                        required="required" 
                        autoComplete="off"
                        value={this.state.controls['email'].value} 
                        onChange={(event) => this.inputChangedHandler(event, 'email')} 
                        className={this.invalidFeedBack(this.state.controls.email.valid, this.state.controls.email.touched)}
                    /> */}
                    <Input
                        type={'text'}
                        required={true}
                        inputValueChanged={(event) => this.inputChangedHandler(event, 'email')}
                        value={this.state.controls['email'].value}
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}
                        identifier={'E-mail'}
                        inputType={'input'}>
                            <span>E-mail</span>
                            <span style={{color: '#e32b2b'}}> *</span>
                    </Input>
                    {/* Password */}
                    {/* <input 
                        type={this.state.isShownPassword ? "text" : "password"} 
                        placeholder="Password" 
                        required="required"
                        value={this.state.controls['password'].value} 
                        onChange={(event) => this.inputChangedHandler(event, 'password')}
                        className={this.invalidFeedBack(this.state.controls.password.valid, this.state.controls.password.touched)}
                    /> */}
                    <Input
                        type={this.state.isShownPassword ? "text" : "password"}
                        required={true}
                        inputValueChanged={(event) => this.inputChangedHandler(event, 'password')}
                        value={this.state.controls['password'].value}
                        valid={this.state.controls.password.valid}
                        touched={this.state.controls.password.touched}
                        identifier={'Password'}
                        inputType={'input'}>
                            <span>Password</span>
                            <span style={{color: '#e32b2b'}}> *</span>
                    </Input>
                </div>

                {/* Toggle Show Password */}
                <div className={classes.ShowPassword}>
                    <Switch onChange={this.toggltShowingPasswordHandler} checked={this.state.isShownPassword} offColor='#123'/>
                    {/* <span>Show Password</span> */}
                    <span>Show Password</span>
                </div>
                    
                <div className={classes.ButtonWrapper}>
                    <button 
                        title="Sign Up"
                        type="submit" 
                        disabled={this.state.controls.email.valid && this.state.controls.password.valid && this.state.controls.firstName.valid && this.state.controls.lastName.valid && this.state.checked !== '' ? false : true}>
                            Sign up
                    </button>
                </div>
                
                <div className={classes.Text}>
                    Already have an account? &nbsp; <a onClick={() => {this.props.history.push('/sign-in')}} className={classes.Highlight}>Let's Sign in</a>
                </div>
            </form>
        )

        if (this.props.isLoading) {
            form = <Spinner/>
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = (
                // Error message from Firebase
                <p style={{color: 'red'}}>{this.props.error.message.split('_').join(' ')}</p>
            )
        }

        return (
            <Layout>
                <Fade duration="500" direction="down">
                    <div className={classes.SignUpWrapper}>
                        <div className={classes.SignUpBackground}>

                        </div>
                        <div className={classes.SignUp}>
                            <div className={classes.Title}>
                                <p>Sign up</p>
                            </div>

                            {errorMessage}

                            {form}

                        </div>
                    </div>
                </Fade>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.loading,
        error: state.auth.error,
        // refreshToken used wether the account is signed up successfully or not? 
        refreshToken: state.auth.refreshToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp)),
        onCheckInOrUp: (bool => dispatch(actionCreators.checkInOrUp(bool))),
        onCreateUser: (firstName, lastName, gender, email, userId) => dispatch(actionCreators.createUser(firstName, lastName, gender, email, userId)),
        onAuthResetError: () => dispatch(actionCreators.authResetError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));