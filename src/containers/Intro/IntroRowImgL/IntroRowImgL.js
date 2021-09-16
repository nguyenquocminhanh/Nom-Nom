import React, {Component} from 'react';

import classes from './IntroRowImgL.css';

import {Zoom} from 'react-awesome-reveal';

class IntroRowImgL extends Component {
    state = {
        currenBackGroundImageIdex: 0
    }

    dotClicked = (index) => {
        this.setState({
            currenBackGroundImageIdex: index
        })
    }

    render() {
        const emptyLines = [];
        for (let i = 0; i < this.props.numberNbsp; i++){
            emptyLines.push(<p>&nbsp;</p>)
        }

        let dots;

        if (this.props.backgroundImageLeft.length > 1) {
            dots = (
                <div className={classes.Dots}>
                    {this.props.backgroundImageLeft.map((img, index) => {
                        return <span   
                            className={this.state.currenBackGroundImageIdex === index ? [classes.Dot, classes.Active].join(' ') : [classes.Dot]}
                            onClick={() => this.dotClicked(index)}></span>
                    })}
                </div>
            )
        }

        return (
            <div className={classes.IntroRowImgLWrap}>
                <div className={classes.IntroRow}>
                    {/* Image On Left */}
                    <div className={classes.LeftColumnWrap}>   
                        <Zoom duration={2500} triggerOnce style={{height: '100%'}}>
                            <div className={classes.LeftColumn} 
                                style={{
                                    backgroundImage: `url(${this.props.backgroundImageLeft[this.state.currenBackGroundImageIdex]})`,
                                    backgroundPosition: 'center center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    transition: 'background-image 1s linear'
                                }}>     
                                    <div className={classes.NonBreakingSpace}>
                                        {emptyLines}
                                    </div>
                                    {dots}
                            </div>
                        </Zoom>    
                    </div>

                    {/* Content On Right */}
                    <div className={classes.RightColumnWrap}>
                        <div className={classes.RightColumn}> 
                            {this.props.children} 
                        </div>
                    </div>
                </div>
            </div>
        )
    }   
}

export default IntroRowImgL;