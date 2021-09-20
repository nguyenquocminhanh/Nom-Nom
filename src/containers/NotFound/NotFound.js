import React from 'react';
import classes from './NotFound.css'
import {withRouter} from 'react-router-dom';

import Aux from '../../hoc/Auxiliary/Auxiliary'

import {FaFacebook, FaInstagramSquare, FaFacebookMessenger, FaHeart} from 'react-icons/fa';
import {AiFillTwitterCircle} from 'react-icons/ai'

const redirectSocialPage = link => {
    // href: stay at that tab and change new page
    // open new tap and change new page
    window.open(link);
}

const notFound = props => {
    return (
        <Aux>
            <div className={classes.NotFoundContainer}>
                <div className={classes.NotFound}>            
                    <div className={classes.NotFound404}>
                        <h1>404</h1>
                    </div>
                    <h2>Oops! Nothing was found</h2>
                    <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable. <a onClick={() => {props.history.push('/')}}>Return to homepage</a></p>
                    <div className={classes.NotFoundSocial}>
                        <a onClick={() => redirectSocialPage('https://www.facebook.com/anginomnom')}><FaFacebook className={classes.FaceBook}/></a>
                        <a onClick={() => redirectSocialPage('https://www.messenger.com/t/113635626683828')}><FaFacebookMessenger className={classes.Messenger}/></a>
                        <a><FaInstagramSquare className={classes.Instagram}/></a>
                        <a><AiFillTwitterCircle className={classes.Twitter}/></a>
                    </div>
                </div> 
		    </div>
        </Aux>
         
    )
}

export default withRouter(notFound);