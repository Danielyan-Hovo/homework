import React, {Component} from 'react';
import InputEmoji from 'react-input-emoji'


class CommentForm extends Component {
    constructor(props) {
        super(props);
        console.log('CommentsForm')
        this.state = {
            text : this.props.initialText,
        }
    }
    isTextareaDisabled = this.state.text.length === 0;

    onSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state.text);
        this.setState({text : "" });
    };

    render() {
        console.log('CommentsForm')
        return (
            <form onSubmit={this.onSubmit} className='form'>
                <InputEmoji
                    value={this.state.text}
                    onChange={this.setText}
                    cleanOnEnter
                    placeholder="Type a message"
                />


                <div className='buttons'>
                    <button className="comment-form-button" disabled={this.isTextareaDisabled}>
                        {this.props.submitLabel}
                    </button>
                    {this.props.hasCancelButton && (
                        <button
                            type="button"
                            className="comment-form-button comment-form-cancel-button"
                            onClick={this.props.handleCancel}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        );
    }
}

CommentForm.defaultProps = {
    hasCancelButton : false,
    initialText : "",
}

export default CommentForm;


