import React, {Component} from 'react';
import NumericInput from 'react-numeric-input';

import classes from './OrderSummary.css'

import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
  
    render() {
        return (
            <div className={classes.OrderSummaryWrap}>
                <div className={classes.OrderSummary}>
                    <h2>Your meal includes:</h2>
                        <p>
                            <span className={classes.ChosenDish}> 
                                {this.props.chosenDish.label} &nbsp;
                            </span>
                            
                            <span style={{width: '125%'}}>
                                <NumericInput 
                                    className={classes.NumericInput} 
                                    min={0} 
                                    max={100}
                                    placeholder={0}
                                    onChange={this.props.updateCurrentPrice} 
                                    value={this.props.numberOfPickedDish}
                                />
                            </span>   
                        </p>
                        <p>
                            Your price: ${this.props.currentPrice.toFixed(2)}
                        </p>
                </div>

                <div className={classes.OrderSummaryImage}>
                    <img src={this.props.chosenDish.image}/>
                </div>

                <div className={classes.OrderSummaryButtons}>
                    <Button btnType='Danger' clicked={this.props.addCartClicked} condition={this.props.numberOfPickedDish == 0} >ADD CART</Button>
                    <Button btnType='Success' clicked={this.props.checkoutClicked} condition={this.props.numberOfPickedDish == 0} >CHECKOUT</Button>
                </div>    
            </div>
        )
    }   
}

export default OrderSummary;