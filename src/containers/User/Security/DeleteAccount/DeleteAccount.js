import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import classes from './DeleteAccount.css';
import {IoMdInformationCircleOutline} from 'react-icons/io';

import * as actionCreators from '../../../../store/actions/index';

import Spinner from '../../../../components/UI/Spinner/Spinner';

class DeleteAccount extends Component {
    state = {
        controls: {
            password: {
                type: 'Password',
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },

        formIsValid: false,
        // whether user input correct password
        isError: false,
        isAccountDeleted: false
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


    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.isAccountDeleted !== this.props.isAccountDeleted) {
            this.setState ({
                isError: false,
                isAccountDeleted: true
            });
            // logout after 10s when account is deleted  
            setTimeout(() => {
                this.props.history.replace('/');
                this.props.onLogout();
            }, 10000)
        }
    }
    deleteAccountHandler = (event) => {
        event.preventDefault();
        if (this.state.controls.password.value !== localStorage.getItem('password')) {
            this.setState({isError: true})
        } else {
            // delete user, cart, account
            this.props.onDeleteUser();
            this.props.onEmptycart();
            this.props.onDeleteCart();
            this.props.onDeleteAccount();
        }
    }

    render() {
        let successMessage = this.state.isAccountDeleted ? <div style={{textAlign: 'center', border: 'solid 3px lightskyblue', backgroundColor: 'aquamarine', padding: '5px 10px'}}>Your account has been deleted, you will be logged out after 10s</div> : null;
        let failMessage = this.state.isError ? <div style={{textAlign: 'center', border: 'solid 3px lightskyblue', backgroundColor: 'aquamarine', padding: '5px 10px'}}>The Password is not correct</div> : null;
        let errorMessage = this.props.error ? <div style={{textAlign: 'center', border: 'solid 3px lightskyblue', backgroundColor: 'aquamarine', padding: '5px 10px'}}>{this.props.error}</div> : null;
        let deleteAccountForm = this.props.isLoading ? <Spinner/> : (
            <form 
                className={classes.DeleteAccount} 
                onSubmit={this.deleteAccountHandler}
            >  
                <div className={classes.DeleteAccountForm}>
                    {/* Password */}
                    <div className={classes.Password}>
                        <span className={classes.FloatingLabel}>Your Password</span>
                        <input 
                            className={this.invalidFeedBack(this.state.controls.password.valid, 
                            this.state.controls.password.touched)} 
                            type="password" 
                            value={this.state.controls['password'].value} 
                            onChange={(event) => this.inputChangedHandler(event, 'password')} 
                            required
                            placeholder="Confirm Password"/>
                        {/* {this.errorMessageHandler(this.state.orderForm.firstName.valid, this.state.orderForm.firstName.touched, this.state.orderForm.firstName.type)} */}
                    </div>

                    
                    <div className={classes.SubmitButton}>
                        <button
                            disabled={!this.state.formIsValid}  
                        >   
                            Delete Account
                        </button>
                    </div>
                </div>
            </form>
        )

        return (
            <div className={classes.Security}>
                {/* Title */}
                <h3>Delete Account</h3>
                {successMessage}
                {failMessage}
                {errorMessage}
                {deleteAccountForm}
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
       isAccountDeleted: state.security.isAccountDeleted
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteAccount: () => dispatch(actionCreators.deleteAccount()),
        onLogout: () => dispatch(actionCreators.logout()),
        onDeleteUser: () => dispatch(actionCreators.deleteUser()),
        onDeleteCart: () => dispatch(actionCreators.deleteCart()),
        onEmptycart: () => dispatch(actionCreators.emptyCart())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(DeleteAccount));