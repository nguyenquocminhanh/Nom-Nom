// Flexible way to showing an error when sending requests or receiving response from server
//  no matter which component, which conteiner is occurs

// Show error message in the modal on the Higher order component

// Wrap any component which should have this error modal with it & conveniently add the error handling

import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
            state = {
                // true/false
                isError: false,
                // What kind of error?
                error: null
            }

        errorConfirmedHandler = () => {
            this.setState({isError: false, error: null})
        }

        // dont have side effect in componentWillMount 
        componentWillMount = () => {
            // axios request interceptor
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({isError: false})
                // remember to return request to not block the req to server
                return req;
                },
                // error lost internet connection,...
                error => {
                    this.setState({isError: true, error: error})
                
            });
            // axios response interceptor
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                // error 404 or wrong grammar
                this.setState({isError: true, error: error})
            });
        }

        // cleanup Interceptor
        componentWillUnmount = () => {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.isError} backdropClicked={() => this.errorConfirmedHandler()} closeOrderRequest={() => this.errorConfirmedHandler()}>
                        {this.state.isError ? <div style={{textAlign: 'center'}}>{this.state.error.message}</div> : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;