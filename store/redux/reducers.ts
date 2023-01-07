



export const todoReducers = (state = {todo: {}, todos: [], isSuccess: false, isError: false, message: ""}, action : any) => {
    switch (action.type) {
        case "ADD_TO_DO_SUCCESS": {
            return {
                ...state,
                isSuccess: true,
                todos: [...state.todos, action.payload]
            }
        }
        case "ADD_TO_DO_FAIL": {
            return {
                ...state,
                isError: true,
                message: action.payload
            }
        }
        case "RESET_STATE": {
            return {
                ...state,
                isError: false,
                isSuccess: false,
                message: "",
                todo: {}
            }
        }
        case "UPDATE_ITEM": {
            return {
                ...state,
                isSuccess: true,
                todos: state.todos.map((todo : any) => todo.id === action.payload.id ? {...todo, ...action.payload} : todo)
            }
        }
        case "GET_ALL_TO_DOS": {
            return {
                ...state,
                todos: action.payload,
            }
        } 
        case "DELETE_ITEM": {
            return {
                ...state,
                todos: state.todos.filter((todo : any) => todo.id !== action.payload)
            }
        }
        default: { 
            return state;
        }
    }
}