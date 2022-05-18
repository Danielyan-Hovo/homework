import React, {Component} from 'react';
import Validator from "./Validator";
import ErrorMessage from "./ErrorMessage";

class FormValidation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors : {
                firstName:'The field must contain min 3 letters',
                email:'Enter a valid email address',
                age:'age is not valid !',
                passport:'Passport max have 9 letters',
                phoneNumbers:'Phone Number is not valid !',
                website:'URL is not valid !'
            },
            values : {}
        }
    }

    setErrors = (arg) => {
        this.setState({errors:{...this.state.errors,arg}})
    }

    handleChange = (event) => {
        event.persist();

        let name = event.target.name;
        let val = event.target.value;
        this.setState({
            values : {...(this.state.values),[name]:val}
        });
    }

    formLogin = () => {
        console.log("Callback function when form is submitted!");
        console.log("Form Values ", this.state.values);
    }

    handleSubmit = (event) => {
        if(event) event.preventDefault();
        if(Object.keys(this.state.errors).length === 0 && Object.keys(this.state.values).length !==0 ){
            this.formLogin();
        } else {
            alert("There is an Error!");
        }
    }

    render() {
        console.log('values',this.state.values)

        return (
            <form onSubmit={event => this.handleSubmit(event)}>
                <Validator name='firstName' type='text' onChange={(event)=>this.handleChange(event)} />
                <ErrorMessage error={this.state.errors.firstName} value={this.state.values.firstName}/>
                <Validator name='email' type='email' onChange={(event)=>this.handleChange(event)} />
                <ErrorMessage error={this.state.errors.email} value={this.state.values.email}/>
                <Validator name='age' type='number' onChange={(event)=>this.handleChange(event)} />
                <ErrorMessage error={this.state.errors.age} value={this.state.values.age}/>
                <Validator name='passport' type='text' onChange={(event)=>this.handleChange(event)} />
                <ErrorMessage error={this.state.errors.passport} value={this.state.values.passport}/>
                <Validator name='website' type='url' onChange={(event)=>this.handleChange(event)}/>
                <ErrorMessage error={this.state.errors.website} value={this.state.values.website} />
                <Validator name='phoneNumbers' type='tel' onChange={(event)=>this.handleChange(event)}/>
                <ErrorMessage error={this.state.errors.phoneNumbers} value={this.state.values.phoneNumbers} />
                <Validator type='submit'  onClick={event => this.handleSubmit(event)} className='submit'/>
            </form>
        );
    }
}

export default FormValidation;
