import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import classes from './Intro.css';

// import Components
import Layout from '../../hoc/Layout/Layout';
import SlidesShow from '../../components/UI/SlidesShow/SlidesShow';
import DecoButton from '../../components/UI/Button/DecoButton/DecoButton';
import CircleButton from '../../components/UI/Button/CircleButton/CircleButton';
import UpArrorButton from '../../components/UI/Button/UpArrorButton/UpArrowButton';
import Loading from '../../components/Loading/Loading';
import IntroRowImgL from './IntroRowImgL/IntroRowImgL';
import IntroRowImgR from './IntroRowImgR/IntroRowImgR';
import Carousel from '../../components/Carousel/Carousel';

// import img
import * as img from '../../assets/Images/index';
import {cacheImages} from '../../shared/utility';

// import external
import {FaHandPointRight} from 'react-icons/fa';
import * as Scroll from 'react-scroll';
// import {Link} from 'react-scroll';
import {Fade, Slide, AttentionSeeker, Zoom} from "react-awesome-reveal";

class Intro extends Component {
    state = {
        isShowingChef: false,
        imgs: [
            {url: img.slogan, caption: 'Vietnamese Foods'},
            {url: img.slide3, caption: 'Bánh Xèo'}, 
            {url: img.banner, caption: 'Popular Vietnamese Dishes'},
            {url: img.slide2, caption: 'Signature Meal - Pho'},
            {url: img.slide4, caption: 'Bánh Da Lợn'},
            {url: img.slide1, caption: 'Chè'},
            {url: img.slide5, caption: 'Bún Đậu Mắm Tôm'}
        ],
        // Images are loaded?
        isLoaded: false,
    }

    aboutUs = React.createRef();
    
    isShowingChefHandle = () => {
        this.setState(prevState => ({
            isShowingChef: !prevState.isShowingChef
        }))
    }

    cacheImagesHandler = async (srcArray) => {
        // Utility
        await cacheImages(srcArray);
        // wait fir cacheImages finish then setState
        setTimeout(() => {
            this.setState({
                isLoaded: true
            })
        }, 2000)
    }
    
    componentDidMount = () => {
        const imgs = ([...this.state.imgs].map(img => img.url)).concat(img.gif);
        this.cacheImagesHandler(imgs);
    }

    componentDidUpdate = (prevProps, prevState) => {
        // loaded finished, focussing n the target
        if(this.state.isLoaded !== prevState.isLoaded && this.state.isLoaded===true) {
            switch(this.props.history.location.hash) {
                case '#about-us':
                    if(this.state.isLoaded) {
                        this.aboutUs.current.scrollIntoView();
                    }
                    break;
                    
                default:
                    return;
            }
        }
    }
 
