import React, { Component } from 'react'; 
import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
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
                            style={styles.textInput}
                            placeholder='Username'
                            onChangeText={(username) => this.setState({username})}
                            underlineColorAndroid='transparent'/>

                        <TextInput
                            style={styles.textInput}
                            placeholder='Password'
                            onChangeText={(password) => this.setState({password})}
                            underlineColorAndroid='transparent'/>

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => this.props.navigation.navigate('Home')}>
                            <Text>Login</Text>
                        </TouchableOpacity>

                        <Text onPress={() => this.props.navigation.navigate('SignUp')} style={styles.register}>Register a new account.</Text>
                    </View>

                </View>
                
            </KeyboardAvoidingView>
        );
    }

    login = () => {
        alert('login')
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
        backgroundColor: '#26418f',
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