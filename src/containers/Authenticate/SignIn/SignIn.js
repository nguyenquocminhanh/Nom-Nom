import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';
import Switch from 'react-switch';
import {Fade} from 'react-awesome-reveal';

import * as actionCreators from '../../../store/actions/index';

import classes from './SignIn.css';

import Layout from '../../../hoc/Layout/Layout';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'

class SignIn extends Component {
    state = {
        isShownPassword: false,
        isSignUp: false,
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
        isForwading: false,
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

    // function này chỉ để update token và userId trên global Redux store
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onCheckInOrUp(false)
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);  
    }

    // parse the quesry to see whether forwarding is true or false
    componentDidMount = () => {
        if (this.props.error !== null) {
            this.props.onAuthResetError();
        }

        
        const query = new URLSearchParams(this.props.location.search);
        for (let q of query) {
            // ['forwarding', 'true]
            this.setState({isForwading: q[1]});
        };
    }


    // after login, props.isAuthenticated & props.token iare updated, there are 2 situations to redirect after that
    componentDidUpdate = (prevProps, prevState) => {
        // change isAuthenticated from false to true
        // prevProps.token !== this.props.token là trường hợp khi vừa đăng ký xong chuyển qua đăng nhập liền
        if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
            // save password to local storage to check when changing password
            localStorage.setItem('password', this.state.controls.password.value);
            // whether forwarding to /checkout or not
            if (this.state.isForwading === 'true') {
                this.props.history.replace('/checkout');
            }
            // redirect to Main Page
            else {
                this.props.history.replace('/');
            }
        }
    } 

    render() {
        let form = (
            <form method="post" onSubmit={this.submitHandler} className={classes.Form}>
                {/* <input 
                    type="text" 
                    placeholder="E-mail" 
                    required="required" 
                    value={this.state.controls['email'].value} 
                    onChange={(event) => this.inputChangedHandler(event, 'email')} 
                    autoComplete="off"
                    className={this.invalidFeedBack(this.state.controls.email.valid, this.state.controls.email.touched)}
                /> */}
                <div className={classes.Inputs}>
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

                    {/* {this.errorMessageHandler(this.state.controls.email.valid, this.state.controls.email.touched, this.state.controls.email.type)} */}

                    {/* type text or password? depend on state.isShownPassword */}

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
                    
                    {/* <input 
                        type={this.state.isShownPassword ? "text" : "password"} 
                        placeholder="Password" 
                        required="required"
                        value={this.state.controls['password'].value} 
                        onChange={(event) => this.inputChangedHandler(event, 'password')}
                        className={this.invalidFeedBack(this.state.controls.password.valid, this.state.controls.password.touched)}
                    /> */}
                </div>

                {/* {this.errorMessageHandler(this.state.controls.password.valid, this.state.controls.password.touched, this.state.controls.password.type)} */}
                
                {/* Toggle Show Password */}
                <div className={classes.ShowPassword}>
                    <Switch onChange={this.toggltShowingPasswordHandler} checked={this.state.isShownPassword} offColor='#123'/>
                    {/* <span>Show Password</span> */}
                    <span>Show Password</span>
                </div>

                {/* reset Password */}
                <div className={classes.ResetPassword}>
                    {/* <NavLink to='/reset-password' exact style={{color: '#007c8a', fontWeight: 600}}>
                        Reset your Password
                    </NavLink> */}
                    <a onClick={() => {this.props.history.push('/reset-password')}} className={classes.Highlight}>Reset your Password</a>
                </div>
                
                <div className={classes.ButtonWrapper}>
                    <button 
                        // if isAuthenticated && isForwading then forwading to checkout page
                        title="Sign In"
                        type="submit" 
                        disabled={this.state.controls.email.valid && this.state.controls.password.valid ? false : true}>
                            Sign in
                    </button>
                </div>

                <div className={classes.NoAccount}>
                    Didn't have an account yet? <a onClick={() => {this.props.history.push('/sign-up')}} className={classes.Highlight}>&nbsp; Join with us!!</a>
                    {/* <NavLink to="/sign-up" exact style={{color: '#007c8a', fontWeight: 600}}>Join with us!!</NavLink> */}
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
                <p style={{color: 'red', textAlign:'center'}}>{this.props.error.message.split('_').join(' ')}</p>
            )
        }

        return (
            <Layout>
                <Fade duration="500">
                    <div className={classes.SignInWrapper}>
                        <div className={classes.SignInBackground}>

                        </div>
                        <div className={classes.SignIn}>
                            <div className={classes.Title}>
                                <p>Sign in</p>
                            </div>
                            {this.props.inOrUp ? <p style={{textAlign: 'center', color: 'green', fontSize: '16px', fontWeight: '600'}}>Your account has been created Successfully!</p> : null}
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
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        inOrUp: state.auth.inOrUp
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp)),
        onCheckInOrUp: (bool) => dispatch(actionCreators.checkInOrUp(bool)),
        onCombineToCart: () => dispatch(actionCreators.combineLocalStorageToDatabase()),
        onAuthResetError: () => dispatch(actionCreators.authResetError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));