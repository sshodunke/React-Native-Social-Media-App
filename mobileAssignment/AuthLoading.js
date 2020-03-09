import React from 'react';
import rootReducer from './reducers/index'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import App from './App'

const store = createStore(rootReducer);

class AuthLoading extends React.Component{
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

export default AuthLoading