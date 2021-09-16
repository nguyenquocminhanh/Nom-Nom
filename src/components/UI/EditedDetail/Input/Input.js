import React from 'react';
import classes from './Input.css';
import {valid, invalid} from '../../../../assets/Images/index';

// Error Message Below input
const errorMessageHandler = (valid, touched, value, type) => {
    if (!valid && touched) {
        if (value.length < 1) {
            return <p className={classes.ErrorMessage}>Enter your {type}</p>
        }
        else {
            return <p className={classes.ErrorMessage}>Check your {type}</p>
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
    if (props.touched && props.valid && props.value != '') {
        icon = (<span className={classes.Icon}>
            <img src={valid}/>
        </span>)
    }
    if (props.isDateType || !props.isValueChanged) {
        icon = null
    }

    let inputElement = null;

    switch (props.inputType) {
        case ('input'):
            inputElement = <div className={classes.Input}>
                    {/* Input */}
                    <input 
                        spellCheck={false}
                        autoFocus
                        type={props.type}
                        onChange={props.inputValueChanged}
                        onFocus={props.inputFocusing}
                        onBlur={props.inputFocusOut}
                        value={props.value}
                        minLength={props.minLength}
                        maxLength={props.maxLength}
                        required={props.required}
                        readOnly={props.readOnly}
                        // error
                        style={{borderBottom: (!props.valid && props.touched && props.isValueChanged) ? '2px solid #e32b2b' : (props.valid && props.touched && props.value != '' && props.isValueChanged) ? '2px solid #0a5' : '2px solid lightgrey'}}
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