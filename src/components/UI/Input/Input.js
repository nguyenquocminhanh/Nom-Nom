import React from 'react';
import classes from './Input.css';
import {valid, invalid} from '../../../assets/Images/index';

// Error Message Below input
const errorMessageHandler = (valid, touched, value, type) => {
    if (!valid && touched) {
        if (value.length < 1) {
            return <p className={classes.ErrorMessage}>Please enter your {type}.</p>
        }
        else {
            return <p className={classes.ErrorMessage}>Please check your {type}.</p>
        }
    }
    return null;
}

const input = props => {
    let icon = null;
    if (props.touched && !props.valid) {
        icon = (<span className={classes.Icon}>
                    <img src={invalid}/>
                </span>)
    }
    if (props.valid) {
        icon = (<span className={classes.Icon}>
            <img src={valid}/>
        </span>)
    }

    let inputElement = null;

    switch (props.inputType) {
        case ('input'):
            inputElement = <div className={classes.Input}>
                    {/* Input */}
                    <input 
                        spellCheck={false}
                        type={props.type}
                        onChange={props.inputValueChanged}
                        onFocus={props.inputFocusing}
                        value={props.value}
                        maxLength={props.maxLength}
                        required={props.required}
                        readOnly={props.readOnly}
                        // error
                        style={{borderBottomColor: (!props.valid && props.touched) ? '#e32b2b': (props.valid) ? '#0a5' : 'none', borderBottomWidth: props.valid || props.touched ? '2px' : '1px'}}
                    />

                    {/* Place Holder */}
                    <div className={classes.PlaceHolder}>
                        {props.children}
                    </div>

                    {/* Error Message */}
                    {errorMessageHandler(props.valid, props.touched, props.value, props.identifier)}
                    
                    {/* Icon */}
                    {icon}
                </div>
            break;
        case ('textarea'):
            inputElement = <span className={classes.TextArea}>
                    <textarea 
                        spellCheck={false}
                        onChange={props.textareaValueChanged}
                        value={props.value}
                        placeholder={props.placeHolder}
                        rows={props.rows}
                    />                   
                </span>;
            break;
        default:
            inputElement = <input {...props}/>;
    }

    return (
        inputElement
    )
}

export default input;