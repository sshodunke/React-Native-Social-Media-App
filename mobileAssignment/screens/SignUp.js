import React, { Component } from 'react'; 
import { ToastAndroid, TouchableOpacity, KeyboardAvoidingView, Text, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';

class SignUp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            forename: '',
            surname: '',
            email: '',
            password: '',
        }
    }

    sendRegisterRequest() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user', {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json',},
            body: JSON.stringify({
                given_name: this.state.forename,
                family_name: this.state.surname,
                email: this.state.email,
                password: this.state.password
            }),
        })

        .then((response) => {
            ToastAndroid.show('Register successful', ToastAndroid.SHORT);
            this.props.navigation.navigate('Login')
        })

        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <ScrollView style={styles.wrapper}>
                
                <View style={styles.container}>

                    <View style={styles.header}>
                        <Text style={styles.header}>Register</Text>
                    </View>

                    <View>
                        <TextInput
                            onSubmitEditing={() => this.surnameInput.focus()}
                            style={styles.textInput}
                            placeholder='Forename'
                            onChangeText={(forename) => this.setState({forename})}
                            underlineColorAndroid='transparent'/>

                        <TextInput
                            onSubmitEditing={() => this.emailInput.focus()}
                            ref={(input) => this.surnameInput = input} 
                            style={styles.textInput}
                            placeholder='Surname'
                            onChangeText={(surname) => this.setState({surname})}
                            underlineColorAndroid='transparent'/>

                        <TextInput
                            onSubmitEditing={() => this.passwordInput.focus()}
                            ref={(input) => this.emailInput = input} 
                            style={styles.textInput}
                            placeholder='Email'
                            onChangeText={(email) => this.setState({email})}
                            underlineColorAndroid='transparent'/>

                        <TextInput
                            ref={(input) => this.passwordInput = input}
                            style={styles.textInput}
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password})}
                            underlineColorAndroid='transparent'/>

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => this.sendRegisterRequest()}>
                            <Text>Register</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                
            </ScrollView>
        );
    }

    register = () => {
        alert('register')
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
        color: '#ffffff',
        marginTop: 48,
        marginBottom: 20,
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
})

export default SignUp;