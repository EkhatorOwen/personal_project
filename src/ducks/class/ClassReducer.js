let initialState = {
    class: true
}

const CHANGE_CLASS = "CHANGE_CLASS"

const SET_CLASS = "SET_CLASS"


export const changeClass=()=>{
        return {
            type: CHANGE_CLASS,
            payload: null
        }
}

export const setClass=()=>{
    return{
        type: SET_CLASS,
        payload: true
    }
}

export default function ClassReducer(state=initialState,action){
    switch (action.type) {


        case CHANGE_CLASS:

            return { ...state, class: !state.class }

        case SET_CLASS:
            return { ...state,class: action.payload }
    
        default:
            return state;
    }
}