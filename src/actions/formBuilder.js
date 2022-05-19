/* eslint-disable */
import {
    getUniqueRandValue, groupHeadingData, reorderItems, initialJsonData, convertStateToOutputJSON,
} from '../helpers'


let _ = require('lodash');

export const togglePreviewPopup = (dispatch, display) => {
    dispatch({
        type: "TOGGLE_PREVIEW_POPUP",
        display: display
    });
}

export const generateFinalJSON = (dispatch, groupedData) => {
    let outputJSON = convertStateToOutputJSON(groupedData);
    dispatch({
        type: "CONVERT_TO_JSON",
        data: outputJSON
    });
}



export const onDrop = (dispatch, e, tasks, type) => {
    if (type) {

        let initialFormFieldData = {
            'input': {
                'uniqId': getUniqueRandValue(),
                'fieldtype': 'input',
                'textToShow': 'Text Input',
                'placeHolderLabel': 'Choose Label Name',
                'placeHolderText': 'Enter Your Name',
                'id': 'userid',
                'name': 'username',
                'required': true,
                'defaultValue': '',
                'sortorder': 0,
                'parentId': 'level-0'
            },
            'numberinput': {
                'uniqId': getUniqueRandValue(),
                'fieldtype': 'numberinput',
                'textToShow': 'Number Input',
                'placeHolderLabel': 'Choose Label Name',
                'placeHolderText': '',
                'minimum': null,
                'maximum': null,
                'id': 'userid',
                'name': 'username',
                'required': true,
                'defaultValue': '',
                'sortorder': 0,
                'parentId': 'level-0'
            },
            'textarea': {
                'uniqId': getUniqueRandValue(),
                'fieldtype': 'textarea',
                'textToShow': 'Multiline Input',
                'placeHolderLabel': 'Choose Label Name',
                'placeHolderText': 'Enter Your Name',
                'id': 'userid',
                'name': 'name',
                'required': true,
                'defaultValue': '',
                'sortorder': 0,
                'parentId': 'level-0'
            },
            'dropdown': {
                'uniqId': getUniqueRandValue(),
                'fieldtype': 'dropdown',
                'textToShow': 'Drop Down',
                'placeHolderLabel': 'Placeholder Label',
                'placeHolderText': 'Enter Your Name',
                'id': 'id',
                'name': 'name',
                'required': true,
                'defaultValue': '',
                'sortorder': 0,
                'parentId': 'level-0',
                'options': [
                    { 'id': getUniqueRandValue(), 'option': 'option 1' },
                    { 'id': getUniqueRandValue(), 'option': 'option 2' },
                ]
            },
            'radio': {
                'uniqId': getUniqueRandValue(),
                'fieldtype': 'radio',
                'textToShow': 'Multiple Choice',
                'placeHolderLabel': 'Placeholder Label',
                'placeHolderText': 'Enter Your Name',
                'id': 'id',
                'name': 'name',
                'required': true,
                'defaultValue': '',
                'sortorder': 0,
                'parentId': 'level-0',
                'options': [
                    {
                        'id': getUniqueRandValue(),
                        //'name': 'name1',
                        'idattr': 'yes',
                        'label': 'Yes',
                        'option': 'Yes'
                    },
                    {
                        'id': getUniqueRandValue(),
                        //'name': 'name1',
                        'idattr': 'no',
                        'label': 'No',
                        'option': 'No'
                    },
                ]
            },
            'date': {
                'uniqId': getUniqueRandValue(),
                'fieldtype': 'date',
                'textToShow': 'Date',
                'placeHolderLabel': 'Placeholder Label',
                'id': 'date',
                'name': 'date',
                'required': true,
                'placeHolderText': 'Enter Your Name',
                'sortorder': 0,
                'parentId': 'level-0'
            },
            'heading': {
                'uniqId': getUniqueRandValue(),
                'fieldtype': 'heading',
                'textToShow': 'Heading',
                'placeHolderLabel': 'Choose Label Name',
                'name': '',
                'sortorder': 0,
                'parentId': 'level-0'
            },
        }

        let x = initialFormFieldData[type];
        dispatch({
            type: "ONDROP_UPDATE",
            data: x
        });
    }
}

