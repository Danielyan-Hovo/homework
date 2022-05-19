import React from "react";
import * as Actions from "../../actions";
import { useStateValue, useDispatch } from "../../store/configureStore";
import { JSONFormatter } from "../../helpers/utils";
import ToolBoxList from "./ToolBoxList";
import PopupInfo from "./PopupInfo";
import TitleActionBar from "./TitleActionBar";
import FormElement from "./FormElement";
import PreviewPopup from "./PreviewPopup";
var _ = require("lodash");

function FromBuilder() {
    const { formBuilder } = useStateValue();
    const dispatch = useDispatch();
    var { tasks, previewPopToggle, outputJSON } = formBuilder;
    if (outputJSON) {
        var str = JSON.stringify(outputJSON, undefined, 4);
        var formattedJSON = JSONFormatter(str);
    }

    var tasksToDispatch = tasks ? tasks : [];
    var tasksToDisplay = tasksToDispatch;
    if (tasksToDisplay.length > 0) {
        var grouped = _.mapValues(_.groupBy(tasksToDispatch, "parentId"), (clist) =>
            clist.map((item) => _.omit(item, "parentId"))
        );
        tasksToDisplay = grouped["level-0"] ? grouped["level-0"] : [];
    }

    var dragged = "";
    const onDragStartItem = (e, sourceIndex) => {
        e.stopPropagation();
        dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", dragged);
        e.dataTransfer.setData("sort_index", sourceIndex);
    };

    const onDragOver = (ev) => {
        ev.preventDefault();
    };

    const onDropSetItem = (e, targetIndex = null) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.getData("name")) {
            Actions.onDrop(
                dispatch,
                e,
                tasksToDispatch,
                e.dataTransfer.getData("name")
            );
        }
        if (e.dataTransfer.getData("sort_index")) {
            let sourceIndex = e.dataTransfer.getData("sort_index");
            if (sourceIndex) {
                e.dataTransfer.getData("text/html");
                //dragged.classList.remove("animated-item");
                e.currentTarget.classList.remove("animated-item");
                dragged.style.opacity = 1;
                if (sourceIndex != targetIndex)
                    Actions.onSwapItem(
                        dispatch,
                        e,
                        tasksToDispatch,
                        sourceIndex,
                        targetIndex
                    );
            }
        }
    };

    const onDragOverItem = (e, targetIndex) => {
        if (targetIndex) {
            //dragged.classList.add("animated-item");
            e.currentTarget.classList.add("animated-item");
            if (dragged) dragged.style.opacity = 0;
        }
    };

    const onDragEndItem = (e) => {
        e.currentTarget.classList.remove("animated-item");
        e.currentTarget.style.opacity = 1;
    };

    const createMarkup = () => {
        return { __html: formattedJSON };
    };

    const copyToClipBoard = () => {
        if (outputJSON) {
            navigator.clipboard.writeText(JSON.stringify(outputJSON, undefined, 4));
            alert("Copied");
        }
    };

    return (
        <div className="container">
            <div className="main_fluid">
                {tasksToDisplay.length > 0 && !outputJSON && (
                    <button
                        className="btn-preview preview-btn-position"
                        onClick={(e) => {
                            Actions.togglePreviewPopup(dispatch, true);
                        }}
                    >
                        Preview
                    </button>
                )}
                <div className="container_fluid">
                    <h3>Form Builder</h3>
                </div>

                {outputJSON && (
                    <div className="container_fluid json_fluid">
                        <a className="copy_text" onClick={(e) => copyToClipBoard()}>
                            Copy to clipboard
                        </a>
                        <pre dangerouslySetInnerHTML={createMarkup()}></pre>
                    </div>
                )}

                {!outputJSON && (
                    <div className="container_fluid">
                        <div className="drop-fluid">
                            <div className="drop-inner">
                                <div
                                    className="drop-area"
                                    onDragOver={(e) => {
                                        onDragOver(e);
                                    }}
                                    onDrop={(e) => {
                                        onDropSetItem(e);
                                    }}
                                >
                                    {tasksToDisplay.length === 0 ? (
                                        <h3 className="notoolboxes">
                                            Select / Drop an item from Toolbox
                                        </h3>
                                    ) : (
                                        <div>
                                            {tasksToDisplay.map((task, index) => (
                                                <div key={index} className="tools-dropped-area">
                                                    <div
                                                        className="tools-dropped-item"
                                                        onDragStart={(e) => onDragStartItem(e, task.uniqId)}
                                                        onDragOver={(e) => onDragOverItem(e, task.uniqId)}
                                                        onDrop={(e) => {
                                                            onDropSetItem(e, task.uniqId);
                                                        }}
                                                        //onDragLeave = {(e) => {onDragLeaveItem(e,'drop-area')}}
                                                        onDragEnd={(e) => {
                                                            onDragEndItem(e);
                                                        }}
                                                        draggable={true}
                                                        touchStart={(e) => onDragStartItem(e, task.uniqId)}
                                                        touchMove={(e) => onDragOverItem(e, task.uniqId)}
                                                        touchLeave={(e) => {
                                                            onDropSetItem(e, task.uniqId);
                                                        }}
                                                        //touchleave = {(e) => {onDragLeaveItem(e,'drop-area')}}
                                                        touchEnd={(e) => {
                                                            onDragEndItem(e);
                                                        }}
                                                    >
                                                        <TitleActionBar
                                                            task={task}
                                                            index={index}
                                                            Actions={Actions}
                                                            dispatch={dispatch}
                                                        />

                                                        {task.fieldtype === "heading" &&
                                                            grouped[task.uniqId] &&
                                                            grouped[task.uniqId].map((task, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="tools-dropped-item-inner"
                                                                    onDragStart={(e) =>
                                                                        onDragStartItem(e, task.uniqId)
                                                                    }
                                                                    onDragOver={(e) =>
                                                                        onDragOverItem(e, task.uniqId)
                                                                    }
                                                                    onDrop={(e) => {
                                                                        onDropSetItem(e, task.uniqId);
                                                                    }}
                                                                    onDragEnd={(e) => {
                                                                        onDragEndItem(e);
                                                                    }}
                                                                    draggable={true}
                                                                    touchStart={(e) =>
                                                                        onDragStartItem(e, task.uniqId)
                                                                    }
                                                                    touchMove={(e) =>
                                                                        onDragOverItem(e, task.uniqId)
                                                                    }
                                                                    touchLeave={(e) => {
                                                                        onDropSetItem(e, task.uniqId);
                                                                    }}
                                                                    touchEnd={(e) => {
                                                                        onDragEndItem(e);
                                                                    }}
                                                                >
                                                                    <TitleActionBar
                                                                        task={task}
                                                                        index={index}
                                                                        Actions={Actions}
                                                                        dispatch={dispatch}
                                                                    />

                                                                    <FormElement
                                                                        task={task}
                                                                        index={index}
                                                                        Actions={Actions}
                                                                        dispatch={dispatch}
                                                                    />
                                                                </div>
                                                            ))}

                                                        <FormElement
                                                            task={task}
                                                            index={index}
                                                            Actions={Actions}
                                                            dispatch={dispatch}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <ToolBoxList />
                    </div>
                )}

                {previewPopToggle && tasksToDisplay && (
                    <PreviewPopup
                        tasksToDisplay={tasksToDisplay}
                        grouped={grouped}
                        Actions={Actions}
                        dispatch={dispatch}
                    />
                )}
                <PopupInfo />
            </div>
        </div>
    );
}
export default FromBuilder;
