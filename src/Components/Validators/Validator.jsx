import React from 'react';
import Input from './Input'
import Email from './Email'
import Button from './Button'
import Numeric from './Numeric'
import PhoneNumbers from './PhoneNumbers'
import Url from './Url'
import ErrorMessage from './ErrorMessage'
import Passport from "./Passport";

const Validator = () => {
    const passportValidator = (extra, message = 'Default error message') => {
        return {
            validate: () => {
                // returns true/false
            },
            message
        }
    }
    const schema ={
        firstName: {
            type: 'string',
            validators: ['min:3'],
            message: `The field must contain min 5 letters`
        },
        email: {
            type: 'string',
            validators: 'email'
        },
        age: {
            type: 'numeric',
            validators: ['required']
        },
        passport: {
            type: 'string',
            validators: ['max:9', passportValidator],
            message: 'Invalid phone inputs'
        },
        website: {
            type: 'string',
            validators: ['url']
        },
        phoneNumbers: {
            type: 'array[string]',
            validators: 'phone'
        }
};
    return (
        <form>
            <Input name='firstName' onChange={()=>{}} />
            <ErrorMessage errors />
            <Email name='email' onChange={()=>{}} />
            <ErrorMessage errors />
            <Numeric name='age' onChange={()=>{}} />
            <ErrorMessage errors />
            <Passport name='passport' onChange={()=>{}} />
            <ErrorMessage errors />
            <Url name='website' onChange={()=>{}} />
            <ErrorMessage errors />
            <PhoneNumbers name='phoneNumbers' onChange={()=>{}} />
            <ErrorMessage errors />
            <Button type='submit' />
        </form>
    );
};

export default Validator;