    render() {
        let headChefInfo = this.state.isShowingChef ? 
        (
            <IntroRowImgR
            backgroundImageRight={[img.chef]} 
            numberNbsp={10}>
                <div className={classes.Chef}>
                    <Fade direction={'up'} duration={2500}>
                        <p className={classes.Topic}>Kim Vo</p>
                        <p>Kim Vo is the Vietnamese Head Chef of our restaurant. She was born in Saigon (Vietnam) since 1950s, and she had to be independent early in everything especially in cooking to feed herself and her sisters when she was just 15 years old. So her Vietnamese's food tast is pretty excellent.</p>
                        <p>She has a passion on cooking and researching new Vietnamese food to catch up with the lattest eating trends. For her, the kitchen is like the studio for a painter. She loves her kitchen, she loves her ingredients and she loves Vietnamese food. </p>
                        <p>She has 50-year experience in cooking Vietnamese food. She makes the best Vietnamese food. When she decides to conquer a dish, she is so persistent and so creative that we always say she should have been a scientist. </p>          
                    </Fade>
                </div>
            </IntroRowImgR>
        ) : null;
        
        return (
            <Layout refProps={[this.aboutUs]}>  
                {this.state.isLoaded ?     
                <div className={classes.IntroWrap}> 
                    {/* <UpArrorButton UpArrowButtonClicked={() => {Scroll.animateScroll.scrollToTop()}}></UpArrorButton> */}
                    {/* Circle Button at corner right */}
                    <CircleButton circleButtonClicked={() => {this.props.history.push('/menu')}}>Order Now</CircleButton>

                    {/* Banner */}
                    <Fade duration="2800">
                        <div className={classes.Banner}>             
                            <img src={img.gif}/>  
                            
                            {/* Title */}
                            <div className={classes.RestaurantName}>
                                <p>Welcome to Ăn Gì Nom Nom</p>
                            </div>

                            <button onClick={() => this.props.history.push('/menu')}>
                                <span>Our Menu</span>
                            </button>  
                        </div>
                    </Fade>

                    {/*Advertisments */}
                    <div className={classes.Ads} onClick={() => {this.props.history.push('/menu')}}>
                        <span>Pickup / Delivery Only. Order Here!</span>
                    </div>
                   
                    {/* Title */}
                    <div className={classes.Title}>  
                        <AttentionSeeker>
                            <p>We Only Serve Delicious Vietnamese Foods in Boston</p>  
                        </AttentionSeeker>
                    </div>

                    {/* SlidesShow */}
                    <Fade duration="2000" triggerOnce>
                        <SlidesShow imgs={this.state.imgs}/>
                    </Fade>
                    {/* Chef */}
                    <div className={classes.ToggleButton}>
                        <DecoButton buttonClicked={this.isShowingChefHandle}><span><FaHandPointRight/> About Our Chef</span></DecoButton>
                    </div>
                    
                    <p style={{margin: '0'}}>&nbsp;</p>
                    
                    <Fade duration="2000">
                        <div className={classes.Ads}>
                            <span>Click Button To See Details About Our Chef</span>
                        </div>
                    </Fade>

                    {/* <p style={{margin: '0'}}>&nbsp;</p> */}

                    {headChefInfo}
                    
                    {/* Intro Content */}
                    <IntroRowImgL 
                        backgroundImageLeft={[img.workinghours]} 
                        numberNbsp={10}>
                            <Zoom direction={'up'} duration={2000}>
                                <div className={[classes.WorkingHours]}>
                                    <p>&nbsp;</p>
                                    <p className={classes.Topic}>Hours (Pickup & Delivery only)</p>
                                    <p>Monday - Friday | 5:00PM - 8:30PM</p>
            
                                    <p>Saturday & Sunday | 10:AM - 4:00PM</p>
                           
                                    <p className={classes.Topic}>Location</p>
                                    <a onClick={() => window.open("http://maps.google.com/?q=Dorchester Ave, Boston, MA, 02124")} className={classes.Hover}>Dorchester Ave, Boston, MA, 02124, USA</a>
                                    <p className={classes.Topic}>Call Us</p>
                                    <a href="tel: 8572694891">(857) 269-4891</a>
                                    <p>&nbsp;</p>
                                </div>
                            </Zoom>
                    </IntroRowImgL>

                    <IntroRowImgR
                        backgroundImageRight={[img.whatmakesspecial, img.whatmakesspecial2, img.whatmakesspecial3]}
                        numberNbsp={15}>
                            <div className={classes.SpecialFoodVN}>
                                <Fade direction={'left'} duration={2500}>
                                    <p className={classes.Topic}>What makes Vietnamese food special?</p>
                                    <p>Fresh. Invigorating. Fragrant. Sweet. Sour. Fermented. These are all adjectives people might use to describe Vietnamese cooking. The perfect balance of opposites within a dish that really makes each ingredient sing.</p>
                                    <p>It’s light and fresh. The cooking in Vietnam is done with minimal use of oil and dairy and relies more on the light, fresh flavours of herbs and vegetables.</p>
                                    <p>There’s a French Flair. Although it has been more than six decades since the end of French colonial rule in Vietnam, you can still taste the French culture in every fluffy baguette.</p>
                                    <p>Soups are clear. In Phở, the simple tastes of the principal ingredients is showcased. You can taste every element distinctly, from the cilantro to the lemongrass to the long-simmered beef bones and the fish sauce in Phở - The Vietnamese signature dish.</p>
                                </Fade> 
                            </div>  
                    </IntroRowImgR>

                    <IntroRowImgL 
                        backgroundImageLeft={[img.saigonxua2,img.saigonxua, img.saigonxua3]} 
                        numberNbsp={16}>
                            <div className={classes.VietnamPeople}>
                                <Fade direction={'right'} duration={2500}>
                                    <p className={classes.Topic}>Vietnamese People</p>
                                    <p>The Vietnamese people are friendly and hospitable. The most common denominator among them is that they love to smile and are genuinely interested in getting to know their foreign visitors.</p>
                                    <p>Vietnamese people commonly show a great love for knowledge and learning which is one of the greatest Vietnamese’s characteristics. They are also smart and have quick understanding.</p>
                                    <p>It’s true that Vietnamese people like joking around, sarcasm and puns. Vietnam cultures may have different ideas of what is actually funny, it depends on the regions that you travel to.</p>
                                </Fade>
                            </div>
                    </IntroRowImgL>

                    <IntroRowImgR
                        backgroundImageRight={[img.specialdish1, img.dalon, img.specialdish3, img.specialdish2]}
                        numberNbsp={15}
                        options={[
                            "In Boston, we may not be able to travel to Vietnam, but a great way to get a taste of a Vietnamese's culture is to sample its signature dishes. Try discovering our menu in your own website – inform us to know your great desired dish - and let your taste buds set sail on a culinary adventure across the country Vietnam. Here are our popular dishes you shouldn't miss!",
                            "Bánh Da Lợn or Bánh Da Heo (Pig Skin Cake) is a Vietnamese steamed layer cake made from tapioca starch, rice flour, mashed mung beans, taro, or durian, coconut milk and/or water, and sugar. It is sweet and gelatinously soft in texture, with thin (approximately 1 cm) colored layers alternating with layers of mung bean, durian, or taro filling. Enjoy!",
                            "Bánh Khoai Mì (Cassava Cake) is a Vietnamese cake made from grated cassava, sugar, coconut milk, and a small amount of salt. Bánh khoai mì has a great aroma filled with sweet and buttery tones from the cassava and coconut mix, it has a chewy consistency and the brown crust is to die for. Cut the cake into small pieces and enjoy as finger-food. Enjoy!",
                            "Chả Giò (or Nem Rán in the North) (Fried Spring Roll) is a popular dish in Vietnamese cuisine and usually served as an appetizer in Europe and North America, where there are large Vietnamese diaspora. The main ingredients of a roll of “chả giò” are commonly seasonal ground meat, mushrooms, and diced vegetables such as carrots and jicama, rolled up in a sheet of moist rice paper. Enjoy!"
                            ]}>
                            <div className={classes.SpecialDish}>
                                <Fade direction={'left'} duration={2500}>
                                    <p className={classes.Topic}>Our Special Dishes</p>
                                </Fade>
                            </div>
                    </IntroRowImgR>

                    <IntroRowImgL 
                        backgroundImageLeft={[img.aboutus]} 
                        numberNbsp={10}>
                            <div  className={classes.AboutUs}>
                                <Fade direction={'up'} duration={2500}>
                                    <p className={classes.Topic}>About Us</p>
                                    <p>We love Vietnamese food as much as you do. That’s why we’ve been helping them filled in our special menu. Whenever you’re browsing for a quick bite or planning a big night, <span style={{fontStyle: 'italic', fontWeight: '600'}}>Ăn Gì Nom Nom</span> will help you discover the perfect enjoying experience!</p>
                                    <p>Sincerely,</p>
                                    <p>Our Team!</p>
                                </Fade>
                            </div>
                    </IntroRowImgL>

                    <div className={classes.Title}>
                        <AttentionSeeker>
                            <p>Our Gallery</p>
                        </AttentionSeeker>
                    </div>

                    <Carousel 
                        imageCardClicked={this.imageCardClickedHandler}
                        src={[img.dalon, img.banhbo, img.specialdish3, img.goi, img.cuon, img.banhbotloc, img.banhuot, img.raucau, img.mixbrown, img.mixraucau, img.mixdrinks, img.che]}
                    />

                    <div className={classes.Title} style={{fontStyle: 'italic'}}>
                        <Fade direction={'up'} duration={4000} triggerOnce>
                            <p>Thank you and have a good meal!</p>
                        </Fade>
                    </div>
                 
                </div>
                : (<div className={classes.LazyLoading}>
                    <img src={img.logoGif} alt="Lazy Loading..."/>
                </div>)}
            </Layout>
        )
    }
}

export default withRouter(Intro);