const initialState = { 
    userToken: null, 
    userId: null
}

const isLogged = (state=initialState, action) => {
    switch(action.type) {
        case 'DESTROY_TOKEN':
            console.log('isLogged reducer: DestroyToken')
            return {
                userToken: null
            }
        case 'ADD_TOKEN':
            console.log('isLogged: reducer: AddToken')
            return {
                userToken: action.userToken,
                userId: action.userId,
            }
        default:
            return state
    }
}

export default isLogged;