import React, {Component} from 'react';

class ErrorMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {!this.props.value&&(
                    <h3 className='error'>{this.props.error}</h3>)
                }
            </div>
        );
    }
}

export default ErrorMessage;
