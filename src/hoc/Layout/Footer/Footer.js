import React from 'react';
import classes from './Footer.css';
import * as img from '../../../assets/Images/index';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-scroll';

import {Fade} from 'react-awesome-reveal';
import {FaFacebook, FaInstagramSquare, FaFacebookMessenger, FaHeart} from 'react-icons/fa';
import {AiFillTwitterCircle, AiFillPhone, AiOutlineMail, AiFillSkype, AiOutlineCopyrightCircle} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go';

const footer = props => {

    const redirectSocialPage = link => {
        // href: stay at that tab and change new page
        // open new tap and change new page
        window.open(link);
    }

    const ScrollToElement = (elementHash) => {
        // if (props.history.location.pathname !== '/') {
        //     switch(elementHash) {
        //         case '#about-us':
        //             // pass Hash to Intro when currently at the other component
        //             props.history.push('/' + elementHash);
        //             break;
        //         default:
        //             return;
        //     }
        // }
        // else {
        //     switch(elementHash) {
        //         case '#about-us':
        //             // just need to focus on the target element
        //             props.refProps[0].current.scrollIntoView();
        //             break;
        //         default:
        //             return;
        //     }
        // }
    }

    return (
        <div className={classes.Footer}>
            <div className={classes.Content}>
                <div className={classes.About}>
                    <p className={classes.Type}>
                        <img src={img.logo}/>
                    </p>

                    <p className={classes.AboutInfo}>At Nom Nom, we believe your meal is more than just a menu – its an experience. We have a team that turns our great spaces and impressive menus into amazing memories for your whole party.</p>
                    <p className={classes.AboutInfo}>Sincerely,</p>
                    <p className={classes.AboutInfo}>Our Team!</p>
                </div>

                <div className={classes.Links}>
                    <p className={classes.Type}>Links</p>

                    <p className={classes.LinksInfo}>
                    {/* <p className={classes.LinksInfo} onClick={() => ScrollToElement('#about-us')}> */}
                        <a className={classes.Highlight}>
                            About Us
                        </a>
                    </p>
                    <p className={classes.LinksInfo}>
                        <a onClick={() => {props.history.push('/menu')}} className={classes.Highlight}>Menu</a>
                    </p>
                    <p className={classes.LinksInfo}>
                        <a className={classes.Highlight}>Open Hours & Location</a>
                    </p>
                    <p className={classes.LinksInfo}>
                        <a className={classes.Highlight}>Sign In</a>
                    </p>
                    <p className={classes.LinksInfo}>
                        <a className={classes.Highlight}>Sign Up</a>
                    </p>
                </div>

                <div className={classes.Contact}>
                    <p className={classes.Type}>Contact</p>

                    <p className={classes.ContactInfo}><GoLocation style={{marginRight: '5px'}}/>
                        <a onClick={() => redirectSocialPage("http://maps.google.com/?q=Dorchester Ave, Boston, MA, 02124")} className={classes.Highlight}>Dorchester Ave, Boston, MA 02124, USA</a>
                    </p>
                    <p className={classes.ContactInfo}><AiFillPhone style={{marginRight: '6px'}}/>       
                        <a href="tel: 8572694891" className={classes.Highlight}>857-269-4891</a>
                    </p>
                    <p className={classes.ContactInfo}><AiOutlineMail style={{marginRight: '6px'}}/>
                        <a className={classes.Highlight} 
                            href="mailto: minhanh.nguyenquoc@gmail.com">
                                minhanh.nguyenquoc @gmail.com
                        </a>
                    </p>
                    <p className={classes.ContactInfo}><AiFillSkype style={{marginRight: '6px'}}/>
                        <a className={classes.Highlight}>Nguyen Quoc Minh Anh</a>
                    </p>
                </div>

                <div className={classes.Follow}>
                    <p className={classes.Type}>Folow Us</p>

                    <p onClick={() => redirectSocialPage('https://www.facebook.com/anginomnom')}><FaFacebook className={classes.FaceBook}/></p>
                    <p onClick={() => redirectSocialPage('https://www.messenger.com/t/113635626683828')}><FaFacebookMessenger className={classes.Messenger}/></p>
                    <p><FaInstagramSquare className={classes.Instagram}/></p>
                    <p><AiFillTwitterCircle className={classes.Twitter}/></p>
                </div>
            </div>

            <div>
                <img src={img.footer3}/>
            </div>

            <div className={classes.CopyRight}>
                <Fade direction="up" duration="2000"> 
                    <p style={{textAlign: 'center'}}>Made in Boston with<FaHeart style={{color: 'red', fontSize: '110%', marginLeft: '5px'}}/></p>
                    <p style={{textAlign: 'center'}}><AiOutlineCopyrightCircle/> 2021 Copyright: nomnom</p>
                </Fade>
            </div>

        </div>
    )
}

export default withRouter(footer);