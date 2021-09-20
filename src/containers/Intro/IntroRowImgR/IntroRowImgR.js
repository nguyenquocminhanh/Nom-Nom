import React, {Component} from 'react';

import classes from './IntroRowImgR.css';
import {Fade, Zoom} from 'react-awesome-reveal';

class IntroRowImgR extends Component {
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
        if (this.props.backgroundImageRight.length > 1) {
            dots = (
                <div className={classes.Dots}>
                    {this.props.backgroundImageRight.map((img, index) => {
                        return <span   
                            className={this.state.currenBackGroundImageIdex === index ? [classes.Dot, classes.Active].join(' ') : [classes.Dot]}
                            onClick={() => this.dotClicked(index)}></span>
                    })}
                </div>
            )
        }

        return (
            <div className={classes.IntroRowImgRWrap}>
                <div className={classes.IntroRow}>
                    <div className={classes.LeftColumnWrap}>
                        <div className={classes.LeftColumn}>   
                            {this.props.options? <p className={classes.Nbsp}>&nbsp;</p> : null}     

                            {this.props.children}   

                            {this.props.options ?
                                <div className={classes.Paragraph}>
                                    <Fade direction={'left'} duration={2500}>
                                        <p style={{margin: '0'}}>{this.props.options[this.state.currenBackGroundImageIdex]}</p>
                                    </Fade>
                                </div>
                                : null
                            }

                        </div>
                    </div>

                    <div className={classes.RightColumnWrap}>
                        <Zoom duration={2500} triggerOnce style={{height: '100%'}}>
                            <div className={classes.RightColumn}
                                style={{
                                    backgroundImage: `url(${this.props.backgroundImageRight[this.state.currenBackGroundImageIdex]})`,
                                    backgroundPosition: 'center center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}> 
                                    <div className={classes.NonBreakingSpace}>
                                        {emptyLines}
                                    </div>
                            </div>
                            {dots}
                        </Zoom>
                    </div>
                </div>
            </div>
        )
    }
}

export default IntroRowImgR;
