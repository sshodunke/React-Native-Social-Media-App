const initialState = { userToken: ''}

const isLogged = (state=initialState, action) => {
    switch(action.type) {
        case 'DESTROY_TOKEN':
            return {userToken: null}
        case 'ADD_TOKEN':
            return {userToken: action.token}
        default:
            return state
    }
}

export default isLogged;