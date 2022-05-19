import React, { memo } from 'react'
import FormElement from './FormElement'
const PreviewPopup = memo(props => {
    const { tasksToDisplay, grouped, Actions, dispatch } = props
    return (
        <div>
            <div className="popup-container">
                <div className="popup-inner">
                    <span onClick={() => { Actions.togglePreviewPopup(dispatch, false ) }} className="popup-close"  > X </span>
                    <h3>Preview Form</h3>
                    <div>
                        {tasksToDisplay.map((task, index) =>
                            <div key={index} className="tools-dropped-area preview-area" >

                                <div className="tools-dropped-item">
                                    <div className="form_field_type">{task.textToShow}</div>
                                    <label>
                                        {task.required && <span className="required">*</span>}
                                        {task.placeHolderLabel}
                                    </label>

                                    {(task.fieldtype === 'heading' && grouped[task.uniqId]) &&
                                        grouped[task.uniqId].map((task, index) =>
                                            <div
                                                key={index}
                                                className="tools-dropped-item-inner"
                                            >
                                                <div className="form_field_type">{task.textToShow}</div>
                                                <label>
                                                    {task.required && <span className="required">*</span>}
                                                    {task.placeHolderLabel}
                                                </label>

                                                <FormElement
                                                    task={task}
                                                    index={index}
                                                    Actions={Actions}
                                                    dispatch={dispatch} />
                                            </div>
                                        )
                                    }

                                    <FormElement
                                        task={task}
                                        index={index}
                                        Actions={Actions}
                                        dispatch={dispatch} />

                                </div>
                            </div>
                        )}

                        <div className="buttons-grp">
                            <button className="done"
                                    onClick={() => {
                                        Actions.generateFinalJSON(dispatch, grouped )
                                        Actions.togglePreviewPopup(dispatch, false )
                                    }}
                            >Generate JSON</button>

                            <button  className="cancel"
                                     onClick={() => {Actions.togglePreviewPopup(dispatch, false )}}
                            >Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
})
export default PreviewPopup
