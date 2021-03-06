

const initialState = {message: null}


const notificationReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case 'SET_NOTIFICATION': 
            return {...state, message:action.message}
        default:
            return state
    }
}

export const setNotification = (message) => {
    return {type: 'SET_NOTIFICATION', message}
}

export default notificationReducer
