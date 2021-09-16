import React, {Component} from 'react';

import classes from './Rating.css';

import Star from './Star/Star';

class Rating extends Component {
    render() {
        let status = null;
        switch (this.props.starIsHovered || this.props.starIsPicked) {
            case 1:
                status = 'Awful';
                break;
            case 2:
                status = 'Poor';
                break;
            case 3:
                status = 'Fair';
                break;
            case 4:
                status = 'Good';
                break;
            case 5:
                status = 'Excellent';
                break;
            default: null;
        }

        let rate = (
            <div className={classes.RatingContainer} onMouseOut={this.props.onMouseOutRate}>
                <div className={classes.StarsContainer}>
                    <div 
                        className={classes.Star1}
                        onMouseOver={() => this.props.onHoveredStar(1)}
                        onClick={() => this.props.onPickedStar(1)}>
                            <Star 
                                isBlue={this.props.starIsHovered >= 1 && this.props.starIsHovered !== null ? true : false}
                                isGolden={this.props.starIsPicked >= 1 && this.props.starIsPicked !== null ? true : false}/>
                    </div>
                    <div 
                        className={classes.Star2}
                        onMouseOver={() => this.props.onHoveredStar(2)}
                        onClick={() => this.props.onPickedStar(2)}>
                            <Star
                                isBlue={this.props.starIsHovered >= 2 && this.props.starIsHovered !== null ? true : false}
                                isGolden={this.props.starIsPicked >= 2 && this.props.starIsPicked !== null ? true : false}/>
                    </div>
                    <div 
                        className={classes.Star3}
                        onMouseOver={() => this.props.onHoveredStar(3)}
                        onClick={() => this.props.onPickedStar(3)}>
                            <Star
                                isBlue={this.props.starIsHovered >= 3 && this.props.starIsHovered !== null ? true : false}
                                isGolden={this.props.starIsPicked >= 3 && this.props.starIsPicked !== null ? true : false}/>
                    </div>
                    <div 
                        className={classes.Star4}    
                        onMouseOver={() => this.props.onHoveredStar(4)}
                        onClick={() => this.props.onPickedStar(4)}>
                            <Star
                                isBlue={this.props.starIsHovered >= 4 && this.props.starIsHovered !== null ? true : false}
                                isGolden={this.props.starIsPicked >= 4 && this.props.starIsPicked !== null ? true : false}/>
                    </div>
                    <div 
                        className={classes.Star5}
                        onMouseOver={() => this.props.onHoveredStar(5)}
                        onClick={() => this.props.onPickedStar(5)}>
                            <Star
                                isBlue={this.props.starIsHovered >= 5 && this.props.starIsHovered !== null ? true : false}
                                isGolden={this.props.starIsPicked >= 5 && this.props.starIsPicked !== null ? true : false}/>
                    </div>
                </div>
                <div className={classes.Status}>
                    {status}
                </div>
            </div>
        )

        return (
            rate
        )
    }
}



export default Rating;