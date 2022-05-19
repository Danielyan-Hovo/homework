import React from 'react'
import { toolBoxData } from '../../helpers'
import * as Actions from "../../actions"
import { useStateValue, useDispatch } from "../../store/configureStore"

function ToolBoxList() {
    const { formBuilder } = useStateValue()
    const dispatch = useDispatch()
    var { tasks } = formBuilder

    const onDragStart = (e, name) => {
        e.dataTransfer.setData("name", name)
    }
    const onClickDragItem = (e,name) => {
        Actions.onDrop(dispatch, e, tasks, name)
    }
    return (
        <div className="toolbox-container sticky out-container">
            <ul className="toolbox-list">
                {toolBoxData.map((items, i) =>
                    <li
                        key={i}
                        onClick = {(e) => onClickDragItem(e, items.name)}
                        onDragStart={(e) => onDragStart(e, items.name)}
                        draggable="true"
                    >
                        {items.textToShow}
                    </li>
                )}
            </ul>
        </div>
    );
}
export default ToolBoxList
