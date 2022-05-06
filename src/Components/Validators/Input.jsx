import React from 'react';

const Input = () => {
    return (
        <input className='f-input' type="text" minLength='5' required name="username" placeholder="username"  />
    );
};

export default Input;
