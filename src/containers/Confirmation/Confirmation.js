import React, {Component} from 'react';
// import useWindowSize from 'react-use'
import Confetti from 'react-confetti'
import Bounce from 'react-reveal/Bounce';

import classes from './Confirmation.css';

class Confirmation extends Component{
    returnToHomePage = () => {
        localStorage.removeItem('customerName');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('isPickUp');
        localStorage.removeItem('expectedTime');
        this.props.history.replace('/');
    }

    render() {

        return (
            <div className={classes.ConfirmationWrapper}>
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
                <Bounce duration="800">
                    <div className={classes.CongratsForm}>
                        <h1>Congrat<span className={classes.Hide}>ulation</span>s!</h1>

                        <svg className={classes.CheckMark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className={[classes.CheckMark, classes.Circle].join(' ')} cx="26" cy="26" r="25" fill="none"/>
                            <path className={[classes.CheckMark, classes.Check].join(' ')} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>

                        <p className={classes.Regards}>Order placed, thanks!</p>

                        <div className={classes.Text}>
                            <p>Order#: {[...this.props.history.location.search].splice(10, [...this.props.history.location.search].length-2).join('')}
                                <br/><span style={{fontWeight: 'bold'}}>{localStorage.getItem('isPickUp') === 'true' ? 'Pick up at 9 Lonsdale St, Dorchester, MA, 02124' : 'Shipping to ' + localStorage.getItem('customerName')}</span>{localStorage.getItem('isPickUp') === 'true' ? null : ', ' + localStorage.getItem('shippingAddress')}
                                <br/>Estimated {localStorage.getItem('isPickUp') === 'true' ? 'pick up' : 'delivery'} {localStorage.getItem('expectedTime')}
                            </p>

                            <p>Thank you for shopping with us</p>
                        </div>

                        <p className={classes.Regards}>Regards, Team Ăn Gì Nom Nom</p>

                        <p className={classes.Navigation}><a onClick={this.returnToHomePage}>Return to homepage</a></p>
                    </div>
                </Bounce>
            </div>
        )
    }
}

export default Confirmation; 