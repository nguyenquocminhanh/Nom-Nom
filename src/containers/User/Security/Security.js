import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Security.css';
import {IoMdInformationCircleOutline} from 'react-icons/io';

import * as actionCreators from '../../../store/actions/index';

import Spinner from '../../../components/UI/Spinner/Spinner';
import DeleteAccount from './DeleteAccount/DeleteAccount';

class Security extends Component {
    state = {
        controls: {
            oldPassword: {
                type: 'Old Password',
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            newPassword: {
                type: 'New Password',
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },  
        },

        formIsValid: false,
        isPasswordChanged: null,
        notification: null,
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

        return isValid;
    }

    // Check invalid and feedback to input
    invalidFeedBack = (valid, touched) => {
        let inputClasses = [];
        if (!valid && touched) {
            inputClasses.push(classes.Invalid);
        }
        return inputClasses.join(' ')
    }

    // Error Message Below input
    errorMessageHandler = (valid, touched, type) => {
        if (!valid && touched) {
            return <p className={classes.ErrorMessage}>Please enter a valid {type}!</p>
        }
        return null;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls
        };
        const updatedControlElement = {
            ...updatedControls[inputIdentifier]
        };
        updatedControlElement.value = event.target.value;
        updatedControlElement.valid = this.checkValidity(updatedControlElement.value, updatedControlElement.validation);
        updatedControlElement.touched = true;
        updatedControls[inputIdentifier] = updatedControlElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
            // &&formIsValid make sure all valid of each inputElement is true
        }

        this.setState({controls: updatedControls, formIsValid: formIsValid});
    } 

    emptyInputValueHandler = (inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls
        };
        const updatedControlElement = {
            ...updatedControls[inputIdentifier]
        };
        updatedControlElement.value = '';
        updatedControls[inputIdentifier] = updatedControlElement;
        return updatedControls;
    }

    submitChangePasswordHandler = (event) => {
        // console.log('ok')
        event.preventDefault();
        // compare password if matched, change password. Otherwise, return warning
        if (localStorage.getItem('password') === this.state.controls.oldPassword.value) {
            // New Password is duplicated
            if (this.state.controls.oldPassword.value === this.state.controls.newPassword.value) {
                this.setState({
                    isPasswordChanged: false, 
                    notification: "Your New Password is duplicate with your Old Password! Please choose another New Password",
                    controls: this.emptyInputValueHandler('newPassword')
                })
            } 
            
         // Ok
            else {
                // change pw in the database
                this.props.onChangePassword(this.state.controls.newPassword.value);
            }
        }
        else {
            this.setState({
                isPasswordChanged: false, 
                notification: "Ooops! Your Old Password is not Correct!", 
                controls: this.emptyInputValueHandler('oldPassword')})
        }   
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.token !== this.props.token) {
            this.setState ({
                isPasswordChanged: true, 
                notification: "Congratulations!! Your New Password has been saved Successfully!!",
            });
        }
    }


    render() {
        let message = null
        if (this.state.notification !== null || this.props.error) {        
            message = 
                <div style={{textAlign: 'center', border: 'solid 3px lightskyblue', backgroundColor: 'aquamarine', padding: '5px 10px'}}>
                    {this.state.notification !== null ? <p style={{color: this.state.isPasswordChanged? 'green' : 'red'}}><IoMdInformationCircleOutline/> {this.state.notification}</p> : null}
                    {this.props.error ? <p style={{color: 'red'}}><IoMdInformationCircleOutline/> {this.props.error.message.split('_').join(' ')}</p> : null}
                </div>
        }
        let securityForm = this.props.isLoading ? <Spinner/> : (
            <form 
                className={classes.ResetPassWord} 
                onSubmit={(event) => this.submitChangePasswordHandler(event)}
            >
                {/* <p style={{fontSize: '15px', color: this.state.isError? 'red' : 'green', fontWeight: '500', textAlign: 'center'}}>
                    {this.props.isPasswordChanged ?  notification : null}
                </p> */}
                <div className={classes.ResetPasswordForm}>
                    {/* Old Password */}
                    <div className={classes.OldPassword}>
                        <span className={classes.FloatingLabel}>Old Password</span>
                        <input 
                            className={this.invalidFeedBack(this.state.controls.oldPassword.valid, 
                            this.state.controls.oldPassword.touched)} 
                            type="password" 
                            value={this.state.controls['oldPassword'].value} 
                            onChange={(event) => this.inputChangedHandler(event, 'oldPassword')} 
                            required
                            placeholder="Old Password"/>
                        {/* {this.errorMessageHandler(this.state.orderForm.firstName.valid, this.state.orderForm.firstName.touched, this.state.orderForm.firstName.type)} */}
                    </div>

                    {/* New Password */}
                    <div className={classes.NewPassword}>
                        <span className={classes.FloatingLabel}>New Password</span>
                        <input 
                            className={this.invalidFeedBack(this.state.controls.newPassword.valid, 
                            this.state.controls.newPassword.touched)} 
                            type="password" 
                            value={this.state.controls['newPassword'].value} 
                            onChange={(event) => this.inputChangedHandler(event, 'newPassword')} 
                            required
                            placeholder="New Password"/>
                        {/* {this.errorMessageHandler(this.state.orderForm.lastName.valid, this.state.orderForm.lastName.touched, this.state.orderForm.lastName.type)} */}
                        <div className={classes.SubmitButton}>
                            <button
                                disabled={!this.state.formIsValid}  
                            >   
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )

        return (
            <div className={classes.Security}>
                {/* Title */}
                <h3>Edit your password</h3>
                {message}
                {securityForm}
                <DeleteAccount/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // PENDING
        isLoading: state.security.loading,
        // FAIL
        error: state.security.error,
        // SUCCESS
        token: state.security.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChangePassword: (newPassword) => dispatch((actionCreators.changePassword(newPassword)))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Security);