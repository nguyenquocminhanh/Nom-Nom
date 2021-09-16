import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';
import {Fade} from 'react-awesome-reveal';

import * as actionCreators from '../../../store/actions/index';

import classes from './ResetPassword.css';
import Layout from '../../../hoc/Layout/Layout';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ResetPassword extends Component {
    state = {       
        controls: {
            email: {
                type: 'E-Mail',
                value: '',
                validation: {
                    required: true,
                    validEmail: true
                },
                valid: false,
                touched: false
            }
        }
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

    submitHandler = (event, email) => {
        event.preventDefault();
        this.props.onSendEmail(email);
    }

    componentDidMount = () => {
        if (this.props.error !== null) {
            this.props.onAuthResetError();
        }
    }

    render() {
        let form = (
            <form method="post" onSubmit={(event) => this.submitHandler(event, this.state.controls.email.value)} className={classes.Form}>
                {/* Email */}
                <Input
                    type={"text"}
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

                <div className={classes.ButtonWrapper}>
                    <button 
                        title="Reset your Password"
                        type="submit" 
                        disabled={this.state.controls.email.valid ? false : true}>
                            Reset your Password
                    </button>
                </div>

                <div className={classes.Cancel}>
                    <a onClick={() => {this.props.history.push('/sign-in')}} className={classes.Highlight}>Cancel</a>
                    {/* <NavLink to='/sign-in' exact style={{color: '#007c8a', fontWeight: 600, textDecoration: 'none'}} className={classes.Nav}>Cancel</NavLink> */}
                </div>
            </form>
        )

        if (this.props.isLoading) {
            form = <Spinner/>
        }

        let message = null;

        if(this.props.isSentRequest) {
            message = (
                <p className={classes.Message}>If the email matches with your account, follow the instruction in email to reset your password</p>
            )
        }

        return (
            <Layout>
                <Fade duration="500" direction="down">
                    <div className={classes.ResetPasswordWrapper}>
                        <div className={classes.ResetPasswordBackground}>

                        </div>
                        <div className={classes.ResetPassword}>
                            <div className={classes.Title}>
                                <p>Reset Password</p>
                            </div>
                            {message}
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
        isLoading: state.security.loading,
        error: state.security.error,
        isSentRequest: state.security.isSentRequest
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSendEmail: (email) => dispatch(actionCreators.sendEmail(email)),
        onAuthResetError: () => dispatch(actionCreators.authResetError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPassword));