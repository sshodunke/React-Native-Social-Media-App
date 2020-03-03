import React, { Component } from 'react'; 
import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';

class AccountScreen extends React.Component {

    componentDidMount() {
        this.retrieveToken();
    }

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
    logoutRequest() {
        return axios.post('http://10.0.2.2:3333/api/v0.0.5/logout', data, options)
 
        .then((response) => {
            this.props.navigation.navigate('Login')
            AsyncStorage.clear()
        })
 
        .catch(function(error) {
            console.log(error)
        })
     }

    async retrieveToken() {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                options.headers["X-Authorization"] = value
            }
        } catch (error) {
        }
    };

    clearAsyncStorage = async() => {
        AsyncStorage.clear();
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

const options = {
    headers: {
        'X-Authorization': '',
    }
};

const data = {
    
}

export default AccountScreen;