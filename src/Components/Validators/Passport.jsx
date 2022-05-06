import React from 'react';

const Passport = ({name}) => {
    return (
        <input className='f-input' type="text" minLength='7' required name={name} placeholder="passport"/>
    );
};

export default Passport;
