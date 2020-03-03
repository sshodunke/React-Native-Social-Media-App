import React, { Component } from 'react'; 
import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { TextInput } from 'react-native-paper';
import axios from 'axios';

const options = {
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json',}
};

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            token: '',
        }
    }

    sendLoginRequest() {
       return axios.post('http://10.0.2.2:3333/api/v0.0.5/login', {
            email: this.state.email,
            password: this.state.password
       }, options)

       .then((response) => {
           AsyncStorage.setItem('token', toString(response.data))
           this.props.navigation.navigate('Home')
       })

       .catch(function(error) {
           console.log(error)
           Alert.alert('Incorrect Email/Password')
       })
    }

    async retrieveToken() {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                 this.token = value
            }
        } catch (error) {
        }
    };

    componentDidMount() {
        this.retrieveToken();
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                
                <View style={styles.container}>

                    <View style={styles.header}>
                        <Text style={styles.header}>Chittr</Text>
                    </View>

                    <View>
                        <TextInput
                            onSubmitEditing={() => this.passwordInput.focus()}
                            style={styles.textInput}
                            placeholder='Email'
                            onChangeText={(email) => this.setState({email})}
                            underlineColorAndroid='transparent'/>

                        <TextInput
                            secureTextEntry={true}
                            ref={(input) => this.passwordInput = input} 
                            style={styles.textInput}
                            placeholder='Password'
                            onChangeText={(password) => this.setState({password})}
                            underlineColorAndroid='transparent'/>

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => this.sendLoginRequest()}>
                            <Text>Login</Text>
                        </TouchableOpacity>

                        <Text onPress={() => this.props.navigation.navigate('SignUp')} style={styles.register}>Register a new account.</Text>
                    </View>

                </View>
                
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#5c6bc0'
    },
    container: {
        flex: 1,
        paddingHorizontal: 30,
    },
    header: {
        fontSize: 24,
        fontFamily: 'Avenir Next',
        color: '#ffffff',
        marginTop: 48,
        marginBottom: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        marginBottom: 20,
        alignSelf: "stretch",
    },
    text: {
        fontFamily: 'Avenir Next',
        color: '#ffffff'
    },
    btn: {
        backgroundColor: '#8e99f3',
        fontSize: 16,
        borderRadius: 4,
        paddingVertical: 12,
        marginTop: 32,
        alignItems: "center",
        justifyContent: "center",
    },
    register: {
        marginTop: 24,
        fontWeight: '500',
        fontSize: 14,
        color: '#ffffff',
        textAlign: "center",
    }
})

export default Login;