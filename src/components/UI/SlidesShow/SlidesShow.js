import React, {Component} from 'react';

import classes from './SlidesShow.css';

import * as img from '../../../assets/Images/index';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

class SlidesShow extends Component {
    state = {
        slideShow: 0,
        imgs: this.props.imgs
    }

    plusSlide = (numberOfImages) => {        
        this.setState(prevState => {
            return {
                ...prevState,
                slideShow: prevState.slideShow + 1 === numberOfImages? 0: prevState.slideShow + 1
            }
        }) 
    }

    minusSlide = (numberOfImages) => {
        this.setState(prevState => {
            return {
                ...prevState,
                slideShow: prevState.slideShow === 0? numberOfImages - 1 : prevState.slideShow - 1
            }
        })
    }

    dotClicked = (index) => {
        this.setState({
            slideShow: index
        })
    }

    componentDidMount = () => {
        this.timer = setInterval(
            () => this.setState(prevState => ({
                slideShow: prevState.slideShow + 1 === prevState.imgs.length? 0: prevState.slideShow + 1
            })), 5000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
    
        return (
            <Aux>
                <div className={classes.SlideShowContainer}>

                    {this.state.imgs.map((img, index) => {
                    
                        return (
                            <div className={this.state.slideShow === index ? [classes.Appear, classes.fade].join(' ') : [classes.MySlides, classes.fade].join(' ')}>
                             
                                <img src={img.url} style={{width: '100%'}}/>
                                <div className={classes.Text}>{img.caption}</div>
                             
                            </div>
                        )
                    })}

                    <a className={classes.Prev} onClick={() => this.minusSlide(this.state.imgs.length)}>&#10094;</a>
                    <a className={classes.Next} onClick={() => this.plusSlide(this.state.imgs.length)}>&#10095;</a>

                    
                </div>

                <div style={{textAlign: 'center'}}>
                        {this.state.imgs.map((img, index) => {
                            return (<span onClick={() => this.dotClicked(index)} className={this.state.slideShow === index ? [classes.Dot, classes.active].join(' '): classes.Dot}></span>)
                        })}
                </div>
            </Aux>
        )
    }
}

export default SlidesShow;