import React from 'react';
import rootReducer from './reducers/index'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import App from './App'
import { persistStore, persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import {PersistGate} from 'redux-persist/es/integration/react';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)

const persistedStore = persistStore(store)

class AuthLoading extends React.Component{
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistedStore} loading={null}>
                    <App/>
                </PersistGate>
            </Provider>
        )
    }
}

export default AuthLoading