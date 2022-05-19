/* eslint-disable */
import formBuilderReducer from './formBuilder'

const rootReducer = ({ formBuilder }, action) => {
    return {
        formBuilder: formBuilderReducer({ formBuilder }, action)
    }
}

export const initialState = {
    formBuilder: {
        tasks: [],
        popupShow: '',
        popupData: '',
        activeTaskIndex: '',
        previewPopToggle:false,
        outputJSON:null
    },
}
export default rootReducer
