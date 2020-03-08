export const addToken = (userToken) => {
    return {
        type: 'ADD_TOKEN',
        token: userToken
    }
}