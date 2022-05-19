import React from 'react'
import * as Actions from "../../actions"
import { useStateValue, useDispatch } from "../../store/configureStore"

function PopupInfo() {
    const { formBuilder } = useStateValue()
    const dispatch = useDispatch()
    const { tasks, popupShow, popupData } = formBuilder

    return (
        <>
            {popupShow &&
                <div className="popup-container">
                    <div className="popup-inner">
                        <span onClick={() => { Actions.closePopup(dispatch) }} className="popup-close"  > X </span>
                        <h2 className="popup-header">{popupData.textToShow} Editor</h2>
                        <div className="popform">

                            <label>Label Name : </label>
                            <input type="text"
                                   value={popupData.placeHolderLabel}
                                   onChange={(e) => { Actions.updatePopupData(dispatch, "placeHolderLabel", e.target.value) }}
                            />

                            {(popupData.fieldtype === 'heading') &&
                                <>
                                    <label>Object Key/Name : </label>
                                    <input type="text"
                                           value={popupData.name}
                                           onChange={(e) => { Actions.updatePopupData(dispatch, "name", e.target.value) }}
                                    />
                                </>
                            }

                            {(popupData.fieldtype === 'input' || popupData.fieldtype === 'numberinput' || popupData.fieldtype === 'textarea') &&
                                <>
                                    <label>Default Value : </label>
                                    <input type="text"
                                           value={popupData.defaultValue}
                                           onChange={(e) => { Actions.updatePopupData(dispatch, "defaultValue", e.target.value) }}
                                    />
                                </>
                            }

                            {(popupData.fieldtype === 'numberinput') &&
                                <>
                                    <label>Minimum : </label>
                                    <input type="number"
                                           value={popupData.minimum}
                                           onChange={(e) => { Actions.updatePopupData(dispatch, "minimum", e.target.value) }}
                                    />

                                    <label> Maximum : </label>
                                    <input type="number"
                                           value={popupData.maximum}
                                           onChange={(e) => { Actions.updatePopupData(dispatch, "maximum", e.target.value) }}
                                    />
                                </>
                            }

                            {(popupData.fieldtype !== 'heading') &&
                                <>
                                    <label>{popupData.textToShow} Name attr :</label>
                                    <input type="text"
                                           value={popupData.name}
                                           onChange={(e) => { Actions.updatePopupData(dispatch, "name", e.target.value) }}
                                    />
                                </>
                            }

                            {(popupData.fieldtype !== 'radio' && popupData.fieldtype !== 'heading') &&
                                <>
                                    <label>{popupData.textToShow} id attr:</label>
                                    <input type="text"
                                           value={popupData.id}
                                           onChange={(e) => { Actions.updatePopupData(dispatch, "id", e.target.value) }}
                                    />
                                </>
                            }

                            {(popupData.fieldtype !== 'heading') &&
                                <>
                                    <label>Mandatory/Required:</label>
                                    <input type="checkbox"
                                           checked={popupData.required ? true : false}
                                           onChange={(e) => { Actions.updatePopupData(dispatch, "required", !popupData.required) }}
                                    /> Mandatory/Required
                                </>
                            }


                            {(popupData.options && popupData.fieldtype === 'dropdown') &&
                                <>
                                    <div>
                                        <h2>Options</h2>
                                        {popupData.options.map((items, i) =>
                                            <div key={i} className="popup-options">
                                                <input type="text"
                                                       onChange={(e) => { Actions.updatePopupSelectOption(dispatch, i, e.target.value) }}
                                                       value={items.option} />
                                                <span onClick={(e) => { Actions.deletePopupSelectOption(dispatch, i, items.id) }}>X</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="buttons-grp">
                                        <button
                                            className="done"
                                            onClick={(e) => { Actions.addSelectOption(dispatch) }}>Add Option</button>
                                    </div>
                                </>
                            }


                            {(popupData.options && popupData.fieldtype === 'radio') &&
                                <>
                                    <div>
                                        <h2>Options</h2>
                                        <label className="col-33">Label</label>
                                        <label className="col-33">Value</label>
                                        <label className="col-33">Id Attr</label>
                                        {popupData.options.map((items, i) =>
                                            <div key={i} className="popup-options">
                                                <input type="text"
                                                       onChange={(e) => { Actions.updatePopupRadioOption(dispatch, i, 'label', e.target.value) }}
                                                       value={items.label}
                                                       placeholder="Label"
                                                       className="col-33" />

                                                <input type="text"
                                                       onChange={(e) => { Actions.updatePopupRadioOption(dispatch, i, 'option', e.target.value) }}
                                                       value={items.option}
                                                       placeholder="Value"
                                                       className="col-33" />

                                                {/* <input type="text"
                                onChange={(e) => {Actions.updatePopupRadioOption(dispatch,i,'name',e.target.value)} }
                                value={items.name}
                                placeholder = "Name Attr"
                                className="col-25"  /> */}


                                                <input type="text"
                                                       onChange={(e) => { Actions.updatePopupRadioOption(dispatch, i, 'idattr', e.target.value) }}
                                                       value={items.idattr}
                                                       placeholder="Id Attr"
                                                       className="col-33" />

                                                <span onClick={(e) => { Actions.deletePopupRadioOption(dispatch, i, items.id) }}>X</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="buttons-grp">
                                        <button
                                            className="done"
                                            onClick={(e) => Actions.addRadioOption(dispatch)}>Add Option</button>
                                    </div>

                                    <label>Default Selection : </label>
                                    <select onChange={(e) => { Actions.updatePopupData(dispatch, "defaultValue", e.target.value) }} >
                                        <option>Select</option>
                                        {popupData.options.map((items, i) =>
                                            <option key={i}>{items.option}</option>
                                        )}
                                    </select>
                                </>
                            }


                            <div className="buttons-grp">
                                <button
                                    className="done"
                                    onClick={(e) => { Actions.replaceFormDataWithPopupData(dispatch) }}
                                >Done</button>

                                <button
                                    className="cancel"
                                    onClick={() => { Actions.closePopup(dispatch) }}
                                >Cancel</button>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default PopupInfo
