import { useState} from "react";
import InputEmoji from 'react-input-emoji'


const CommentForm = ({
                         handleSubmit,
                         submitLabel,
                         hasCancelButton = false,
                         handleCancel,
                         initialText = "",
                     }) => {

    const [text, setText] = useState(initialText);
    const isTextareaDisabled = text.length === 0;


    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    };

    return (
        <form onSubmit={onSubmit} className='comment-form'>
            <InputEmoji
                value={text}
                onChange={setText}
                cleanOnEnter
                placeholder="Type a message"
            />

            <div className='buttons'>
                <button className="comment-form-button" disabled={isTextareaDisabled}>
                    {submitLabel}
                </button>
                {hasCancelButton && (
                    <button
                        type="button"
                        className="comment-form-button comment-form-cancel-button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default CommentForm;
