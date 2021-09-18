import React from 'react';
import classes from './Modal.css'

import CloseButton from '../../UI/Button/CloseButton/CloseButon';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary'

const modal = props => {
    return (
        <Aux>
        {/* Backdrop should be located parallel with Modal */}
             {/*When Backdrop is clicked, 
            isPicking in global store is set to FALSE*/}
            <Backdrop 
                show={props.show} 
                backdropClicked={props.backdropClicked}
            />
        
            {/* Modal */}
            <div 
                key={props.modalType}
                className={classes.Modal}
                style={{   
                    // if show-isPicking is TRUE, Modal appears
                    // else Modal disappears
                    transform: props.show ? 'translate(-50%, -50%)' : 'translate(-50%, -250%)',

                    opacity: props.show? '1': '0'
                }}
            >    
                {/* // Close Button */}
                {props.closeButtonExist ? 
                <CloseButton 
                    show={props.show}
                    onCancelRequest={props.closeOrderRequest}/> : null}
                
                {props.children}
            </div>
        </Aux>
    )
};

export default modal;
