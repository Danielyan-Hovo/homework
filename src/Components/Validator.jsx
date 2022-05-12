import React, {Component} from 'react';

class Validator extends Component {
    constructor(props) {
        super(props);
    }

    placeholder(name){
        switch (name){
            case 'firstName':
                return 'e.g. Ashot Ashotyan';
            case 'email':
                return 'e.g. name.surname@gmail.com';
            case 'age':
                return 'e.g. 20';
            case 'passport':
                return 'e.g. AM043828';
            case 'website':
                return 'e.g. https://www.google.com/';
            case 'phoneNumbers':
                return 'e.g. 077-123-123';
        }
    }

    render() {
        if(this.props.type!=='submit'){
            return (
                <div className='page'>
                    <label className='field field_v1'>

                        <input name={this.props.name} type={this.props.type} className='field__input' placeholder={this.placeholder(this.props.name)} onChange={this.props.onChange} />
                        <span className="field__label-wrap">
                        <span  className="field__label">{this.props.name}</span>
                    </span>
                    </label>
                </div>
            );
        } else {
            return (
                <div className='div-submit'>
                    <input type='submit' value='send' className='submit' onClick={this.props.onClick} />
                </div>
            )
        }

    }
}

export default Validator;
