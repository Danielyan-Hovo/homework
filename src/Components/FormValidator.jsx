import useForm from './useForm';

function FormValidator() {

    //Final submit function
    const formLogin = () => {

        console.log("Callback function when form is submitted!");
        console.log("Form Values ", values);
    }

    const {handleChange, values,errors,handleSubmit} = useForm(formLogin);


    return (
        <div className="form-container">
            <h1 style={{paddingRight:'10rem'}}>Validation Form</h1>
            <form className='form' onSubmit={handleSubmit}>
                <input className='f-input' type="email" name="email" placeholder="E-mail"  onChange={handleChange}   />
                {
                    errors.email && <h3 style={{color:'red'}}>{errors.email}</h3>
                }
                <input className='f-input' minLength='8' type="password" name="password" placeholder="password"  onChange={handleChange}   />
                {
                    errors.password && <h3 style={{color:'red'}}>{errors.password}</h3>

                }
                <input className='f-input' type="text" minLength='5' required name="username" placeholder="username"  onChange={handleChange}   />
                {
                    errors.username && <h3 style={{color:'red'}}>{errors.username}</h3>
                }
                <input className='f-input' type="number" minLength='1' required name="age" placeholder="age"  onChange={handleChange}   />
                {
                    errors.age && <h3 style={{color:'red'}}>{errors.age}</h3>
                }
                <input className='f-input' type="url" minLength='6' required name="url" placeholder="url"  onChange={handleChange}   />
                {
                    errors.url && <h3 style={{color:'red'}}>{errors.url}</h3>
                }
                <input className='f-input' type="tel" minLength='9' required name="phoneNumbers" placeholder="Phone Numbers"  onChange={handleChange}   />
                {
                    errors.phoneNumbers && <h3 style={{color:'red'}}>{errors.phoneNumbers}</h3>
                }
                <input type="submit" value="Submit" className="submit"  />
            </form>

        </div>
    );
}

export default FormValidator;
