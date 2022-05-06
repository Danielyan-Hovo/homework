import React from 'react';

const PhoneNumbers = () => {
    return (
        <input className='f-input' type="tel" minLength='9' required name="phoneNumbers" placeholder="Phone Numbers"/>
    );
};

export default PhoneNumbers;
