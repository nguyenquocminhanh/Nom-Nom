import React, {Component} from 'react';
import classes from './EditedDetail.css';
import {connect} from 'react-redux';

import {changeDateFormat} from '../../../shared/utility';
import {AiFillEdit} from 'react-icons/ai';

import Input from './Input/Input';

class EditedDetail extends Component {
    state = {
        isInput: false
    }

    detailClickedHandler = () => {
        this.setState({
            isInput: true
        })
    }

    inputFocusOutHandler = () => {
        if (this.props.type === 'date') {
            this.setState({
                isInput: false
            })
        }
        else {   
            if (this.props.valid) {
                this.setState({
                    isInput: false
                })
            }
        }
        return;
    }

    componentDidMount = () => {
        if (this.props.valid && !this.props.isDetailChanged) {
            this.setState({
                isInput: false
            })
        }
    }

    render() {
        let element = this.state.isInput && !this.props.isRadio ? 
        <Input
            type={this.props.type}
            required={this.props.required}
            inputValueChanged={this.props.inputValueChanged}
            value={this.props.value}
            valid={this.props.valid}
            touched={this.props.touched}
            identifier={this.props.identifier}
            inputType={this.props.inputType}
            inputFocusOut={this.inputFocusOutHandler}
            isDateType={this.props.isDateType}
            isValueChanged={this.props.isValueChanged}>
        </Input>  : this.state.isInput && this.props.isRadio ?
        
        (<div onChange={this.props.onRadioChangeValue} className={classes.RadioInput}> 
            {/* name property puts all the radio buttons into a group, you can get the value once the user selects any of them */}
            {this.props.radioArr.map(radio => {
                return <span style={{textTransform: 'capitalize'}}>
                        <input 
                            key={radio} 
                            type="radio" 
                            value={radio} 
                            name={this.props.radioName} 
                            checked={this.props.isChecked === radio ? true : false}/>
                        {radio}&nbsp;
                    </span>
            })}
        </div>) : 
        
        <p className={classes.Content} onClick={() => this.detailClickedHandler()} style={{textTransform: this.props.isCapitalize ? 'capitalize' : 'none'}}>
            {this.props.isDateType ? changeDateFormat(this.props.detail) : this.props.detail}
            <AiFillEdit className={classes.EditIcon} style={{right: this.props.isRadio ? '25%' : '0'}}/>
        </p>

        return (
            element
        )
    }
}

const mapStateToProps = state => {
    return {
        firstName: state.users.firstName,
        lastName: state.users.lastName,
        gender: state.users.gender,
        dob: state.users.dob,

        street: state.users.street,
        apt: state.users.apt,
        city: state.users.city,
        state: state.users.state,
        zipcode: state.users.zipcode,

        email: state.users.email,
        phone: state.users.phone
    }
}

export default connect(mapStateToProps, null)(EditedDetail);