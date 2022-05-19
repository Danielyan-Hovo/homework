import React, {memo} from 'react'

const FormElement =  memo(props => {
    const { task } = props
    return (
        <>
            {task.fieldtype === 'input' &&
                <input className="text-input" type="text"
                       name={task.name}
                       id={task.id}
                       placeholder={task.placeHolderText}
                       required={task.required}
                       value={task.defaultValue}
                       readOnly = {true}
                />
            }

            {task.fieldtype === 'numberinput' &&
                <input className="text-input" type="number"
                       name={task.name}
                       id={task.id}
                       placeholder={task.placeHolderText}
                       required={task.required}
                       value={task.defaultValue}
                       minimum={task.minimum}
                       maximum={task.maximum}
                />
            }

            {task.fieldtype === 'date' &&
                <input className="text-input" type="date"
                       name={task.name}
                       id={task.id}
                       placeholder={task.placeHolderText}
                       required={task.required}
                />
            }

            {task.fieldtype === 'textarea' &&
                <textarea className="text-input text-area"
                          name={task.name}
                          id={task.id}
                          placeholder={task.placeHolderText}
                          required={task.required}
                >
                    {task.defaultValue}
                </textarea>
            }

            {task.fieldtype === 'dropdown' &&
                <select >
                    <option>Select</option>
                    {task.options.map((items, i) =>
                        <option key={i}>{items.option}</option>
                    )}
                </select>
            }

            {task.fieldtype === 'radio' &&
                <>
                    {task.options.map((items, i) =>
                        <div key={i} className="radio_cont">
                            <input type="radio" value={items.option}
                                   checked={items.option === task.defaultValue ? true : false}
                            />
                            <label>{items.label}</label>
                        </div>
                    )}
                </>
            }
        </>
    )
})
export default FormElement
