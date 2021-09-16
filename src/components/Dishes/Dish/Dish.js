import React, {Component} from 'react';
import classes from './Dish.css';
// Font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar as fasStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons'

class Dish extends Component {
    render() {
        let rate;
        const fullStar = <FontAwesomeIcon icon={fasStar} className={classes.Icon}/>;
        const halfStar = <FontAwesomeIcon icon={faStarHalfAlt} className={classes.Icon}/>
        const emptyStart = <FontAwesomeIcon icon={farStar} className={classes.Icon}/> 
        switch(this.props.stars) {
            case 4:
                rate = (
                    <div className= {classes.IconContainer}>
                        {fullStar}
                        {fullStar}
                        {fullStar}
                        {fullStar}  
                        {fullStar}
                    </div>
                )
                break;
            case 4.5: 
                rate = (
                    <div className= {classes.Icon}>
                        {fullStar}
                        {fullStar}
                        {fullStar}
                        {fullStar}
                        {halfStar}
                    </div>
                )
                break;
            case 5: 
                rate = (
                    <div className= {classes.Icon}>
                        {fullStar}
                        {fullStar}
                        {fullStar}
                        {fullStar}
                        {fullStar}
                    </div>
                )
                break;
        }
        
        // Love Icon  
        let attachedClasses = [classes.LikeButton, ''];
        if (this.props.isLoved) {
            attachedClasses = [classes.LikeButton, classes.Active];
        }
 
        return (
            <div className={classes.Dish}>
                <div className={classes.Content}>
                    
                    <div className={classes.ImageContainer}>
                        {/* Love Icon */}
                        <span className={attachedClasses.join(' ')} onClick={this.props.loveIconClicked}></span>

                        {/* Image */}
                        <img 
                            src={this.props.imgSrc}
                        />
                        {/* Overlay */}
                        <div
                            className={classes.Overlay}
                            onClick={this.props.addToCart}
                        >
                                Add to cart
                        </div>
                    </div>                    
                </div>
    
                <div className={classes.Label}>
                    {rate}
                    <p>{this.props.name}</p>
                    <p>Price: ${this.props.price.toFixed(2)}</p>
                </div>
            </div>
        )
    }
}



export default Dish;