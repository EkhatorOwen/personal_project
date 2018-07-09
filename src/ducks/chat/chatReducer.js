let initialState = {
    chats: []
}

const GET_CHAT = 'GET_CHAT'

export function getChat(value){
    return {
        payload: value,
        type: GET_CHAT
    }
}

export default function ChatReducer(state=initialState, action){
    switch (action.type) {

        case 'GET_CHAT':
            return {
                ...state, chats:[...state.chats,action.payload]
            }
        default:
            return state;
    }
}