import React, { Component } from 'react'; 
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';
import {getToken, options, clearAsyncStorage} from '../utils/my-utils'

class AccountScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.logoutRequest()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
    // sends a call to the API to logout - requires token in header
    async logoutRequest() {
        await getToken('token');
        return axios.post('http://10.0.2.2:3333/api/v0.0.5/logout', data, options)
 
        .then((response) => {
            this.props.navigation.navigate('Login')
            clearAsyncStorage
        })
 
        .catch(function(error) {
            console.log(error)
        })
     }    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    btn: {
        backgroundColor: '#8e99f3',
        fontSize: 16,
        borderRadius: 4,
    },
})

const data = {
    
}

export default AccountScreen;