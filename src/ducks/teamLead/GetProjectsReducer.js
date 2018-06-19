import axios from 'axios';

let initialState = {
    projects:[]
}

const GET_PROJECTS = "GET_PROJECTS";

export function getProjects(){
        return{
            type: GET_PROJECTS,
            payload: axios.get("/api/projects")
        }
}


export default function getProjectsReducer(state=initialState,action){
    switch(action.type){
        case `${GET_PROJECTS}_FULFILLED`:
            const {data} = action.payload;
            return {
                ...state, projects: data
            }

         case `${GET_PROJECTS}_PENDING`:
            
            return {
                ...state
            }

        default:
            return state;
    }
}