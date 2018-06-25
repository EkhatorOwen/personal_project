import axios from 'axios'



let initialState ={
    task: [],
    isLoading: false
}

const GET_TASK = 'GET_TASK'
const GET_CURR_TASK = 'GET_CURR_TASK'


export function getTask(id){
    return {
        payload: axios.get(`/api/getTasks/${id}`),
        type: GET_TASK,
        isLoading: false
    }
}

export function getCurrTask(task){
    return{
        payload: task,
        type: GET_CURR_TASK
    }
}


export default function GetTaskReducer(state=initialState,action){
    switch(action.type){
        case `${GET_TASK}_FULFILLED`:
        const { data } = action.payload;
                    let ID=0
             let arr=   data.map((element,index)=>{
                        ID++
                    return{
                        ID: ID,
                        ...element
                    }
                })
        return{
            ...state, isLoading: false, task:arr
        }

        case `${GET_TASK}_PENDING`:
            return {
                ...state, isLoading: true
            }

        case 'GET_CURR_TASK':
                return{
                    ...state, task: action.payload
                }
        
            


        default:
            return state;
    }
}


