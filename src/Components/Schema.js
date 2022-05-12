export const err =[]
export default class Schema {
    constructor(param) {
    }

    validate = (param) => {
        for (const key in param) {
            if(param[key].validate()){
                err.push(param[key].message)
            }
        }
    }
}

const firstNameValidator = (value) => {
    return{
        validate : () => {
            return value.length > 3
        }
    }
}

const emailValidator = (value) => {
    return {
        validate : () => {
            return !new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value);
        }
    }
}

const ageValidator = (value) =>{
    return{
        validate : () => {
            return !new RegExp(/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|120)$/).test(value)
        }
    }
}

const passportValidator = (value) => {
    return{
        validate : () => {
            return value.length >= 9
        }
    }
}

const websiteValidator = (value) => {
    return{
        validate : () => {
            return !new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?').test(value)
        }
    }
}

const phoneNumbersValidator = (value) => {
    return{
        validate : () => {
            return Array.isArray(value) && value.every(el=>typeof el==='string')
        }
    }
}

export const schema = new Schema({
    firstName: {
        type: 'string',
        validators: [{min:3},firstNameValidator],
        message: `The field must contain min 3 letters`
    },
    email: {
        type: 'string',
        validators: ['email',emailValidator]
    },
    age: {
        type: 'numeric',
        validators: ['required',ageValidator]
    },
    passport: {
        type: 'string',
        validators: ['max:9', passportValidator],
        message: 'Invalid phone inputs'
    },
    website: {
        type: 'string',
        validators: ['url',websiteValidator]
    },
    phoneNumbers: {
        type: 'array[string]',
        validators: ['phone',phoneNumbersValidator]
    }
});
schema.validate()
