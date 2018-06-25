import axios from 'axios';

let initialState ={
    chatPeople: [],
    isLoading: false
}

const GET_CHAT_PEOPLE = 'GET_CHAT_PEOPLE'

export function getChatPeople(){
    return{
        type: GET_CHAT_PEOPLE,
        isLoading: false,
        payload: axios.get('/api/getProjUsers')
    }
}


export default function GetPeopleChatReducer(state=initialState, action ){
    switch (action.type) {
        case `${GET_CHAT_PEOPLE}_FULFILLED`:
                const { data } = action.payload
            return{
                ...state,isLoading:false, chatPeople:data
            }

        case `${GET_CHAT_PEOPLE}_PENDING`:
               
            return{
                ...state,isLoading:true
            }
    
        default:
            return state;
    }
}