export const onSwapItem = (dispatch, e, tasks, sourceInd, targetInd) => {
    //debugger;
    let sourceIndex = tasks.findIndex((data) => {
        return data.uniqId == sourceInd
    });
    let targetIndex = tasks.findIndex((data) => {
        return data.uniqId == targetInd
    });
    if (sourceIndex >= 0 && targetIndex >= 0) {
        const sourceType = tasks[sourceIndex].fieldtype;
        const targetType = tasks[targetIndex].fieldtype;
        const sourceParentId = tasks[sourceIndex].parentId;
        const targetParentId = tasks[targetIndex].parentId;
        const targetId = tasks[targetIndex].uniqId;
        let data;
        if (targetType === 'heading') {
            if (sourceType === 'heading') {
                data = reorderItems(tasks, sourceIndex, targetIndex);
            } else {
                tasks[sourceIndex].parentId = targetId;
                data = tasks;
            }
        } else {
            if (sourceParentId === 'level-0' && targetParentId === 'level-0') {
                data = reorderItems(tasks, sourceIndex, targetIndex);
            } else if (sourceParentId !== 'level-0' && targetParentId === 'level-0') {
                tasks[sourceIndex].parentId = targetParentId;
                data = tasks;
            } else if (sourceParentId === 'level-0' && targetParentId !== 'level-0' && tasks[sourceIndex].fieldtype !== 'heading') {
                tasks[sourceIndex].parentId = targetParentId;
                data = tasks;
            } else if (sourceParentId !== 'level-0' && targetParentId !== 'level-0') {
                data = reorderItems(tasks, sourceIndex, targetIndex);
            } else {
                data = tasks;
            }
        }
    }else{
        tasks[sourceIndex].parentId = 'level-0';
        let data;
        data = tasks;
    }
    dispatch({
        type: "ONSWAP_ITEM",
        data,
    });
}

export const editFieldData = (dispatch, uniqId) => {
    dispatch({
        type: "EDIT_FEILD_DATA",
        uniqId
    });
}

export const closePopup = (dispatch) => {
    dispatch({
        type: "CLOSE_POPUP"
    });
}


export const updatePopupData = (dispatch, key, value) => {
    dispatch({
        type: "UPDATE_POPUP_DATA",
        key,
        value
    });
}


export const addSelectOption = (dispatch) => {
    dispatch({
        type: "ADD_SELECT_OPTION",
        newObj: { 'id': getUniqueRandValue(), 'option': '' }
    });
}

export const updatePopupSelectOption = (dispatch, index, value) => {
    dispatch({
        type: "UPDATE_POPUP_SELECTION_OPTION",
        newObj: { 'id': getUniqueRandValue(), 'option': value },
        index
    });
}

export const deletePopupSelectOption = (dispatch, index, id) => {
    dispatch({
        type: "DELETE_POPUP_SELECTION_OPTION",
        index, id
    });
}

export const addRadioOption = (dispatch) => {
    dispatch({
        type: "ADD_RADIO_OPTION",
        newObj: { 'id': getUniqueRandValue(), 'label': '', 'option': '' }
    });
}

export const updatePopupRadioOption = (dispatch, index, key, value) => {
    dispatch({
        type: "UPDATE_POPUP_RADIO_OPTION",
        index, key, value
    });
}

export const deletePopupRadioOption = (dispatch, index, id) => {
    dispatch({
        type: "DELETE_POPUP_RADIO_OPTION",
        index, id
    });
}

export const replaceFormDataWithPopupData = (dispatch) => {
    dispatch({
        type: "REPLACE_FORMDATA_WITH_POPUPDATA"
    });
}

export const deleteFieldData = (dispatch, uniqId) => {
    dispatch({
        type: "DELETE_FIELD_DATA",
        uniqId
    });
}
