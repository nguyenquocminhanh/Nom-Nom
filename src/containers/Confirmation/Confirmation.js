import React, {Component} from 'react';

import classes from './Confirmation.css';

class Confirmation extends Component{
    render() {
        return (
            <div className={classes.ConfirmationWrapper}>
                <h3>Congratulation!!! Your Order has been placed</h3>
                <h4>Thank you for shopping with us!!</h4>    
                Your Order Confirmation Number is: 
                <div className={classes.ConfirmNumber}>#{[...this.props.history.location.search].splice(10, [...this.props.history.location.search].length-2).join('')}</div>
                <div className={classes.NavButtons}>
                    <button onClick={() => this.props.history.push('/menu')}><span>Return to Menu</span></button>
                    <button onClick={() => this.props.history.push('/')}><span>Return to HomePage</span></button>       
                </div>
            </div>
        )
    }
}

export default Confirmation; 