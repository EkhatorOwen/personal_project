import axios from 'axios';


let initialState = {
    people: [],
    isLoading: false
}

const GET_PEOPLE = 'GET_PEOPLE'

export function getPeople(id){
    return{
        payload: axios.get(`/api/getPeopleProject/${id}`),
        type: GET_PEOPLE,
        isLoading: false
    }
}



export default function GetPeopleReducer(state=initialState,action){
    switch(action.type){
        case `${GET_PEOPLE}_FULFILLED`:
            const {data} = action.payload;
            return{
                ...state,isLoading:false ,people: data
            }
        case `${GET_PEOPLE}_PENDING`:
                return{
                    ...state, isLoading:true
                }

        default:
                return state;


    }
}