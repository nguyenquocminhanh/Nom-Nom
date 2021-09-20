import React, {Component} from 'react';
import classes from './Carousel.css'
import * as imgs from '../../assets/Images/index';
import ModalImages from '../UI/ModalImages/ModalImages';

class Carousel extends Component {
    state = {
        src: this.props.src,
        isModalImageShow: false,
        id: 0,
        isPrevHidden: false,
        isNextHidden: false
    }
    myRef = React.createRef();

    prevClicked = () => {
        const slide = this.myRef.current;
        slide.scrollLeft -= slide.offsetWidth;
        if (slide.scrollLeft <= 0) {
            slide.scrollLeft = slide.scrollWidth
        }
    }

    nextClicked = () => {
        const slide = this.myRef.current;
        slide.scrollLeft += slide.offsetWidth;
        if (slide.scrollLeft >= (slide.scrollWidth - slide.offsetWidth)) {
            slide.scrollLeft = 0;
        }
    }

    // modal images handler
    imageCardClickedHandler = (index) => {
        this.setState({
            isModalImageShow: true,
            id: index
        })
    }

    closeClickedHandler = () => {
        this.setState({
            isModalImageShow: false
        })
    }

    prevImageClikedHandler = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                id: prevState.id - 1
            }
        })
    }

    nextImageClikedHandler = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                id: prevState.id + 1
            }
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.state.id !== prevState.id) {
            if (this.state.id === 0 && this.state.isPrevHidden === false) {
                this.setState({
                    isPrevHidden: true
                })
            }
            else if(this.state.id === this.state.src.length - 1 && this.state.isNextHidden === false) {
                this.setState({
                    isNextHidden: true
                })
            }
            else {
                this.setState({
                    isPrevHidden: false,
                    isNextHidden: false
                })
            }
        }
    }

    render() {
        let modalImage = this.state.isModalImageShow? 
            
            <ModalImages 
                src={this.props.src[this.state.id].srcImg} 
                closeClicked={this.closeClickedHandler}
                isPrevHidden={this.state.isPrevHidden}
                isNextHidden={this.state.isNextHidden}
                prevImageCliked={this.prevImageClikedHandler}
                nextImageCliked={this.nextImageClikedHandler}
            /> 
            : null;
            
        return (
            <div className={classes.CarouselWrap}>
                {/* Modal Image   */}
                {modalImage}

                <div className={classes.Carousel} ref={this.myRef}> 
                    {this.state.src.map((item, index) => {
                        return <div className={classes.Card} onClick={() => this.imageCardClickedHandler(index)}>
                            <img src={item.srcImg}/>
                            <div className={classes.OverLay}>
                                <p>Discover More</p>
                                <p>{item.name}</p>
                            </div>
                        </div>
                    })}
                </div>

                {/* 2 buttons */}
                <div onClick={this.prevClicked} className={classes.Prev}>
                    <img src={imgs.prev} alt=""/>
                </div>
                <div onClick={this.nextClicked} className={classes.Next}>
                    <img src={imgs.next} alt=""/>
                </div>
                
            </div>
        )
    }   
}

export default Carousel;