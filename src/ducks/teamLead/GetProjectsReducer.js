import axios from 'axios';

let initialState = {
    projects:[],
    isLoading: false
}

const GET_PROJECTS = "GET_PROJECTS";

export function getProjects(){
        return{
            type: GET_PROJECTS,
            payload: axios.get("/api/projects"),
            isLoading: false
        }
}


export default function getProjectsReducer(state=initialState,action){
    switch(action.type){
        case `${GET_PROJECTS}_FULFILLED`:
            const {data} = action.payload;
            return {
                ...state,isLoading:false ,projects: data
            }

         case `${GET_PROJECTS}_PENDING`:
            
            return {
                ...state,isLoading:true
            }

        default:
            return state;
    }
}