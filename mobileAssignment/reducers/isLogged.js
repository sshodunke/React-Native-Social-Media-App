const initialState = { 
    userToken: null, 
    loggedIn: false,
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
            console.log('isLogged: reducer: AddToken: token:', action.userToken)
            console.log('isLogged: reducer: AddId: token:', action.userId)
            return {
                userToken: action.userToken,
                userId: action.userId,
                loggedIn: true
            }
        case 'LOGIN_TRUE':
            return {
                loggedIn: true
            }
        default:
            return state
    }
}

export default isLogged;