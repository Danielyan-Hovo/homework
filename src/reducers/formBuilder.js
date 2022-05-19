/* eslint-disable */
const formBuilderReducer = (state, action) => {
    switch (action.type) {

        case "ONDROP_UPDATE":
            return {
                ...state.formBuilder,
                tasks : [
                    ...state.formBuilder.tasks,
                    action.data
                ]
            }

        case "EDIT_FEILD_DATA":
            var tasks = state.formBuilder.tasks.filter((item, index) => item.uniqId === action.uniqId)
            return {
                ...state.formBuilder,
                activeTaskIndex : action.uniqId,
                popupShow : true,
                popupData : tasks[0]
            }

        case "DELETE_FIELD_DATA":
            let data = state.formBuilder.tasks.filter(item => item.uniqId !== action.uniqId)
            data = data.filter(item => item.parentId !== action.uniqId)
            return {
                ...state.formBuilder,
                tasks : data
            }

        case "CLOSE_POPUP":
            return {
                ...state.formBuilder,
                popupShow : false,
            }

        case "UPDATE_POPUP_DATA":
            return {
                ...state.formBuilder,
                popupData : {
                    ...state.formBuilder.popupData,
                    [action.key] : action.value
                }
            }

        case "ADD_SELECT_OPTION":{
            return {
                ...state.formBuilder,
                popupData : {
                    ...state.formBuilder.popupData,
                    options : [
                        ...state.formBuilder.popupData.options,
                        action.newObj
                    ]
                }
            }
        }

        case "UPDATE_POPUP_SELECTION_OPTION":{
            let newArr = [...state.formBuilder.popupData.options]
            newArr[action.index] = action.newObj
            return {
                ...state.formBuilder,
                popupData : {
                    ...state.formBuilder.popupData,
                    options : newArr
                }
            }
        }

        case "DELETE_POPUP_SELECTION_OPTION":{
            let newArr = [...state.formBuilder.popupData.options]
            newArr = newArr.filter(item => item.id !== action.id)
            return {
                ...state.formBuilder,
                popupData : {
                    ...state.formBuilder.popupData,
                    options : newArr
                }
            }
        }

        case "ADD_RADIO_OPTION":{
            return {
                ...state.formBuilder,
                popupData : {
                    ...state.formBuilder.popupData,
                    options : [
                        ...state.formBuilder.popupData.options,
                        action.newObj
                    ]
                }
            }
        }

        case "UPDATE_POPUP_RADIO_OPTION":{
            let newArr = [...state.formBuilder.popupData.options]
            newArr[action.index][action.key] = action.value
            return {
                ...state.formBuilder,
                popupData : {
                    ...state.formBuilder.popupData,
                    options : newArr
                }
            }
        }

        case "DELETE_POPUP_RADIO_OPTION": {
            let newArr = [...state.formBuilder.popupData.options]
            newArr = newArr.filter(item => item.id !== action.id)
            return {
                ...state.formBuilder,
                popupData : {
                    ...state.formBuilder.popupData,
                    options : newArr
                }
            }
        }

        case "REPLACE_FORMDATA_WITH_POPUPDATA": {
            let replaceData = [...state.formBuilder.tasks]
            let index = replaceData.findIndex((data) => {
                return data.uniqId == state.formBuilder.activeTaskIndex
            })
            replaceData[index] = state.formBuilder.popupData
            return {
                ...state.formBuilder,
                tasks : replaceData,
                popupShow : false
            }
        }

        case "ONSWAP_ITEM": {
            return {
                ...state.formBuilder,
                tasks : action.data
            }
        }

        case "TOGGLE_PREVIEW_POPUP":
            return {
                ...state.formBuilder,
                previewPopToggle : action.display,
            }

        case "CONVERT_TO_JSON": {
            return {
                ...state.formBuilder,
                outputJSON : action.data
            }
        }

        default:
            return state.formBuilder
    }
}

export default formBuilderReducer
