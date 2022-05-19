import React, {memo} from 'react'

const TitleActionBar =  memo(props => {
    const { task, Actions, dispatch } = props
    return (
        <div className="tool-label">
            <div className="form_field_type">
                {task.textToShow}
            </div>

            <label>
                {task.required && <span className="required">*</span>}
                {task.placeHolderLabel}
            </label>

            <ul className="tool-actions">
                <li onClick={() => { Actions.editFieldData(dispatch, task.uniqId) }}>Edit</li>
                <li onClick={() => { Actions.deleteFieldData(dispatch, task.uniqId) }}>Delete</li>
            </ul>
        </div>
    )
})

export default TitleActionBar
