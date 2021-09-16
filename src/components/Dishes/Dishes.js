import React from 'react';
// import {connect} from 'react-redux';
import classes from './Dishes.css';

import Dish from './Dish/Dish';
import Aux from '../../hoc/Auxiliary/Auxiliaryx';
import {Fade, AttentionSeeker} from 'react-awesome-reveal';

const dishes = props => {
    return(
        <Aux>
            <Fade duration="1000" triggerOnce="true">
                <div className={classes.Title}><p>Menu</p></div>
            
                <div className={classes.Dishes}>
                    {props.dishes.map(dish => {
                        return <Dish 
                            key={dish.id}
                            id={dish.id}
                            name={dish.label} 
                            price={dish.price}
                            imgSrc={dish.image}
                            stars={dish.stars}
                            addToCart={() => props.isPicking(dish.id)}
                            isLoved={dish.isLoved}
                            loveIconClicked={() => props.loveIconClicked(dish.id)}
                        />
                    })} 
                </div>         
            </Fade>

            <AttentionSeeker>
                <div className={classes.Title}><p style={{fontStyle: 'italic', paddingBottom: '50px'}}>Hope you have a good meal!</p></div>   
            </AttentionSeeker>
        </Aux>
    )
}

export default dishes;