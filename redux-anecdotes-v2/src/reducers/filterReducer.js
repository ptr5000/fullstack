

const initialState = {filter: ''}


const filterReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case 'SET_FILTER': 
            return {...state, filter:action.filter}
        default:
            return state
    }
}

export const setFilter = (filter) => {
    return {type: 'SET_FILTER', filter}
}

export default filterReducer
