import React, {useEffect, useState} from 'react';
import { ActivityIndicator, View } from 'react-native';
import { returnToken } from './utils/my-utils'
import allReducers from './reducers/index'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {useSelector} from 'react-redux'
import {connect} from 'react-redux'
import App from './App'

const store = createStore(allReducers);

class AuthLoading extends React.Component{
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

// export default App
//export default connect(mapStateToProps, null)(App)
export default AuthLoading